import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Challenger } from './challenger';
import { Badge } from './badge';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

// import * as data from './leaders.json';


@Injectable({
  providedIn: 'root'
})
export class ChallengerService {

  private challengersUrl = 'http://toastserv.com:26437';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /** GET challengers from the server */
  getChallengers(): Observable<Challenger[]> {
    const url = `${this.challengersUrl}/list`;
    return this.http.get<Challenger[]>(url).pipe(
      map(response => {
        return response["challengers"];
      }),
      tap(_ => this.log('fetched challengers')),
      catchError(this.handleError<Challenger[]>('getChallengers', []))
    );
  }

  /** GET badges for challenger from the server */
  getChallenger(id: string): Observable<Challenger> {
    const url = `${this.challengersUrl}/badgesv2?id=${id}`;
    return this.http.get<Challenger>(url).pipe(
      map(response => {

        /** Create object to return. Add in all leaders now. */
        let challenger: Challenger = {
          id: id,
          name: response["name"],
          /** 0=casual,1=veteran,2=elite,3=champion */
          casualLeaders: response["badges"].reduce(function(result, item) {
            if (item["type"] === 0) {
              // let staticBadge: Badge = data.badges[data.badges.map(function(e) { return e.id; }).indexOf(item["id"])];
              let badge: Badge = {
                id: item["id"],
                name: item["name"],
                badgeName: item["badgeName"],
                queueOpen: item["queueOpen"],
                badgeWon: item["badgeWon"],
                twitchName: item["twitchName"],
                doubles: item["doubles"],
                type: item["type"],
                // bio: staticBadge.bio,
              }
              result.push(badge);
            }
            return result;
          }, []),
          veteranLeaders: response["badges"].reduce(function(result, item) {
            if (item["type"] === 1) {
              // let staticBadge: Badge = data.badges[data.badges.map(function(e) { return e.id; }).indexOf(item["id"])];
              let badge: Badge = {
                id: item["id"],
                name: item["name"],
                badgeName: item["badgeName"],
                queueOpen: item["queueOpen"],
                badgeWon: item["badgeWon"],
                twitchName: item["twitchName"],
                doubles: item["doubles"],
                type: item["type"],
                // bio: staticBadge.bio,
              }
              result.push(badge);
            }
            return result;
          }, []),
          elites: response["badges"].reduce(function(result, item) {
            if (item["type"] === 2) {
              // let staticBadge: Badge = data.badges[data.badges.map(function(e) { return e.id; }).indexOf(item["id"])];
              let badge: Badge = {
                id: item["id"],
                name: item["name"],
                badgeName: item["badgeName"],
                queueOpen: item["queueOpen"],
                badgeWon: item["badgeWon"],
                twitchName: item["twitchName"],
                doubles: item["doubles"],
                type: item["type"],
                // bio: staticBadge.bio,
              }
              result.push(badge);
            }
            return result;
          }, []),
          champions: response["badges"].reduce(function(result, item) {
            if (item["type"] === 3) {
              // let staticBadge: Badge = data.badges[data.badges.map(function(e) { return e.id; }).indexOf(item["id"])];
              let badge: Badge = {
                id: item["id"],
                name: item["name"],
                badgeName: item["badgeName"],
                queueOpen: item["queueOpen"],
                badgeWon: item["badgeWon"],
                twitchName: item["twitchName"],
                doubles: item["doubles"],
                type: item["type"],
                // bio: staticBadge.bio,
              }
              result.push(badge);
            }
            return result;
          }, []),
        };

        challenger.casualLeaders.sort((a, b) => (a.queueOpen === 0) ? 1 : -1);
        challenger.veteranLeaders.sort((a, b) => (a.queueOpen === 0) ? 1 : -1);
        challenger.elites.sort((a, b) => (a.queueOpen === 0) ? 1 : -1);
        challenger.champions.sort((a, b) => (a.queueOpen === 0) ? 1 : -1);

        return challenger;
      }),
      tap(_ => this.log(`fetched challenger id=${id}`)),
      catchError(this.handleError<Challenger>(`getChallenger id=${id}`))
    );
  }

  /** GET challengers whose name contains search term */
  searchChallengers(term: string): Observable<Challenger[]> {
    const url = `${this.challengersUrl}/search?name=${term}`;
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
