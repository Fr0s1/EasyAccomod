import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerifyAccountService {

  constructor(private http: HttpClient) { }

  accountUrl = 'http://localhost:8080/api/accounts'
  userUrl = 'http://localhost:8080/api/users'

  getUnverifiedAccountsList() {
    return this.http.get(this.accountUrl + '?verified=0', { responseType: 'json'})
  }

  verifyAccount(username: string) {
    return this.http.put(this.accountUrl + `/${username}`, { verified: true})
  }

  getAccountInfo(username: string) {
    return this.http.get(this.accountUrl + `/info/${username}`)
  }
}
