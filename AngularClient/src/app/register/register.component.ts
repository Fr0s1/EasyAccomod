import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../services/auth.service'

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    constructor(private fb: FormBuilder, private authService: AuthService) { }

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

    registerAccount() {
        var form = document.querySelector('form')

        var formData = new FormData(form)

        this.authService.signUp(formData).subscribe(data => console.log(data))
    }
}
