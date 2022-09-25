import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { CookieService } from 'ngx-cookie-service';
import { MessageService } from './message.service';

import { Challenger } from '../models/challenger';
import { Badge } from '../models/badge';
import { data } from '../leader.data';
import { Queue } from '../models/queue';
import { AuthenticationService } from './authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { api } from '../constants.data';
import { Leader } from '../models/leader';

@Injectable({
  providedIn: 'root',
})
export class ChallengerService {
  httpOptions = {
    headers: api.httpOtions.headers.append('Authorization', `Bearer ${this.cookieService.get('token')}`),
  };

  /** GET challenger from the server */
  getChallenger(id: string): Observable<Challenger> {
    const url = `${api.serverUrl}/challenger/${id}`;

    let response =
      '{"id":"433c4b55a17da084","displayName":"lunella","queuesEntered":[],"badgesEarned":[{"leaderId":"f00c087d1a2c","leaderName":"Lord Fingler, the Artiste","badgeName":"Artiste Badge"}]}';

    // return of(JSON.parse(response)).pipe(
    return this.http.get<Challenger>(url, this.httpOptions).pipe(
      map((response) => {
        /** Create object to return. Add in all leaders now. */
        let challenger: Challenger = {
          id: id,
          displayName: response['displayName'],
          queuesEntered: response['queuesEntered'].reduce(function (result, item) {
            let queue: Queue = {
              displayName: item['leaderName'],
              position: item['position'] + 1,
              leaderId: item['leaderId'],
              badgeName: data[item['leaderId']]['badgeName'],
            };
            result.push(queue);
            return result;
          }, []),
          badgesEarned: response['badgesEarned'].map(function (item: Leader) {
            let leader: Leader = {
              leaderId: item['leaderId'],
              displayName: item['leaderName'],
              badgeName: item['badgeName'],
            };
            return leader;
          }, []),
        };

        return challenger;
      }),
      tap((_) => this.log(`fetched challenger id=${id}`)),
      catchError(this.handleError<Challenger>(`getChallenger id=${id}`))
    );
    // END: real data
  }

  setChallengerName(id: string, displayName: string): void {
    const url = `${api.serverUrl}/challenger/${id}`;

    console.log("Setting user's name to: " + displayName);

    let display: string = displayName;

    // BEGIN: real data
    this.http.post<any>(url, { displayName: displayName }, this.httpOptions).subscribe((data) => {
      display = data.id;
      window.location.reload();
    });
    // END: real data
  }

  enqueueLeader(challengerId: string, leaderId: string): void {
    const url = `${api.serverUrl}/challenger/${challengerId}/enqueue/${leaderId}`;

    this.http.post<any>(url, {}, this.httpOptions).subscribe(
      (data) => {
        window.location.reload();
      },
      (error) => {
        console.error(error);
        this.snackBar.open(error['error']['error'], 'Dismiss', {
          duration: 2000,
        });
      }
    );

    // this.http.post<any>(url, {}, this.httpOptions).pipe(
    //   map(response => {
    //     window.location.reload();
    //   }),
    //   tap(_ => this.log(`enqueued challengerId=${challengerId} to leaderId=${leaderId}`)),
    //   catchError()
  }

  /** Log a ChallengerService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`ChallengerService: ${message}`);
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

      // There was an error. just log out
      this.authenticationService.logout();

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleErrorNoLogout<T>(operation = 'operation', result?: T) {
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
    private authenticationService: AuthenticationService,
    private messageService: MessageService,
    private cookieService: CookieService,
    private snackBar: MatSnackBar
  ) {}
}
