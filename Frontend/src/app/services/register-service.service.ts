import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../Interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {
  private readonly baseUrl = "https://localhost:7078";

  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private httpClient: HttpClient) { }

  addUser(user: User): Observable<User> {
    return this.httpClient.put<User>(`${this.baseUrl}/api/Users/addUser`, user, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 409) {
      return throwError('Email is already in use. Please use a different email.');
    }
    return throwError('An error occurred while registering the user. Please try again later.');
  }
}
