import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { throwError } from 'rxjs';

import { catchError, first } from 'rxjs/operators';
import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/home'])
    }
  }

  account: FormGroup
  ngOnInit(): void {
    this.account = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
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
        this.router.navigate(['/home'])
      }
      console.log(data)
    })
  }
}
