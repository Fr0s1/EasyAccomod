import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    constructor(private http: HttpClient) { }

    messageUrl = 'http://localhost:3000/api/message'
    sendMessage(message: FormData) {
        return this.http.post(this.messageUrl, message)
    }

    receiveContactList(currentUser: string) {
        return this.http.get(this.messageUrl + `/contact?username=${currentUser}`)
    }

    receiveMessageInConversation(sender: string, receiver: string) {
        return this.http.get(this.messageUrl + `?sender=${sender}&receiver=${receiver}`)
    }

    getImagesInMessageByID(messageID: number) {
        return this.http.get(this.messageUrl + `/image/${messageID}`)
    }

    getImageInMessage(messageID: number, fileName: string) {
        return this.http.get(this.messageUrl + `/${messageID}/image/${fileName}`, { responseType: 'blob' })
    }
}