import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';

import { Challenger } from './challenger';
import { Badge } from './badge';
import * as data from './leaders.json';
import { Queue } from './queue';

@Injectable({
  providedIn: 'root'
})
export class ChallengerService {

  private serverUrl = 'http://toastserv.com:26438';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /** GET challenger from the server */
  getChallenger(id: string): Observable<Challenger> {
    const url = `${this.serverUrl}/challenger/${id}`;

    // BEGIN: dummy data
    let challenger: Challenger = {
        "id": "f772ddb47f828d41",
        "displayName": "Test trainer 1",
        "queuesEntered": [
            {
                position: 1,
                displayName: data["3159a3e6b9025da1"]["displayName"],
                leaderId: "3159a3e6b9025da1"
            },
            {
                position: 2,
                displayName: data["d33861cc13ade093"]["displayName"],
                leaderId: "d33861cc13ade093"
            }
        ],
        "badgesEarned": [
          {
              displayName: data["3159a3e6b9025da1"]["displayName"],
              leaderId: "3159a3e6b9025da1"
          }
        ]
    }
    // END: dummy data
    // return of(challenger)

    // BEGIN: real data
    return this.http.get<Challenger>(url).pipe(
      map(response => {

        /** Create object to return. Add in all leaders now. */
        let challenger: Challenger = {
          id: id,
          displayName: response["displayName"],
          queuesEntered: response["queuesEntered"].reduce(function(result, item) {
            let queue: Queue = {
              displayName: data["default"][item["leaderId"]]["displayName"],
              position: item["position"],
              leaderId: item["leaderId"]
            }
            result.push(queue);
            return result;
          }, []),
          badgesEarned: response["badgesEarned"],
        };

        console.log(challenger);

        return challenger;
      }),
      tap(_ => this.log(`fetched challenger id=${id}`)),
      catchError(this.handleError<Challenger>(`getChallenger id=${id}`))
    );
    // END: real data
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
    return this.http.get<Challenger[]>(url).pipe(
      map(response => {
        return response["challengers"];
      }),
      tap(x => x.length ?
        this.log(`found challengers matching "${term}"`) :
        this.log(`no challengers matching "${term}"`)),
      catchError(this.handleError<Challenger[]>('searchChallengers', []))
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

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }
}
