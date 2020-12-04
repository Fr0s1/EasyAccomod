import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client'
const SOCKET_ENDPOINT = 'http://localhost:3000'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor() { }

  socket
  ngOnInit(): void {
    this.setUpConnection()
  }

  setUpConnection() {
    this.socket = io(SOCKET_ENDPOINT)
    console.log(this.socket)
    this.socket.on('chat message', (message) => {
      var chatbox = document.querySelector('#messages')

      var newMessage = document.createElement('li')

      newMessage.innerText = message

      chatbox.appendChild(newMessage)
    })
  }
  connect(e) {
    var message = <HTMLInputElement>document.querySelector('#m')
    console.log(message)
    e.preventDefault(); // prevents page reloading
    this.socket.emit('chat message', message.value);
  }
}
