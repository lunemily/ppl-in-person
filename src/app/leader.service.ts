import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';

import { Leader } from './leader';
import { Badge } from './badge';

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
    const url = `${this.serverUrl}/badgesv2?id=${id}`;

    let leader: Leader = {
      id: id
    }
    return of(leader)

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
