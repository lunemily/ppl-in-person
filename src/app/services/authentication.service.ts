import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { CookieService } from 'ngx-cookie-service';

import { MessageService } from './message.service';

import { Login } from '../models/login';
import { MatSnackBar } from '@angular/material/snack-bar';
import { error } from '@angular/compiler/src/util';

import { api } from '../constants.data';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  httpOptions = {
    headers: api.httpOtions.headers.append('Content-Type', 'application/json'),
  };

  login(username: string, password: string) {
    this.loginOrRegister(username, password, 'login');
  }

  register(username: string, password: string) {
    this.loginOrRegister(username, password, 'register');
  }

  loginOrRegister(username: string, password: string, endpoint: string): void {
    const url = `${api.serverUrl}/${endpoint}`;

    let authorization: string = btoa(username + ':' + password);
    let httpOptions = {
      headers: api.httpOtions.headers.append('Authorization', `Basic ${authorization}`),
    };
    // console.log(httpOptions)

    // BEGIN: real data
    this.http.post<Login>(url, null, httpOptions).subscribe(
      (data) => {
        let login: Login = {
          loginId: data.loginId,
          leaderId: data.leaderId ? data.leaderId : null,
          isLeader: data.isLeader,
          token: data.token,
        };
        this.cookieService.set('loginId', login.loginId);
        this.cookieService.set('isLeader', String(login.isLeader));
        this.cookieService.set('token', login.token);
        if (login.isLeader) {
          this.cookieService.set('leaderId', login.leaderId);
        }
        window.location.reload();
      },
      (error) => {
        console.error(error);
        this.snackBar.open(error['error']['error'], 'Dismiss', {
          duration: 2000,
        });
      }
    );
    // END: real data
  }

  logout(): void {
    // Get id and token
    let id = this.cookieService.get('loginId');
    let httpOptions = {
      headers: api.httpOtions.headers.append('Authorization', `Bearer ${this.cookieService.get('token')}`),
    };
    const url = `${api.serverUrl}/logout/${id}`;

    // Delete cookies for local logout
    this.cookieService.deleteAll();

    // Log out of idp
    this.http.post<any>(url, {}, httpOptions).subscribe((data) => {
      window.location.reload();
    });
  }

  /** Log a AuthenticationService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`AuthenticationService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private cookieService: CookieService,
    private snackBar: MatSnackBar
  ) {}
}
