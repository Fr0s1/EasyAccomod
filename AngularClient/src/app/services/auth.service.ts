import { Injectable } from "@angular/core";

import { HttpClient } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';
import { Account } from '../_model/account'
import { map } from 'rxjs/operators';
import * as bcrypt from 'bcryptjs'
import { AccountService } from '../services/account.service'
import { Backend } from "../_helpers/backend";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentAccountSubject: BehaviorSubject<Account>;

    private apiUrl = `${Backend.url}/api/accounts`

    constructor(private http: HttpClient, private accountService: AccountService) {
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
        this.accountService.updateAccount(this.currentUserValue.username, { online: false }).subscribe()
        localStorage.removeItem('currentAccount');
        this.currentAccountSubject.next(null);
        location.reload()
    }

    changePassword(form: FormData) {
        var loginInfo = new FormData()

        let result = 1;

        loginInfo.set('username', this.currentUserValue.username)
        loginInfo.set('password', form.get('currentpwd'))

        // Try to login with current password, if current password is correct, change to new password
        this.signIn(loginInfo).subscribe(data => {
            if (data.token) {
                const salt: string = bcrypt.genSaltSync(10)

                var hasedPsw = bcrypt.hashSync(form.get('newpwd'), salt)
                form.set('newpwd', hasedPsw)

                this.accountService.updateAccount(
                    this.currentUserValue.username, 
                    { 
                        password: form.get('newpwd') 
                    }).
                subscribe()
            }
            else {
                return 2;
            }
        })
        return result;
    }
}