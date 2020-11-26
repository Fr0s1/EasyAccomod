import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  roomUrl = 'http://localhost:8080/api/rooms'
  postUrl = 'http://localhost:8080/api/posts'
  // Upload form containg room and post data to server
  uploadForm(url: string, form: FormData) {
    return this.http.post(url, form)
  }

  // Get cost of uploading post by week, month, and year
  getUploadFee(url: string) {
    return this.http.get(url)
  }

  // Get a list of unverified post
  getUnverifiedPosts(url: string) {
    return this.http.get(url + '?verifiedStatus=0')
  }

  updatePost(url: string, option) {
    return this.http.put(url, option)
  }

  getPostPaymentInfo(url: string) {
    return this.http.get(url)
  }

  getPostsByQuery(url: string) {
    return this.http.get(url)
  }

  getRoomInfoByID(id: number) {
    return this.http.get(this.roomUrl + `/${id}`)
  }

  getRoomImagesByID(id: number) {
    return this.http.get(this.roomUrl + `/images/${id}`)
  }

  getRoomImageByName(roomId: number, fileName: string) {
    return this.http.get(this.roomUrl + `/${roomId}/image/${fileName}`, { responseType: 'blob' })
  }

  getPreviewPost(url: string) {
    return this.http.get(this.postUrl + '/preview')
  }
}
