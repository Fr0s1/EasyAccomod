import { Injectable } from "@angular/core";

import { HttpClient } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';
import { Account } from '../_model/account'
import { map } from 'rxjs/operators';
import * as bcrypt from 'bcryptjs'
import { Router } from '@angular/router'

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentAccountSubject: BehaviorSubject<Account>;

    private apiUrl = 'http://localhost:8080/api/accounts'

    constructor(private http: HttpClient, private router: Router) {
        this.currentAccountSubject = new BehaviorSubject<Account>(JSON.parse(localStorage.getItem('currentAccount')));
    }

    public get currentUserValue(): Account {
        return this.currentAccountSubject.value;
    }

    hashPassword(form: FormData): FormData {
        const salt: string = bcrypt.genSaltSync(10)

        var hasedPsw = bcrypt.hashSync(form.get('password'), salt)

        form.set('password', hasedPsw)

        return form
    }

    signIn(form: FormData) {
        return this.http.post<any>(this.apiUrl + '/login', form, { responseType: 'json' }).pipe(map(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentAccount', JSON.stringify(user));
                this.currentAccountSubject.next(user);
                console.log('Logged in')
            }

            return user;
        }));
    }

    signUp(form: FormData) {

        // Hash password before sending to server
        form = this.hashPassword(form)

        return this.http.post<any>(this.apiUrl, form, { responseType: 'json' })
            .pipe(map(user => {
                // sign up successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentAccount', JSON.stringify(user));
                    this.currentAccountSubject.next(user);
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentAccount');
        this.currentAccountSubject.next(null);
        location.reload()
    }
}