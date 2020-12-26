import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../services/auth.service'
import { Router } from '@angular/router'
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';

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

    message
    registerAccount() {
        var form = document.querySelector('form')

        var formData = new FormData(form)
        let accountType = formData.get('accountType')
        if (accountType == "Chủ nhà trọ") {
            formData.set('accountType', "Landlord")
        }
        else {
            formData.set('accountType', "Renter")
        }

        let swalMessage = ""
        this.authService.signUp(formData).pipe(catchError(err => {
            this.message = err.error.message;
            if (this.message == "There is an account registered with given information. Please check username, idCard, phone number or email") {
                swalMessage = "Đã tồn tại tài khoản với thông tin bạn nhập. Xin vui lòng kiểm tra lại tên tài khoản, chứng minh thư, số điện thoại hoặc email."    
            }
            else {
                swalMessage = "Đã xảy ra lỗi bên server, chúng tôi sẽ khắc phục sớm nhất có thể ."
            }
            return Swal.fire({
                icon: 'error',
                title: 'Đăng ký không thành công',
                text: swalMessage,
                showConfirmButton: true,
            })
        })).subscribe(data => {
            if (data.message) {
                Swal.fire({
                    icon: 'success',
                    title: 'Đăng ký tài khoản thành công',
                    text: 'Nếu bạn là chủ nhà trọ, hãy đợi tài khoản được phê duyệt ',
                    showConfirmButton: true,
                  })
            }
        })
    }
}
