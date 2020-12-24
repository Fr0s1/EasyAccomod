import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

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

    console.log(formData)
  }

}
