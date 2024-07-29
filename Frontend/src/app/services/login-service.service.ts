import { Injectable } from '@angular/core';
import { User } from '../Interfaces/User';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
}
