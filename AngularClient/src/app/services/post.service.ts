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
  reportUrl = 'http://localhost:8080/api/report'
  // Upload form containg room and post data to server
  uploadForm(url: string, form: FormData) {
    return this.http.post(url, form)
  }

  // Get cost of uploading post by week, month, and year
  getUploadFee(url: string) {
    return this.http.get(url)
  }

  // Change post information
  updatePost(postID: number, option) {
    return this.http.put(this.postUrl + `/${postID}`, option)
  }

  // Update room info
  updateRoom(roomID: number, option: Object) {
    return this.http.put(this.roomUrl + `/${roomID}`, option)
  }

  getPostPaymentInfo(url: string) {
    return this.http.get(url)
  }

  getPostsByQuery(queryString: string) {
    return this.http.get(this.postUrl + queryString)
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

  // Preview 4 posts in homepage sort by column name
  getPreviewPost(columnName: string) {
    return this.http.get(this.postUrl + `/preview?column=${columnName}`)
  }

  findPost(requirement: object) {
    let queryString = '?'

    for (const [key, value] of Object.entries(requirement)) {
      if (key === 'airconditioner' || key === 'balcony') {
        value === 'false' ? 0 : 1
      }
      queryString += `${key}=${value}&`
    }
    return this.http.get(this.roomUrl + encodeURI(queryString))
  }

  sendReport(report: Object) {
    return this.http.post(this.reportUrl, report)
  }

  deletePost(postID: number) {
    return this.http.delete(this.postUrl + `?postID=${postID}`)
  }

  addRoomImage(roomID: number, form: FormData) {
    return this.http.post(this.roomUrl + `/${roomID}/image`, form)
  }

  deleteRoomImage(roomID: number, fileName: string) {
    return this.http.delete(this.roomUrl + `/${roomID}/image/${fileName}`)
  }

  updatePostAndRoomInfo(form: FormData) {
    return this.http.put(this.postUrl + `/form`, form)
  }
}
