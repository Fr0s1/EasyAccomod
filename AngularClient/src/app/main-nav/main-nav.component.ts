import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { Account } from '../_model/account';
import { Role } from '../_model/role'

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {
  currentAccount: Account

  renterType = Role.Renter
  adminType = Role.Admin
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.currentAccount = this.authService.currentUserValue
  }

  logout() {
    this.authService.logout()
  }
}
