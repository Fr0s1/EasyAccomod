import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service'
import { MessageService } from '../services/messages.service';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private accountService: AccountService, private authService: AuthService, private messageService: MessageService, private route: ActivatedRoute) { }

  currentAccount
  accountInfo
  accountType
  likedPosts
  receiver

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => this.receiver = params.get('username'))
    this.currentAccount = this.authService.currentUserValue;
    this.accountService.getAccountInfo(this.receiver)
      .subscribe(data => {
        this.accountInfo = data[0];
        console.log(this.accountInfo)
      })
    this.accountService.getAccountByQuery(`?username=${this.receiver}`)
      .subscribe(data => {
        this.accountType = data[0].accountType;
      })
  };

  messageContent = new FormControl('');


  sendMessage() {
    const sender = this.currentAccount.username
    const receiver = this.receiver
    const content = this.messageContent.value

    this.messageService.sendMessage(sender, receiver, content).subscribe(data => console.log(data))
  }
}
