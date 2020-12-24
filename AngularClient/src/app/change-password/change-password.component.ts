import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private fb: FormBuilder, 
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router,) { }

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

    let currentPassword = formData.get('currentpwd')
    let newPassword = formData.get('newpwd')
    let confirmPassword = formData.get('confirmnewpwd')

    if (currentPassword == newPassword) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'New password can\'t be old password',
        text: 'Please check again',
        showConfirmButton: false,
        timer: 5500
      })
    }
    else {
      if (newPassword != confirmPassword) {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Wrong confirmation password',
          text: 'Please check again',
          showConfirmButton: false,
          timer: 5500
        })
      }
      else {
        let result = this.authService.changePassword(formData);
        if (result == 1) {
          Swal.fire({
            icon: 'success',
            title: 'Your password has been changed',
            showConfirmButton: true,
          }).then((result) => {
            if (result.isConfirmed) {
              let username = this.authService.currentUserValue.username;
              this.router.navigate([`/${username}`])
            }
          })
        }
        else {
          if (result == 2) {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Wrong current password',
              text: 'Please check again',
              showConfirmButton: false,
              timer: 5500
            })
          }
          else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'An error occurred',
              text: 'We will fix this as soon as possible',
              showConfirmButton: false,
              timer: 5500
            })
          }
        }
      }
    }
  }
}
