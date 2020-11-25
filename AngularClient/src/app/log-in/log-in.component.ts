import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { first } from 'rxjs/operators';
import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  account: FormGroup
  ngOnInit(): void {
    this.account = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  getUrl() {
    return "./../assets/background3.jpg";
  }

  signIn() {
    var form = document.querySelector('form')

    var formData = new FormData(form)

    this.authService.signIn(formData).pipe(first()).subscribe(data => {
      console.log(data)
    })
  }
}
