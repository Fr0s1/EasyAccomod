import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  pwd: FormGroup;

  ngOnInit(): void {
    this.pwd = this.fb.group({
      currentpwd: ['', [Validators.required]],
      newpwd: ['', [Validators.required]],
      confirmnewpwd: ['', [Validators.required]]
    })
  }

  changePassword() {
    var form = document.querySelector('form')

    var formData = new FormData(form)

    this.authService.changePassword(formData)
  }
}
