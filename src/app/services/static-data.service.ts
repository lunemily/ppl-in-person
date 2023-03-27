import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { int } from '@zxing/library/esm/customTypings';
import { catchError, map, Observable, of, shareReplay, tap } from 'rxjs';

import { api } from '../constants.data';
import { Leader } from '../models/leader';
import { PPLSettings } from '../models/settings';
import { Metric } from '../models/metric';
import { AuthenticationService } from './authentication.service';
import { MessageService } from './message.service';

import { sidenav } from '../constants.data';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  httpOptions = {
    headers: api.httpOtions.headers.append('Content-Type', 'application/json'),
  };

  getLeaderData(): Observable<Leader[]> {
    let localLeaderList = localStorage.getItem('leader-data-list');
    if (localLeaderList) {
      console.info('Leader data present.\nReturning...\n');
      return this.returnLocalLeaderData();
    } else {
      console.warn('Leader data not stored.\nFetching...\n');
      return this.fetchAndReturnLeaderData();
    }
  }

  private fetchAndReturnLeaderData(): Observable<Leader[]> {
    const url = `${api.serverUrl}/allleaderdata`;

    return this.http.get(url, this.httpOptions).pipe(
      map((response: JSON) => {
        let leaders: Leader[] = [];
        for (let leaderId of Object.keys(response)) {
          let leader: Leader = {
            leaderId: leaderId,
            displayName: response[leaderId].name as string,
            badgeName: response[leaderId].badgeName as string,
            bio: response[leaderId].bio as string,
            tagline: response[leaderId].tagline as string,
            leaderType: response[leaderId].leaderType as number,
          };
          leaders.push(leader);
          // Store individual leader data
          localStorage.setItem(`leader-data-${leaderId}`, JSON.stringify(leader));
        }

        // Sort list of leaders
        let sortedfLeaders: Leader[] = leaders.sort((a, b) => {
          if (a.leaderType === b.leaderType) {
            return a.displayName < b.displayName ? -1 : 1;
          } else {
            return a.leaderType < b.leaderType ? -1 : 1;
          }
        });
        let sortedListOfLeaders: string[] = [];
        for (let leader of sortedfLeaders) {
          // Lower bit is higher tier
          sortedListOfLeaders.push(`leader-data-${leader.leaderId}`);
        }

        // Store list of leaders
        localStorage.setItem(`leader-data-list`, JSON.stringify(sortedListOfLeaders));

        sortedfLeaders[sortedfLeaders.length - 1].champion = true;
        return sortedfLeaders;
      }),
      tap((_) => this.log('fetched leader data')),
      catchError(this.handleErrorNoLogout<Leader[]>('fetchLeaderData', []))
    );
  }

  private returnLocalLeaderData(): Observable<Leader[]> {
    let localLeaderList = JSON.parse(localStorage.getItem('leader-data-list'));
    console.debug(localLeaderList);

    const data =
      '{"00c0b9669df8":{"name":"Roxas, the Overcaffeinated Admin","badgeName":"Iced Latte Badge","bio":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","tagline":"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."},"16fdeaef3799":{"name":"Etch, the Savvy Scientific Illustrator","badgeName":"Field Study Badge","bio":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","tagline":"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."},"2d0f49b297cd":{"name":"Rhonder, the Puzzle League Master","badgeName":"Puzzle League Badge","bio":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","tagline":"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."},"3056473e5679":{"name":"Jose, the Raucous","badgeName":"Cacophonous Badge","bio":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","tagline":"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."},"30d635b10187":{"name":"Bioram, the Blue Dude","badgeName":"Blue Badge","bio":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","tagline":"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."},"34c30492736c":{"name":"Mamoru Chiba, the Masked Observer","badgeName":"Elegant Badge","bio":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","tagline":"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."},"404a69cb5b9f":{"name":"Mike, the Giant","badgeName":"G-Max Badge","bio":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","tagline":"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."},"483a657b99c0":{"name":"Jules, the Traveler","badgeName":"Passport Badge","bio":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","tagline":"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."},"511b226c5749":{"name":"Doomy, the Max Raider","badgeName":"Novice Raider Badge","bio":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","tagline":"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."},"55a4b533dc78":{"name":"Kenny, the Max Raider","badgeName":"Expert Raider Badge","bio":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","tagline":"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."},"8f94033f58b7":{"name":"Chrys, the Hard-Shelled Trainer","badgeName":"Exoskeleton Badge","bio":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","tagline":"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."},"aeaf9468b4a2":{"name":"Monsoon, the Stains of Time","badgeName":"Storm Badge","bio":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","tagline":"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."},"bcbeb3764061":{"name":"Douglas, the Rising Fist","badgeName":"Steel Fist Badge","bio":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","tagline":"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."},"c6e73226e7c4":{"name":"Nancy Richardson II, the Dex Maniac","badgeName":"PokéDex Maniac Badge","bio":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","tagline":"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."},"cc31b0cbc4b5":{"name":"Dustin, Respite in the Dunes","badgeName":"Oasis Emblem","bio":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","tagline":"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."},"cddaba15d491":{"name":"Lord Fingler, the Socialite","badgeName":"Influencer Badge","bio":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","tagline":"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."},"f00c087d1a2c":{"name":"Lord Fingler, the Artiste","badgeName":"Artiste Badge","bio":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","tagline":"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."}}';

    let leaders: Leader[] = [];
    for (let leaderEntry of localLeaderList) {
      console.debug(leaderEntry);
      console.debug(localStorage.getItem(leaderEntry));
      let leader: Leader = JSON.parse(localStorage.getItem(leaderEntry));
      leaders.push(leader);
    }
    leaders[leaders.length - 1].champion = true;
    return of(leaders);
  }

  getPPLSettings(): Observable<PPLSettings> {
    const url = `${api.serverUrl}/appsettings`;

    return this.http.get(url, this.httpOptions).pipe(
      map((response: JSON) => {
        // Use settings provided from API, otherwise default to local flags.
        let settings: PPLSettings = {
          showTrainerCard:
            'showTrainerCard' in response ? (response['showTrainerCard'] as boolean) : sidenav['showTrainerCard'],
          howToChallenge:
            'howToChallenge' in response ? (response['howToChallenge'] as boolean) : sidenav['howToChallenge'],
          rules: 'rules' in response ? (response['rules'] as boolean) : sidenav['rules'],
          prizePools: 'prizePools' in response ? (response['prizePools'] as boolean) : sidenav['prizePools'],
          schedule: 'schedule' in response ? (response['schedule'] as boolean) : sidenav['schedule'],
          bingoBoard: 'bingoBoard' in response ? (response['bingoBoard'] as boolean) : sidenav['bingoBoard'],
        };
        return settings;
      })
    );
  }

  getMetrics(): Observable<Metric[]> {
    const url = `${api.serverUrl}/metrics`;

    let response =
      '{"70022f182dab":{"name":"Cricket, the Chirpy Newsie","wins":19,"losses":50,"badgesAwarded":62},"49b1a6453903":{"name":"Artemis, the Gem Collector","wins":34,"losses":60,"badgesAwarded":75},"b4ec415c761a":{"name":"Kai, the Frozen River","wins":54,"losses":27,"badgesAwarded":39},"82ee137cec0a":{"name":"Anthony, the Extremely Normal Guy","wins":49,"losses":26,"badgesAwarded":30},"694e553197d0":{"name":"Lance, the Dragon Master","wins":19,"losses":15,"badgesAwarded":16},"a9f3e51dffc8":{"name":"Soundblaster, the Metal Menace","wins":24,"losses":54,"badgesAwarded":58},"7944e32f799a":{"name":"Rosabelle, Your Fairy Godmother","wins":9,"losses":48,"badgesAwarded":53},"94660e8e0cbc":{"name":"Arthur, King of the Roundtable","wins":36,"losses":7,"badgesAwarded":43},"4fc4e2f3e847":{"name":"Tyler, the Dutiful Referee","wins":23,"losses":40,"badgesAwarded":45},"07e84bcc07cf":{"name":"Dottore, the Frigid Doctor","wins":31,"losses":28,"badgesAwarded":28},"9ddbf474802e":{"name":"Damocles, the Fearsome Knight","wins":13,"losses":22,"badgesAwarded":33},"505ae7cfcf50":{"name":"Charlie, the Third Rail","wins":8,"losses":17,"badgesAwarded":23},"6f6987c7fcb5":{"name":"Iono, the Supercharged Streamer","wins":64,"losses":26,"badgesAwarded":77},"354d81a64586":{"name":"Kenny, the Scavenger","wins":10,"losses":21,"badgesAwarded":23},"d13b6a996d12":{"name":"Mehnit, the Magical Guardian","wins":14,"losses":15,"badgesAwarded":20},"5db30f068cef":{"name":"Brantley, the Area Apparition","wins":9,"losses":9,"badgesAwarded":10},"2020f31a663d":{"name":"Cass, the Punk Toxicologist","wins":6,"losses":20,"badgesAwarded":21},"3ffb37c301b4":{"name":"Sal, the Plow Driver","wins":26,"losses":19,"badgesAwarded":29},"57b8c6207c94":{"name":"Nieve, the Shy Shivering Skiier","wins":14,"losses":13,"badgesAwarded":13},"5aa97464ba52":{"name":"Paul, the Pet-Project Prodigy","wins":27,"losses":4,"badgesAwarded":22},"aed5dc645d93":{"name":"Xero, the Steel Handed Grunt","wins":0,"losses":12,"badgesAwarded":12},"0f50d12ba4cc":{"name":"Keiko, the Pokemon Nanny","wins":0,"losses":33,"badgesAwarded":33},"116e1c1e242b":{"name":"Price, the Occult Librarian","wins":19,"losses":30,"badgesAwarded":31},"a7a204b8f08d":{"name":"Ephraim, the Soaring Seeker","wins":20,"losses":17,"badgesAwarded":23},"e4ce20138ea7":{"name":"Bonnie, the Culinary Connoisseur","wins":14,"losses":26,"badgesAwarded":30},"c881ce67b0b9":{"name":"Princess Camellia, the Teapot Tyrant","wins":24,"losses":24,"badgesAwarded":37},"eb604a2a0eee":{"name":"Shackleford, the X-termin8r","wins":16,"losses":31,"badgesAwarded":35},"cd5ff9e4ad65":{"name":"Coben, the Moon Gazer","wins":24,"losses":10,"badgesAwarded":17},"befae8f3e921":{"name":"Volcanus, the Scarlet Rogue","wins":19,"losses":20,"badgesAwarded":21},"3f2fdd84c972":{"name":"Larry, the Exceptional Everyman","wins":13,"losses":32,"badgesAwarded":35},"f27c016d37c9":{"name":"Aidan, the Master of Drakes","wins":12,"losses":6,"badgesAwarded":8}}';

    return of(JSON.parse(response)).pipe(
      // return this.http.get(url, this.httpOptions).pipe(
      map((response: JSON) => {
        let metrics: Metric[] = [];
        Object.keys(response).forEach((leaderId) => {
          let metric: Metric = {
            leaderId: leaderId,
            displayName: response[leaderId]['name'],
            wins: response[leaderId]['wins'],
            losses: response[leaderId]['losses'],
            matches: response[leaderId]['wins'] + response[leaderId]['losses'],
            badgesAwarded: response[leaderId]['badgesAwarded'],
          };
          metrics.push(metric);
        });
        return metrics;
      })
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
    private messageService: MessageService
  ) {}
}
