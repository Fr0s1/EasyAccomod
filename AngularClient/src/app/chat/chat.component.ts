import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { io } from 'socket.io-client'
import { AuthService } from '../services/auth.service'
import { MessageService } from '../services/messages.service';
import { AccountService } from '../services/account.service'

const SOCKET_ENDPOINT = 'http://localhost:3000'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private accountService: AccountService,
  ) { }

  currentAccount // Current logged in user
  receiver // The current account which logged in user is chatting
  socket // Socket.io socket
  contactList // The list of accounts which the logged in user has sent messages before
  conversationHistory // Messages between 2 accounts

  @ViewChildren('messages') messages: QueryList<any>;
  @ViewChild('content') content: ElementRef;

  ngAfterViewInit() {
    this.scrollToBottom();
    this.messages.changes.subscribe(this.scrollToBottom);
  }

  scrollToBottom = () => {
    try {
      this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
    } catch (err) { }
  }

  ngOnInit(): void {
    this.currentAccount = this.authService.currentUserValue

    // Connect to chat server
    this.setUpConnection()

    // Receive contact list
    this.messageService.receiveContactList(this.currentAccount.username).subscribe(data => {
      this.contactList = data

      this.receiver = this.contactList[0].receiver
      this.getConversation(this.receiver)

      this.contactList.forEach(account => this.accountService.getAccountInfo(account.receiver).subscribe(data => {
        account.online = data[0].online
        account.name = data[0].fullname
      }))
    })
  }

  setUpConnection() {
    this.socket = io(SOCKET_ENDPOINT)

    this.socket.on("connect", () => this.socket.emit('currentUser', { user: this.currentAccount.username, id: this.socket.id }));

    // When receiving a new message from an account, append that new message to the conversation chat box
    this.socket.on('chat message', (data) => {
      this.conversationHistory.push(data)
    })
  }

  sendMessage(event) {
    var messageContent = event.target.firstChild

    if (messageContent.value.length > 0) {

      let time = new Date()

      let newMessage = {
        sender: this.currentAccount.username, content: messageContent.value, receiver: this.receiver, createdAt: time
      }
      this.conversationHistory.push(newMessage)

      this.messageService.sendMessage(this.currentAccount.username, this.receiver, messageContent.value).subscribe(data => {
        this.socket.emit('chat message', newMessage)
        messageContent.value = ''
        messageContent.focus()
      })
    }
  }

  // Switch to new account tab
  changeReceiver(event) {
    this.receiver = event.target.innerHTML
  
    this.getConversation(this.receiver)
  }

  getConversation(receiver: string) {
    // Change account display name at top bar
    let currentContact = document.querySelector('.current-contact')
    currentContact.innerHTML = this.receiver
    
    // Get conversation history with this new selected account
    this.messageService.receiverMessageInConversation(this.currentAccount.username, receiver).subscribe(messagesList => {
      this.conversationHistory = messagesList
    })
  }
}
