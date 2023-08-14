import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, shareReplay, tap } from 'rxjs';

import { api, battleFormatsReverseMap, leaderTypesReverseMap } from '../constants.data';
import { Leader } from '../models/leader';
import { PPLSettings } from '../models/settings';
import { AuthenticationService } from './authentication.service';

import { sidenav, battleFormatsMap, leaderTypesMap } from '../constants.data';
import { Format } from '../models/format';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  httpOptions = {
    headers: api.httpOtions.headers.append('Content-Type', 'application/json'),
  };

  getLeaderData(): Observable<Leader[]> {
    let localLeaderList = localStorage.getItem('leader-data-list');
    let rawLeaderDataTTL = localStorage.getItem('leader-data-ttl');

    if (rawLeaderDataTTL) {
      let now = new Date().getTime();
      let leaderDataTTL = Date.parse(rawLeaderDataTTL);
      if (now < leaderDataTTL) {
        if (localLeaderList) {
          // We're before the settings expiration time, return the local values
          console.info('Leader data present.\nReturning from local storage...\n');
          return this.returnLocalLeaderData();
        }
      }
    }
    console.warn('Leader data not stored.\nFetching...\n');
    return this.fetchAndReturnLeaderData();
  }

  private fetchAndReturnLeaderData(): Observable<Leader[]> {
    const url = `${api.serverUrl}/api/v2/allleaderdata`;

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
            leaderTypeIds: this.getLeaderTypesFromBitmask(response[leaderId].leaderType),
            leaderTypes: this.getLeaderTypesFromBitmask(response[leaderId].leaderType).map(function (typeId) {
              let type: Format = {
                id: typeId,
                name: leaderTypesReverseMap[typeId],
              };
              return type;
            }, []),
            battleFormatIds: this.getBattleFormatsFromBitmask(response[leaderId].battleFormat),
            battleFormats: this.getBattleFormatsFromBitmask(response[leaderId].battleFormat).map(function (formatId) {
              let format: Format = {
                id: formatId,
                name: battleFormatsReverseMap[formatId],
              };
              return format;
            }, []),
            champion: this.getLeaderTypesFromBitmask(response[leaderId].leaderType).includes(16), // champion leaderType
          };
          leaders.push(leader);
          // Store individual leader data
          localStorage.setItem(`leader-data-${leaderId}`, JSON.stringify(leader));
        }

        // Sort list of leaders
        let sortedfLeaders: Leader[] = leaders.sort((a, b) => {
          if (a.leaderTypeIds === b.leaderTypeIds) {
            return a.displayName < b.displayName ? -1 : 1;
          } else {
            return a.leaderTypeIds < b.leaderTypeIds ? -1 : 1;
          }
        });
        let sortedListOfLeaders: string[] = [];
        for (let leader of sortedfLeaders) {
          // Lower bit is higher tier
          sortedListOfLeaders.push(`leader-data-${leader.leaderId}`);
        }

        // Store list of leaders
        localStorage.setItem(`leader-data-list`, JSON.stringify(sortedListOfLeaders));

        // Set TTL
        let ttl = new Date();
        ttl.setHours(ttl.getMonth() + 1);
        localStorage.setItem('leader-data-ttl', ttl.toString());

        return sortedfLeaders;
      }),
      tap((_) => this.log('fetched leader data')),
      catchError(this.handleErrorNoLogout<Leader[]>('fetchLeaderData', []))
    );
  }

  private returnLocalLeaderData(): Observable<Leader[]> {
    let localLeaderList = JSON.parse(localStorage.getItem('leader-data-list'));
    console.debug(localLeaderList);

    try {
      let leaders: Leader[] = [];
      for (let leaderEntry of localLeaderList) {
        console.debug(leaderEntry);
        console.debug(localStorage.getItem(leaderEntry));
        let leader: Leader = JSON.parse(localStorage.getItem(leaderEntry));
        leaders.push(leader);
      }
      return of(leaders);
    } catch (error) {
      console.error(error);
      return this.fetchAndReturnLeaderData();
    }
  }

  getPPLSettings(): Observable<PPLSettings> {
    let rawAppSettingsTTL = localStorage.getItem('app-settings-ttl');
    if (rawAppSettingsTTL) {
      let now = new Date().getTime();
      let appSettingsTTL = Date.parse(rawAppSettingsTTL);
      if (now < appSettingsTTL)
        // We're before the settings expiration time, return the local values
        return this.returnLocalPPLSettings();
    }

    return this.fetchAndReturnPPLSettings();
  }

  private fetchAndReturnPPLSettings(): Observable<PPLSettings> {
    const url = `${api.serverUrl}/api/v2/appsettings`;

    return this.http.get(url, this.httpOptions).pipe(
      map((response: JSON) => {
        let settings: PPLSettings = {
          showTrainerCard: response['showTrainerCard'],
          howToChallenge: sidenav['howToChallenge'],
          rules: sidenav['rules'],
          prizePools: sidenav['prizePools'],
          schedule: sidenav['schedule'],
          bingoBoard: sidenav['bingoBoard'],
          // eventIsOver: response['eventIsOver'],
          eventIsOver: false,
        };

        // Store settings
        localStorage.setItem('app-settings', JSON.stringify(settings));

        // Set TTL
        let ttl = new Date();
        ttl.setHours(ttl.getMinutes() + 10);
        localStorage.setItem('app-settings-ttl', ttl.toString());

        return settings;
      })
    );
  }

  private returnLocalPPLSettings(): Observable<PPLSettings> {
    try {
      return of(JSON.parse(localStorage.getItem('app-settings')));
    } catch (error) {
      console.error(error);
      return this.fetchAndReturnPPLSettings();
    }
  }

  /** Log a ChallengerService message with the MessageService */
  private log(message: string) {
    console.info(`ChallengerService: ${message}`);
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

  /**
   * Convert bitmask for leaderTypes
   */
  getLeaderTypesFromBitmask(bitmask: number): number[] {
    let leaderTypes = [];
    for (let key of Object.keys(leaderTypesMap)) {
      if (bitmask & leaderTypesMap[key]) {
        leaderTypes.push(leaderTypesMap[key]);
      }
    }

    return leaderTypes;
  }

  /**
   * Convert bitmask for leaderTypes
   */
  getBattleFormatsFromBitmask(bitmask: number): number[] {
    let battleFormats = [];
    for (let key of Object.keys(battleFormatsMap)) {
      if (bitmask & battleFormatsMap[key]) {
        battleFormats.push(battleFormatsMap[key]);
      }
    }

    return battleFormats;
  }

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {}
}
