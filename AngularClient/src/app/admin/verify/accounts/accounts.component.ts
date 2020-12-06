import { Component, OnInit } from '@angular/core';
import { AccountService } from './../../../services/account.service'

@Component({
  selector: 'admin-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AdminAccountsComponent implements OnInit {

  constructor(private accountService: AccountService) { }

  message: string;

  accountInfo = {
    username: '',
    idCard: '',
    fullName: '',
    phoneNumber: '',
    email: '',
    address: ''
  }

  selectedAccounts = []
  accounts: any

  ngOnInit(): void {
    this.getAllAccount()
  }

  getPostByType(event) {
    switch (event.target.value) {
      case 'Tất cả':
        this.getAllAccount()
        break;
      case 'Chưa được duyệt':
        this.accountService.getAccountByQuery('?accountType=Landlord&verified=0').subscribe(accounts => this.accounts = accounts)
        break;
      case 'Đã được duyệt':
        this.accountService.getAccountByQuery('?accountType=Landlord&verified=1').subscribe(accounts => this.accounts = accounts)
        break;
      default:
    }
  }

  getAllAccount() {
    this.accountService.getAccountByQuery('?accountType=Landlord').subscribe(accounts => this.accounts = accounts)
  }

  verifiedSuccessfully: boolean = false
  verifyAccount() {
    for (let username of this.selectedAccounts) {
      console.log(username)
      this.accountService.updateAccount(username, { verified: true}).subscribe(data => {
        if (Object(data).message) {
          this.verifiedSuccessfully = true
          this.message = 'Phê duyệt thành công'
        }
      })
    }
  }

  unverifyAccount() {
    for (let username of this.selectedAccounts) {
      console.log(username)
      this.accountService.updateAccount(username, { verified: false }).subscribe(data => {
        console.log(data)
        if (Object(data).message) {
          this.verifiedSuccessfully = true
          this.message = 'Đã khóa tài khoản'
        }
      })
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
  }
}
