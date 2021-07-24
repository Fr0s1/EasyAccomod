import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Backend } from '../_helpers/backend';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  commentURL = `http://${Backend.url}/api/comments`

  sendComment(comment: Object) {
    return this.http.post(this.commentURL, comment)
  }

  getComment(queryString: string) {
    return this.http.get(this.commentURL + queryString)
  }

  updateComment(id: number, content: Object) {
    return this.http.put(this.commentURL + `/${id}`, content)
  }

  deleteComment(id: number) {
    return this.http.delete(this.commentURL + `/${id}`)
  }
}
