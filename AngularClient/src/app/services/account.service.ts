import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private http: HttpClient) { }

  accountUrl = 'http://localhost:8080/api/accounts'
  userUrl = 'http://localhost:8080/api/users'

  getUnverifiedAccountsList() {
    return this.http.get(this.accountUrl + '?verified=0', { responseType: 'json' })
  }

  // Verified account with correspoding username
  verifyAccount(username: string) {
    return this.http.put(this.accountUrl + `/${username}`, { verified: true })
  }

  // Get user information corresponding to account with given username
  getAccountInfo(username: string) {
    return this.http.get(this.accountUrl + `/info/${username}`)
  }
}
