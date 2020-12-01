import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../services/auth.service'
import { Router} from '@angular/router'
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
        // redirect to home if already logged in
        if (this.authService.currentUserValue) {
            this.router.navigate(['/home']);
        }
    }

    accountModel: FormGroup

    ngOnInit(): void {
        this.accountModel = this.fb.group({
            name: this.fb.group({
                firstName: ['', Validators.required],
                lastName: ['', Validators.required]
            }),
            username: ['', Validators.required],
            password: ['', Validators.required],
            accountType: ['', Validators.required],
            idCard: ['', Validators.required],
            phoneNumber: ['', Validators.required],
            email: ['', Validators.required],
            address: ['', Validators.required]
        })
    }

    errorMessage
    registerAccount() {
        var form = document.querySelector('form')

        var formData = new FormData(form)

        this.authService.signUp(formData).pipe(catchError(err => {
            this.errorMessage = err.error.message
            return throwError(err)
        })).subscribe(data => {
            if (data.message) {
                this.router.navigate(['/home'])
            }
        })
    }
}
