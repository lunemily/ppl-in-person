import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';

import { Leader } from './leader';
import { Badge } from './badge';
import { Queue } from './queue';
import { Hold } from './hold';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  private serverUrl = 'http://toastserv.com:26438';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  /** GET leader from the server */
  getLeader(id: string): Observable<Leader> {
    const url = `${this.serverUrl}/leader/${id}`;

    // BEGIN: dummy data
    // return of(leader)

    // BEGIN: real data
    return this.http.get<Leader>(url).pipe(
      map(response => {
        /** Create object to return. Add in all leaders now. */
        let leader: Leader = {
          id: id,
          displayName: response["leaderName"],
          queue: response["queue"].map(function(item) {
            let queue: Queue = {
              position: item["position"],
              challengerId: item["challengerId"],
              displayName: item["displayName"]
            }
            return queue;
          }, []),
          onHold: response["onHold"].map(function(item) {
            let hold: Hold = {
              challengerId: item["challengerId"],
              displayName: item["displayName"]
            }
            return hold;
          }, []),
        };
        return leader;
      }),
      tap(_ => this.log(`fetched leader id=${id}`)),
      catchError(this.handleError<Leader>(`leader id=${id}`))
    );
    // END: real data
  }

  reportBattle(leaderId: string, challengerId: string, win: boolean): void {
    const url = `${this.serverUrl}/leader/${leaderId}/report/${challengerId}`;
    let body = {
      challengerWin: win
    }

    this.http.post<any>(url, body).subscribe(data => {
      window.location.reload();
  })
  }

  enqueueChallenger(leaderId: string, challengerId: string): void {
    const url = `${this.serverUrl}/leader/${leaderId}/enqueue/${challengerId}`;

    this.http.post<any>(url, {}).subscribe(data => {
            window.location.reload();
        })
  }

  holdChallenger(leaderId: string, challengerId: string): void {
    const url = `${this.serverUrl}/leader/${leaderId}/hold/${challengerId}`;

    this.http.post<any>(url, {}).subscribe(data => {
            window.location.reload();
        })
  }

  unholdChallenger(leaderId: string, challengerId: string, placeAtFront: boolean): void {
    const url = `${this.serverUrl}/leader/${leaderId}/unhold/${challengerId}`;

    this.http.post<any>(url, {"placeAtFront": placeAtFront}).subscribe(data => {
            window.location.reload();
        })
  }

  removeChallenger(leaderId: string, challengerId: string): void {
    const url = `${this.serverUrl}/leader/${leaderId}/dequeue/${challengerId}`;


    this.http.post<any>(url, {}).subscribe(data => {
            window.location.reload();
        })
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