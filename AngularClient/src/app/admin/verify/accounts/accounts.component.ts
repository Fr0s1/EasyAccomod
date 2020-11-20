import { Component, OnInit } from '@angular/core';
import { AccountService } from './../../../services/accountServices/account.service'

@Component({
  selector: 'admin-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountComponent implements OnInit {

  constructor(private accountService: AccountService) { }

  accounts: any
  accountInfo = {
    username: '',
    idCard: '',
    fullName: '',
    phoneNumber: '',
    email: '',
    address: ''
  }

  selectedAccounts = []
  ngOnInit(): void {
    this.accountService.getUnverifiedAccountsList().subscribe(data => this.accounts = data)
  }

  verifyAccount() {
    for (let username of this.selectedAccounts) {
      console.log(username)
      this.accountService.verifyAccount(username).subscribe(data => console.log('Verified'))
    }
  }

  clicked: boolean = true
  showAccountInfo(event) {
    this.clicked = !this.clicked
    this.accountService.getAccountInfo(event.target.innerHTML).subscribe(data => this.accountInfo = data[0])
    if (!this.selectedAccounts.includes(event.target.innerHTML)) {
      this.selectedAccounts.push(event.target.innerHTML)
    }
    console.log(this.selectedAccounts)
  }
}
