import { Component, OnInit } from '@angular/core';
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
  userMessage // Chat box to display conversation messages

  messagesSendByAccount // All messages that current logged in account has sent to a specific account
  messagesSendToAccount // All messages received by current logged in account from a specific account
  conversationHistory // Concat 2 array above

  ngOnInit(): void {
    this.currentAccount = this.authService.currentUserValue

    // Connect to chat server
    this.setUpConnection()

    // Receive contact list
    this.messageService.receiveContactList(this.currentAccount.username).subscribe(data => {
      this.contactList = data
      this.contactList.forEach(account => this.accountService.getAccountInfo(account.receiver).subscribe(data => {
        account.online = data[0].online
        account.name = data[0].fullname
      }))
    })
  }

  formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  setUpConnection() {
    this.socket = io(SOCKET_ENDPOINT)

    this.socket.on("connect", () => this.socket.emit('currentUser', { user: this.currentAccount.username, id: this.socket.id }));

    // When receiving a new message from an account, append that new message to the conversation chat box
    this.socket.on('chat message', (data) => {


      var newMessage = document.createElement('div')

      newMessage.setAttribute('class', 'chat-message-left mb-4')

      newMessage.innerHTML =
        ` <div>
            <img src="https://bootdey.com/img/Content/avatar/avatar3.png"
                 class="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40">
            <div class="text-muted small text-nowrap mt-2">${data.createdAt}</div>
          </div>
          <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
            <div class="font-weight-bold mb-1">${data.sender}</div>
            ${data.content}
          </div>
        `

      this.userMessage = document.getElementsByClassName(`chat-messages ${this.receiver}`)[0]
      this.userMessage.appendChild(newMessage)
    })
  }


  sendMessage(event) {
    var messageContent = event.target.firstChild

    if (messageContent.value.length > 0) {
      var div = document.createElement('div')

      div.setAttribute('class', 'chat-message-right mb-4')

      let timeString = this.formatAMPM(new Date())
      div.innerHTML =
        ` <div>
            <img src="https://bootdey.com/img/Content/avatar/avatar3.png"
                 class="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40">
            <div class="text-muted small text-nowrap mt-2">${timeString}</div>
          </div>
          <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
            <div class="font-weight-bold mb-1">${this.currentAccount.username}</div>
            ${messageContent.value}
          </div>
        `
      this.userMessage = document.getElementsByClassName(`chat-messages p-4 ${this.receiver}`)[0]


      this.userMessage.appendChild(div)
      this.messageService.sendMessage(this.currentAccount.username, this.receiver, messageContent.value).subscribe(data => {
        this.socket.emit('chat message', { sender: this.currentAccount.username, content: messageContent.value, receiver: this.receiver, createdAt: timeString })
        messageContent.value = ''
        messageContent.focus()
      })
    }
  }

  // Switch to new user tab
  changeReceiver(event) {
    let newReceiver: string = event.target.innerHTML
    this.receiver = newReceiver

    let currentContact = document.querySelector('.current-contact')
    currentContact.innerHTML = newReceiver

    let userMessageList = document.querySelectorAll('.chat-messages')

    // Stop showing conversation with previous account
    userMessageList.forEach(userMessage => userMessage.classList.remove('selected'))

    // Show conversation with this new selected account
    this.userMessage = document.getElementsByClassName(`chat-messages p-4 ${newReceiver}`)[0]
    this.userMessage.classList.add('selected')

    // Get conversation history with this new selected account
    this.messageService.receiverMessageInConversation(this.currentAccount.username, newReceiver).subscribe(messagesList => {
      this.messagesSendByAccount = messagesList
      this.messageService.receiverMessageInConversation(newReceiver, this.currentAccount.username).subscribe(messagesList => {
        this.messagesSendToAccount = messagesList
        this.conversationHistory = this.messagesSendByAccount.concat(this.messagesSendToAccount)
        this.conversationHistory = this.conversationHistory.sort((first, second) => first.messageID < second.messageID ? -1 : 1)
        console.log(this.conversationHistory)
      })
    })
  }
}
