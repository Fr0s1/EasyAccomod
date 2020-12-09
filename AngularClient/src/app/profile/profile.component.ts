import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service'
import { MessageService } from '../services/messages.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private authService: AuthService, private messageService: MessageService, private route: ActivatedRoute) { }

  currentAccount
  receiver
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => this.receiver = params.get('username'))
    this.currentAccount = this.authService.currentUserValue
  }

  messageContent = new FormControl('');


  sendMessage() {
    const sender = this.currentAccount.username
    const receiver = this.receiver
    const content = this.messageContent.value


    this.messageService.sendMessage(sender, receiver, content).subscribe(data => console.log(data))
  }
}
