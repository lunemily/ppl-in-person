import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { CookieService } from 'ngx-cookie-service';

import { MessageService } from './message.service';

import { Login } from '../models/login'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private serverUrl = 'https://toastserv.com:26438';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  login(username: string, password: string): void {
    const url = `${this.serverUrl}/login`;

    // curl -X POST https://toastserv.com:26438/login -v -H "Authorization: Basic bHVuZWxsYTpodW50ZXIy"

    let authorization: string = btoa(username + ':' + password)
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': `Basic ${authorization}` }),
    };
    // console.log(httpOptions)

    // BEGIN: real data
    this.http.post<Login>(url, null, httpOptions).subscribe(data => {
        let login: Login = {
          id: data.id,
          isLeader: data.isLeader,
          token: data.token,
        }
        this.cookieService.set('id', login.id);
        this.cookieService.set('isLeader', String(login.isLeader));
        this.cookieService.set('token', login.token);
        window.location.reload();
      });
    // END: real data
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
  ) { }
}
