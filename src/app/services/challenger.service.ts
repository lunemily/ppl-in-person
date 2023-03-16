import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { CookieService } from 'ngx-cookie-service';
import { MessageService } from './message.service';

import { Challenger } from '../models/challenger';
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
      '{"id":"433c4b55a17da084","displayName":"lunelleast","queuesEntered":[],"badgesEarned":[],"bingoBoard":[["9ddbf474802e","82ee137cec0a","505ae7cfcf50","3f2fdd84c972","b4ec415c761a"],["f27c016d37c9","94660e8e0cbc","5aa97464ba52","70022f182dab","354d81a64586"],["e4ce20138ea7","c881ce67b0b9","","6f6987c7fcb5","d13b6a996d12"],["694e553197d0","7944e32f799a","116e1c1e242b","4fc4e2f3e847","07e84bcc07cf"],["49b1a6453903","eb604a2a0eee","0f50d12ba4cc","a9f3e51dffc8","aed5dc645d93"]],"championDefeated":false}';

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
              // badgeName: data[item['leaderId']]['badgeName'],
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
          feedbackSurveyUrl: response['feedbackSurveyUrl'] ? response['feedbackSurveyUrl'] : null,
        };

        return challenger;
      }),
      tap((_) => this.log(`fetched challenger id=${id}`)),
      catchError(this.handleError<Challenger>(`getChallenger id=${id}`))
    );
  }

  getBingoBoard(id: string): Observable<any> {
    const url = `${api.serverUrl}/challenger/${id}/bingoBoard`;
    // Transform each object to {id: "value", earned: "bool"}

    let response =
      '{"bingoBoard":[[{"9ddbf474802e":false},{"82ee137cec0a":false},{"505ae7cfcf50":false},{"3f2fdd84c972":false},{"b4ec415c761a":false}],[{"f27c016d37c9":false},{"94660e8e0cbc":false},{"5aa97464ba52":false},{"70022f182dab":false},{"354d81a64586":false}],[{"e4ce20138ea7":false},{"c881ce67b0b9":false},{"":true},{"6f6987c7fcb5":true},{"d13b6a996d12":false}],[{"694e553197d0":false},{"7944e32f799a":false},{"116e1c1e242b":false},{"4fc4e2f3e847":false},{"07e84bcc07cf":true}],[{"49b1a6453903":false},{"eb604a2a0eee":false},{"0f50d12ba4cc":true},{"a9f3e51dffc8":false},{"aed5dc645d93":true}]]}';

    return of(JSON.parse(response)).pipe(
      // return this.http.get<any>(url, this.httpOptions).pipe(
      map((response) => {
        return response['bingoBoard'].map(function (rawRow: []) {
          let row: [] = rawRow;
          // console.log(row);
          return row.map(function (rawColumn: {}) {
            let intermediateColumn = Object.entries(rawColumn)[0];
            let column = {
              id: intermediateColumn[0] === '' ? 'missingno' : intermediateColumn[0],
              earned: intermediateColumn[1],
            };
            console.log(column);
            return column;
          }, []);
        }, []);
      }),
      tap((_) => this.log(`fetched bingoBoard for challenger id=${id}`)),
      catchError(this.handleError<Challenger>(`bingoBoard id=${id}`))
    );
  }

  setChallengerName(id: string, displayName: string): void {
    const url = `${api.serverUrl}/challenger/${id}`;

    console.log("Setting user's name to: " + displayName);

    let display: string = displayName;

    this.http.post<any>(url, { displayName: displayName }, this.httpOptions).subscribe((data) => {
      display = data.id;
      window.location.reload();
    });
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
