import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  private url = 'localhost:8080/room/1'

  get(): Observable<Blob> {
    return this.http.get(this.url, { responseType: 'blob' }).pipe(
      tap(_ => console.log('fetched'))
    );
  }
}
