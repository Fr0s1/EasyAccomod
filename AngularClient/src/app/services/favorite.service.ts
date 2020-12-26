import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:8080/api/userfavorites';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(private http: HttpClient) { }

  getAllUserFavorite(username) {
    return this.http.get(`${baseUrl}/user/${username}`);
  }

  getAllPostFavorite(id) {
    return this.http.get(`${baseUrl}/post/${id}`);
  }

  checkUserFavorite(id, username) {
    return this.http.get(`${baseUrl}/like/${username}/${id}`);
  }

  createFavorite(data) {
    return this.http.post(baseUrl, data);
  }

  deleteFavorite(id, username) {
    return this.http.delete(`${baseUrl}/${username}/${id}`);
  }
}
