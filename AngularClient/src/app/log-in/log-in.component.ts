import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service'

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

  errorMessage: string
  signIn() {
    var form = document.querySelector('form')

    var formData = new FormData(form)

    this.authService.signIn(formData).pipe(catchError(err => {
      this.errorMessage = err.error.message
      return throwError(err);
    })).subscribe(data => {
      if (data.token) {
        this.router.navigate([this.returnUrl])
      }
      console.log(data)
    })
  }
}
