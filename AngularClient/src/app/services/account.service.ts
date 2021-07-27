import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Backend } from '../_helpers/backend';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private http: HttpClient) { }

  
  accountUrl = `${Backend.url}/api/accounts`
  userUrl = `${Backend.url}/api/users`

  getAccountByQuery(query: string) {
    return this.http.get(this.accountUrl + query, { responseType: 'json' })
  }

  // Verified account with correspoding username
  updateAccount(username: string, option: Object) {
    return this.http.put(this.accountUrl + `/${username}`, option)
  }

  // Get user information corresponding to account with given username
  getAccountInfo(username: string) {
    return this.http.get(this.accountUrl + `/info/${username}`)
  }
}
