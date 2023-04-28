import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';

import { Leader } from '../models/leader';
import { Queue } from '../models/queue';
import { Hold } from '../models/hold';
import { CookieService } from 'ngx-cookie-service';
import { Challenger } from '../models/challenger';
import { AuthenticationService } from './authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { api } from '../constants.data';

@Injectable({
  providedIn: 'root',
})
export class LeaderService {
  httpOptions = {
    headers: api.httpOtions.headers.append('Authorization', `Bearer ${this.cookieService.get('token')}`),
    // headers: new HttpHeaders({ Authorization: `Bearer ${this.cookieService.get('token')}` }),
  };

  /** GET leader from the server */
  getLeader(id: string): Observable<Leader> {
    const url = `${api.serverUrl}/leader/${id}`;

    let reponse =
      '{"loginId":"73986cb938a84d6d","leaderId":"f00c087d1a2c","leaderName":"Lord Fingler, the Artiste","badgeName":"Artiste Badge","winCount":0,"lossCount":69,"badgesAwarded":69,"queue":[],"onHold":[]}';

    // return of(reponse).pipe(
    return this.http.get<Leader>(url, this.httpOptions).pipe(
      map((response) => {
        /** Create object to return. Add in all leaders now. */
        let leader: Leader = {
          id: id,
          leaderId: response['leaderId'],
          displayName: response['leaderName'],
          queue: response['queue'].map(function (item) {
            let queue: Queue = {
              position: item['position'],
              challengerId: item['challengerId'],
              displayName: item['displayName'],
            };
            return queue;
          }, []),
          onHold: response['onHold'].map(function (item) {
            let hold: Hold = {
              challengerId: item['challengerId'],
              displayName: item['displayName'],
            };
            return hold;
          }, []),
          wins: response['winCount'],
          losses: response['lossCount'],
          badgesAwarded: response['badgesAwarded'],
          feedbackSurveyUrl: response['feedbackSurveyUrl'] ? response['feedbackSurveyUrl'] : null,
        };
        return leader;
      }),
      tap((_) => this.log(`fetched leader id=${id}`)),
      catchError(this.handleError<Leader>(`leader id=${id}`))
    );
    // END: real data
  }

  reportBattle(leaderId: string, challengerId: string, win: boolean, badge: boolean): void {
    const url = `${api.serverUrl}/leader/${leaderId}/report/${challengerId}`;
    let body = {
      challengerWin: win,
      badgeAwarded: badge,
    };

    this.http.post<any>(url, body, this.httpOptions).subscribe(
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
  }

  getChallengers(leaderId: string): Observable<Challenger[]> {
    const url = `${api.serverUrl}/leader/${leaderId}/allchallengers`;

    // return of(challengers);
    // BEGIN: real data
    return this.http.get<Challenger[]>(url, this.httpOptions).pipe(
      map((response) => {
        let unsortedChallengers = response.map(function (item) {
          let challenger: Challenger = {
            id: item['id'],
            displayName: item['name'],
          };
          return challenger;
        }, []);
        let sortedChallengers = unsortedChallengers.sort(
          (first, second) => 0 - (first.displayName.toLowerCase() > second.displayName.toLowerCase() ? -1 : 1)
        );
        return sortedChallengers;
      }),
      tap((_) => this.log('fetched challengers')),
      catchError(this.handleErrorNoLogout<Challenger[]>('getChallengers', []))
    );
    // END: real data
  }

  enqueueChallenger(leaderId: string, challengerId: string): void {
    const url = `${api.serverUrl}/leader/${leaderId}/enqueue/${challengerId}`;

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
  }

  holdChallenger(leaderId: string, challengerId: string): void {
    const url = `${api.serverUrl}/leader/${leaderId}/hold/${challengerId}`;

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
  }

  unholdChallenger(leaderId: string, challengerId: string, placeAtFront: boolean): void {
    const url = `${api.serverUrl}/leader/${leaderId}/unhold/${challengerId}`;

    this.http.post<any>(url, { placeAtFront: placeAtFront }, this.httpOptions).subscribe(
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
  }

  removeChallenger(leaderId: string, challengerId: string): void {
    const url = `${api.serverUrl}/leader/${leaderId}/dequeue/${challengerId}`;

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
  }

  /** Log a LeaderService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`LeaderService: ${message}`);
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
    private cookieService: CookieService,
    private messageService: MessageService,
    private snackBar: MatSnackBar
  ) {}
}
