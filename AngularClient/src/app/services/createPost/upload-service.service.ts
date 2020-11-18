import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadPostService {

  constructor(private http: HttpClient) { }

  uploadForm(url: string, form: FormData) {
    return this.http.post(url, form)
  }
}
