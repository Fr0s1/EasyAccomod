import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  httpHeaders = new HttpHeaders().set('Accept', "image/webp,*/*");

  getImage(): Observable<Blob> {
    return this.http.get<Blob>('localhost:8080/room/1', { headers: this.httpHeaders, responseType: 'blob' as 'json' }).pipe(
      tap(_ => console.log('fetched image'))
    )
  }
}
