import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    constructor(private http: HttpClient) { }

    messageUrl = 'http://localhost:3000/api/message'
    sendMessage(sender: string, receiver: string, content: string) {
        return this.http.post(this.messageUrl, { sender, receiver, content })
    }

    receiveContactList(currentUser: string) {
        return this.http.get(this.messageUrl + `/contact?username=${currentUser}`)
    }

    receiverMessageInConversation(sender: string, receiver: string) {
        return this.http.get(this.messageUrl + `?sender=${sender}&receiver=${receiver}`)
    }
}