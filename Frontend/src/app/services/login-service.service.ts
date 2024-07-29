import { Injectable } from '@angular/core';
import { User } from '../Interfaces/User';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Song } from '../Interfaces/Song';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  private readonly baseUrl ="https://localhost:7078";

  
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',  
    })
  };
  constructor(private httpClient:HttpClient) { }

  login(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.baseUrl}/api/Users/login`, user, this.httpOptions);
  }
  addSongToUserPlaylist(email: string, song: Song): Observable<Song> {
    return this.httpClient.post<Song>(`${this.baseUrl}/api/Users/addSongToUserPlaylist/${email}`, song);
  }
  updateSongInUserPlaylist(email: string, song: Song): Observable<Song> {
    return this.httpClient.post<Song>(`${this.baseUrl}/api/Users/updateSongInUserPlaylist/${email}`, JSON.stringify(song), this.httpOptions);
  }

  getSongs(email: string): Observable<Song[]> {
    return this.httpClient.get<Song[]>(`${this.baseUrl}/api/Users/userPlaylist/${email}`, this.httpOptions);
  }
  getUserByEmail(email: string): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/api/Users/user`, {
      params: { email },
      ...this.httpOptions
    });
  }
}
