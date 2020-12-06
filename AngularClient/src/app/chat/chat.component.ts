import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { io } from 'socket.io-client'
import { AuthService } from '../services/auth.service'

const SOCKET_ENDPOINT = 'http://localhost:3000'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private authService: AuthService) { }

  currentAccount;
  receiver;
  socket
  ngOnInit(): void {
    this.currentAccount = this.authService.currentUserValue
    this.setUpConnection()
  }
  @ViewChild('myname') input;

  ngAfterViewInit() {
    console.log(this.input);
  }

  setUpConnection() {
    this.socket = io(SOCKET_ENDPOINT)
    this.socket.on("connect", () => {
      console.log(this.socket.id);
      this.socket.emit('currentUser', { user: this.currentAccount.username, id: this.socket.id })
    });
    this.socket.on('chat message', (data) => {
      var div = document.createElement('div')

      div.setAttribute('class', 'chat-message-left mb-4')

      div.innerHTML =
        ` <div>
            <img src="https://bootdey.com/img/Content/avatar/avatar3.png"
                 class="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40">
            <div class="text-muted small text-nowrap mt-2">2:42 am</div>
          </div>
          <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
            <div class="font-weight-bold mb-1">${data.sender}</div>
            ${data.content}
          </div>
        `

      // console.log(messageBox)
      this.input.nativeElement.appendChild(div)
    })
  }

  sendMessage(event) {
    var messageContent = event.target.parentElement.firstChild
    console.log(messageContent)

    var div = document.createElement('div')

    div.setAttribute('class', 'chat-message-right mb-4')

    div.innerHTML =
      ` <div>
            <img src="https://bootdey.com/img/Content/avatar/avatar3.png"
                 class="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40">
            <div class="text-muted small text-nowrap mt-2">2:42 am</div>
          </div>
          <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
            <div class="font-weight-bold mb-1">${this.currentAccount.username}</div>
            ${messageContent.value}
          </div>
        `
    this.input.nativeElement.appendChild(div)

    this.socket.emit('chat message', { id: this.socket.id, sender: this.currentAccount.username, content: messageContent.value, receiver: 'admin' })
  }

  changeReceiver(event) {
    let username: string = event.target.previousSibling.innerHTML
    this.receiver = username
    console.log(username)
  }
}
