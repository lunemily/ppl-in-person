import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';

import { Challenger } from './challenger';
import { Badge } from './badge';

@Injectable({
  providedIn: 'root'
})
export class ChallengerService {

  private serverUrl = 'http://toastserv.com:26437';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /** GET challenger from the server */
  getChallenger(id: string): Observable<Challenger> {
    const url = `${this.serverUrl}/badgesv2?id=${id}`;

    // BEGIN: dummy data
    let challenger: Challenger = {
      id: id
    }
    // END: dummy data

    return of(challenger)

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
