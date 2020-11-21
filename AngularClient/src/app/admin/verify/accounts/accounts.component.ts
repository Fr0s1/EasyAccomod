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

  showAccountInfo(event) {
    this.accountService.getAccountInfo(event.target.innerHTML).subscribe(data => this.accountInfo = data[0])
  }

  addToVerifyList(event) {
    let username = event.target.parentElement.nextSibling.innerHTML;

    if (event.target.checked) {
      if (!this.selectedAccounts.includes(username)) {
        this.selectedAccounts.push(username)
      }
    } else {
      this.selectedAccounts = this.selectedAccounts.filter(value => value != username)
    }

    console.log(this.selectedAccounts)
  }

  addAllAccount(event) {
    let inputList = document.querySelectorAll('td input');
    if (event.target.checked) {
      for (let i = 0; i < inputList.length; i++) {
        let input = (<HTMLInputElement>inputList[i])
        input.checked = true
        this.selectedAccounts.push(this.accounts[i].username)
      }

    } else {
      this.selectedAccounts = []
      for (let i = 0; i < inputList.length; i++) {
        let input = (<HTMLInputElement>inputList[i])
        input.checked = false
      }
    }

    console.log(this.selectedAccounts)
    // console.log(inputList)
  }
}
