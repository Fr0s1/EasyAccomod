import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private authService: AuthService, private router: Router) { }

  returnUrl: string

  ngOnInit() {
    this.currentAccount = this.authService.currentUserValue
    this.returnUrl = this.router.routerState.snapshot.url
  }

  logout() {
    this.authService.logout()
  }

  setReturnRoute() {
    this.router.navigate(['/login'], { queryParams: { returnUrl: this.returnUrl } });
  }
}
