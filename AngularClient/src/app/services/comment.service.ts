import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  commentURL = 'http://localhost:8080/api/comments'

  sendComment(comment: Object) {
    return this.http.post(this.commentURL, comment)
  }

  getComment(queryString: string) {
    return this.http.get(this.commentURL + queryString)
  }
}
