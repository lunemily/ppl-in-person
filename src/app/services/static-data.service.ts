import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, map, Observable, of, shareReplay, tap } from 'rxjs';

import { api } from '../constants.data';
import { Leader } from '../models/leader';
import { AuthenticationService } from './authentication.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  leaderData: string;

  //   {
  //   [leaderId]: {
  //     name: [leader name],
  //     badgeName: [badge name],
  //     badgeArt: [base64 encoded badge art],
  //     portraitArt: [base64 encoded portrait art]
  //     leaderBlurb: [leader blurb],
  //     badgeTagline : [badge tagline],
  //   },
  //   ...
  // }

  fetchLeaderData(): Observable<Leader[]> {
    const url = `${api.serverUrl}/allleaderdata`;

    return this.http.get(url).pipe(
      map((response) => {
        let leaders: Leader[] = [];
        for (let leaderId of Object.keys(response)) {
          let leader: Leader = {
            leaderId: leaderId,
            displayName: response[leaderId].displayName,
            badgeName: response[leaderId].badgeName,
            bio: response[leaderId].bio,
            tagline: response[leaderId].tagline,
          };
          leaders.push(leader);
        }
        return leaders;
      }),
      tap((_) => this.log('fetched leader data')),
      catchError(this.handleErrorNoLogout<Leader[]>('fetchLeaderData', []))
    );
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
    private cookieService: CookieService,
    private messageService: MessageService
  ) {}
}
