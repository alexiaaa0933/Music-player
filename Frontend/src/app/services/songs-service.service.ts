import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Song } from '../Interfaces/Song';


@Injectable({
  providedIn: 'root'
})
export class SongsServiceService {

  private readonly baseUrl ="https://localhost:7078";

  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(private httpClient:HttpClient) { }

  getSongs(): Observable<Song[]> {
    return this.httpClient.get<Song[]>(this.baseUrl + "/api/Music/list", this.httpOptions);
  }

  getSongStream(fileName: string): Observable<Blob> {
    return this.httpClient.get(`${this.baseUrl}/api/Music/stream/${fileName}`, {
      ...this.httpOptions,
      responseType: 'blob'
    });
  }

  likeSong(fileName: string): Observable<Song> {
    return this.httpClient.post<Song>(`${this.baseUrl}/api/Music/like/${fileName}`, {}, this.httpOptions);
  }
}
