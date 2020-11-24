import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

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
}
