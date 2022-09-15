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
  httpOptions = {
    headers: api.httpOtions.headers.append('Content-Type', 'application/json'),
  };

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

  getLeaderData(): Observable<Leader[]> {
    let localLeaderList = this.cookieService.get('leader-data-list');
    if (localLeaderList) {
      console.info('Leader data present.\nReturning...\n');
      return this.returnLocalLeaderData(JSON.parse(localLeaderList));
    } else {
      console.warn('Leader data not stored.\nFetching...\n');
      return this.fetchLeaderData();
    }
  }

  private fetchLeaderData(): Observable<Leader[]> {
    const url = `${api.serverUrl}/allleaderdata`;

    return this.http.get(url, this.httpOptions).pipe(
      map((response: JSON) => {
        let leaders: Leader[] = [];
        let listOfLeaders: string[] = [];
        for (let leaderId of Object.keys(response)) {
          let leader: Leader = {
            leaderId: leaderId,
            displayName: response[leaderId].name,
            badgeName: response[leaderId].badgeName,
            bio: response[leaderId].bio,
            tagline: response[leaderId].tagline,
          };
          listOfLeaders.push(`leader-data-${leaderId}`);
          leaders.push(leader);
          this.cookieService.set(`leader-data-${leaderId}`, JSON.stringify(leader), 7);
        }
        // Store leaders
        this.cookieService.set('leader-data-list', JSON.stringify(listOfLeaders), 7);

        return leaders;
      }),
      tap((_) => this.log('fetched leader data')),
      catchError(this.handleErrorNoLogout<Leader[]>('fetchLeaderData', []))
    );
  }

  private returnLocalLeaderData(listOfLeaders: string[]): Observable<Leader[]> {
    console.info(listOfLeaders);

    const data =
      '{"00c0b9669df8":{"name":"Roxas, the Overcaffeinated Admin","badgeName":"Iced Latte Badge","bio":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","tagline":"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."},"16fdeaef3799":{"name":"Etch, the Savvy Scientific Illustrator","badgeName":"Field Study Badge","bio":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","tagline":"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."},"2d0f49b297cd":{"name":"Rhonder, the Puzzle League Master","badgeName":"Puzzle League Badge","bio":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","tagline":"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."},"3056473e5679":{"name":"Jose, the Raucous","badgeName":"Cacophonous Badge","bio":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","tagline":"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."},"30d635b10187":{"name":"Bioram, the Blue Dude","badgeName":"Blue Badge","bio":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","tagline":"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."},"34c30492736c":{"name":"Mamoru Chiba, the Masked Observer","badgeName":"Elegant Badge","bio":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","tagline":"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."},"404a69cb5b9f":{"name":"Mike, the Giant","badgeName":"G-Max Badge","bio":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","tagline":"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."},"483a657b99c0":{"name":"Jules, the Traveler","badgeName":"Passport Badge","bio":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","tagline":"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."},"511b226c5749":{"name":"Doomy, the Max Raider","badgeName":"Novice Raider Badge","bio":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","tagline":"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."},"55a4b533dc78":{"name":"Kenny, the Max Raider","badgeName":"Expert Raider Badge","bio":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","tagline":"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."},"8f94033f58b7":{"name":"Chrys, the Hard-Shelled Trainer","badgeName":"Exoskeleton Badge","bio":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","tagline":"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."},"aeaf9468b4a2":{"name":"Monsoon, the Stains of Time","badgeName":"Storm Badge","bio":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","tagline":"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."},"bcbeb3764061":{"name":"Douglas, the Rising Fist","badgeName":"Steel Fist Badge","bio":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","tagline":"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."},"c6e73226e7c4":{"name":"Nancy Richardson II, the Dex Maniac","badgeName":"PokéDex Maniac Badge","bio":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","tagline":"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."},"cc31b0cbc4b5":{"name":"Dustin, Respite in the Dunes","badgeName":"Oasis Emblem","bio":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","tagline":"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."},"cddaba15d491":{"name":"Lord Fingler, the Socialite","badgeName":"Influencer Badge","bio":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","tagline":"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."},"f00c087d1a2c":{"name":"Lord Fingler, the Artiste","badgeName":"Artiste Badge","bio":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","tagline":"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."}}';

    let leaders: Leader[] = [];
    for (let leaderCookie of listOfLeaders) {
      console.info(leaderCookie);
      console.info(this.cookieService.get(leaderCookie));
      let leader: Leader = JSON.parse(this.cookieService.get(leaderCookie));
      leaders.push(leader);
    }
    return of(leaders);
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
