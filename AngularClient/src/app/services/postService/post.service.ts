import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  uploadForm(url: string, form: FormData) {
    return this.http.post(url, form)
  }

  getUploadFee(url: string) {
    return this.http.get(url)
  }

  getUnverifiedPosts(url: string) {
    return this.http.get(url + '?verifiedStatus=0')
  }

  updatePost(url: string, option) {
    return this.http.put(url, option)
  }
}
