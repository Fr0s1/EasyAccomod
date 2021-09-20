import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Backend } from '../_helpers/backend';

const baseUrl = `${Backend.url}/notifications`;

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  getUserNotification(username) {
    return this.http.get(`${baseUrl}/${username}`);
  }

  createNotification(data) {
    return this.http.post(baseUrl, data);
  }
}
