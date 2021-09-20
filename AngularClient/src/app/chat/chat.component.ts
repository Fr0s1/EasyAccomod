import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { io } from 'socket.io-client'
import { AuthService } from '../services/auth.service'
import { MessageService } from '../services/messages.service';
import { AccountService } from '../services/account.service'
import { FormBuilder, FormGroup } from '@angular/forms';

import { Backend } from '../_helpers/backend';

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
    private fb: FormBuilder
  ) { }

  currentAccount // Current logged in user
  receiver // The current account which logged in user is chatting
  socket // Socket.io socket
  contactList // The list of accounts which the logged in user has sent messages before
  conversationHistory // Messages between 2 accounts
  imgUrls = []

  message: FormGroup

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
    this.message = this.fb.group({
      content: [''],
      image: ['']
    })

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
    this.socket = io(Backend.socketio_endpoint)

    this.socket.on("connect", () => this.socket.emit('currentUser', { user: this.currentAccount.username, id: this.socket.id }));

    // When receiving a new message from an account, append that new message to the conversation chat box
    this.socket.on('chat message', (data) => {
      this.conversationHistory.push(data)
    })
  }

  sendMessage(event) {
    var messageContent = event.target.firstChild

    let message: FormData = new FormData(event.target)

    message.append('sender', this.currentAccount.username)
    message.append('receiver', this.receiver)

    if (messageContent.value.length > 0 || this.imgUrls.length > 0) {

      let time = new Date()

      let newMessage = {
        sender: this.currentAccount.username, content: messageContent.value, receiver: this.receiver, createdAt: time, images: this.imgUrls
      }

      this.conversationHistory.push(newMessage)

      this.messageService.sendMessage(message).subscribe(data => {
        this.socket.emit('chat message', newMessage)
      })

      this.imgUrls = []
      this.message.reset()
    }
  }

  displayImage(files) {
    for (let i = 0; i < files.length; i++) {
      let reader = new FileReader()

      reader.readAsDataURL(files[i])

      reader.onloadend = () => {
        this.imgUrls.push(reader.result)
      }
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
    this.messageService.receiveMessageInConversation(this.currentAccount.username, receiver).subscribe(messagesList => {
      this.conversationHistory = messagesList
      // For each message, get all images in message by message's id
      this.conversationHistory.forEach(message => {
        message.images = []

        this.messageService.getImagesInMessageByID(message.messageID).subscribe(fileNames => {
          // After receiving an array of filenames, make http request to get each image
          let array: any
          array = fileNames

          if (array.length > 0) {
            array.forEach(fileName => {
              this.messageService.getImageInMessage(message.messageID, fileName).subscribe(file => {
                // Convert from Blob to img [src] tag
                let reader = new FileReader()

                reader.readAsDataURL(file)

                reader.onloadend = () => {
                  message.images.push(reader.result)
                }
              })
            })
          }
        })
      })
    })
  }

  changeModal(event) {
    let modal = document.getElementById("myModal");

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    let modalImg: any = document.getElementById("img01");

    modal.style.display = "block";
    modalImg.src = event.target.src;
  }

  // When the user clicks on <span> (x), close the modal
  closeModal() {
    let modal = document.getElementById("myModal");

    modal.style.display = "none";
  }
}
