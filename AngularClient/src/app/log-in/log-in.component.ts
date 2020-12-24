import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service'
import { AccountService } from '../services/account.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})

export class LogInComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService
  ) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/home'])
    }
  }

  returnUrl: string
  account: FormGroup

  ngOnInit(): void {
    this.account = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  loginMessage: string
  signIn() {
    var form = document.querySelector('form')

    var formData = new FormData(form)

    this.authService.signIn(formData).pipe(catchError(err => {
      this.loginMessage = err.error.message
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Oops...',
        text: 'Wrong username or password!',
        footer: '<a href>Forgor password?</a>',
        width: "400px",
      })
      return throwError(err);
    })).subscribe(data => {
      if (data.token) {
        this.accountService.updateAccount(data.username, { online: true }).subscribe(data => this.router.navigate([this.returnUrl]))
      }
    })
  }
}
