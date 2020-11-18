import { Component, OnInit } from '@angular/core';
import { VerifyAccountService} from './../../../services/adminServices/getUnverifiedAccounts/verify-account.service'

@Component({
  selector: 'admin-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountComponent implements OnInit {

  constructor(private verifyAccountService: VerifyAccountService) { }

  accounts: any
  accountInfo = {}

  selectedAccounts = []
  ngOnInit(): void {
    this.verifyAccountService.getUnverifiedAccountsList().subscribe(data => this.accounts = data)
  }
  
  verifyAccount() {
    for (let username of this.selectedAccounts) {
      console.log(username)
      this.verifyAccountService.verifyAccount(username).subscribe(data => console.log('Verified'))
    }
  }

  showAccountInfo(event) {
    this.verifyAccountService.getAccountInfo(event.target.innerHTML).subscribe(data => this.accountInfo=data[0])
    this.selectedAccounts.push(event.target.innerHTML)
  }
}
