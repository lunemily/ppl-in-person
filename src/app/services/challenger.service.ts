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

@Injectable({
  providedIn: 'root'
})
export class ChallengerService {

  private serverUrl = 'http://toastserv.com:26438';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Authorization': `Bearer ${this.cookieService.get('token')}` }),
  };

  /** GET challenger from the server */
  getChallenger(id: string): Observable<Challenger> {
    const url = `${this.serverUrl}/challenger/${id}`;

    // BEGIN: dummy data
    // let challenger: Challenger = {
    //     "id": "f772ddb47f828d41",
    //     "displayName": "Test trainer 1",
    //     "queuesEntered": [
    //         {
    //             position: 1,
    //             displayName: data["3159a3e6b9025da1"]["displayName"],
    //             leaderId: "3159a3e6b9025da1"
    //         },
    //         {
    //             position: 2,
    //             displayName: data["d33861cc13ade093"]["displayName"],
    //             leaderId: "d33861cc13ade093"
    //         }
    //     ],
    //     "badgesEarned": [
    //       {
    //           displayName: data["3159a3e6b9025da1"]["displayName"],
    //           leaderId: "3159a3e6b9025da1"
    //       }
    //     ]
    // }
    // END: dummy data
    // return of(challenger)

    // BEGIN: real data
    return this.http.get<Challenger>(url, this.httpOptions).pipe(
      map(response => {

        /** Create object to return. Add in all leaders now. */
        let challenger: Challenger = {
          id: id,
          displayName: response["displayName"],
          queuesEntered: response["queuesEntered"].reduce(function(result, item) {
            let queue: Queue = {
              displayName: item["leaderName"],
              position: item["position"] + 1,
              leaderId: item["leaderId"],
              badgeName: data[item["leaderId"]]['badgeName']
            }
            result.push(queue);
            return result;
          }, []),
          badgesEarned: response["badgesEarned"].map(function(item) {
            let badge: Badge = {
              displayName: item['badgeName'],
              leaderId: item["leaderId"],
              leaderName: item["leaderName"]
            }
            return badge;
          }, []),
        };

        return challenger;
      }),
      tap(_ => this.log(`fetched challenger id=${id}`)),
      catchError(this.handleError<Challenger>(`getChallenger id=${id}`))
    );
    // END: real data
  }

  setChallengerName(id: string, displayName: string): void {
    const url = `${this.serverUrl}/challenger/${id}`;

    console.log("Setting user's name to: " + displayName)

    let display: string = displayName;

    // BEGIN: real data
    this.http.post<any>(url, { displayName: displayName }, this.httpOptions).subscribe(data => {
            display = data.id;
            window.location.reload();
        })
    // END: real data
  }

  enqueueLeader(challengerId: string, leaderId: string): void {
    const url = `${this.serverUrl}/challenger/${challengerId}/enqueue/${leaderId}`;

    this.http.post<any>(url, {}, this.httpOptions)
      .subscribe(
        (data) => {
          window.location.reload();
        },
        (error) => {
          console.error(error);
          this.snackBar.open(error['error']['error'], "Dismiss", {
            duration: 2000,
          });
        }
      )

    // this.http.post<any>(url, {}, this.httpOptions).pipe(
    //   map(response => {
    //     window.location.reload();
    //   }),
    //   tap(_ => this.log(`enqueued challengerId=${challengerId} to leaderId=${leaderId}`)),
    //   catchError()
  }

  /** GET challengers list from the server */
  getChallengers(): Observable<Challenger[]> {
    const url = `${this.serverUrl}/badgesv2`;

    // BEGIN: dummy data
    let challenger1: Challenger = {
      id: '1'
    }
    let challenger2: Challenger = {
      id: '2'
    }
    let challengers: Challenger[] = [challenger1, challenger2]
    // END: dummy data

    return of(challengers)

  }

  /** GET challengers whose name contains search term */
  searchChallengers(term: string): Observable<Challenger[]> {
    const url = `${this.serverUrl}/search?name=${term}`;
    if (!term.trim()) {
      // if not search term, return empty challenger array.
      return of([]);
    }
    return this.http.get<Challenger[]>(url, this.httpOptions).pipe(
      map(response => {
        return response["challengers"];
      }),
      tap(x => x.length ?
        this.log(`found challengers matching "${term}"`) :
        this.log(`no challengers matching "${term}"`)),
      catchError(this.handleErrorNoLogout<Challenger[]>('searchChallengers', []))
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
    private messageService: MessageService,
    private cookieService: CookieService,
    private snackBar: MatSnackBar,
  ) { }
}
