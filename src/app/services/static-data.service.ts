import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, share, shareReplay, tap } from 'rxjs';

import { api, battleFormatsReverseMap, leaderTypesReverseMap } from '../constants.data';
import { Leader } from '../models/leader';
import { PPLSettings } from '../models/settings';
import { AuthenticationService } from './authentication.service';

import { battleFormatsMap, leaderTypesMap } from '../constants.data';
import { Format } from '../models/format';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService,
    private cookieService: CookieService,
  ) {}
  httpOptions = {
    headers: api.httpOtions.headers.append('Content-Type', 'application/json'),
  };

  private readonly _pplData: Observable<JSON>;

  /**
   * Convert bitmask for leaderTypes
   */
  static getLeaderTypesFromBitmask(bitmask: number): number[] {
    const leaderTypes = [];
    for (const key of Object.keys(leaderTypesMap)) {
      if (bitmask & leaderTypesMap[key]) {
        leaderTypes.push(leaderTypesMap[key]);
      }
    }

    return leaderTypes;
  }

  getLeaderData(): Observable<Leader[]> {
    const localLeaderList = localStorage.getItem('leader-data-list');
    const rawLeaderDataTTL = localStorage.getItem('leader-data-ttl');

    if (rawLeaderDataTTL) {
      const now = new Date().getTime();
      const leaderDataTTL = Date.parse(rawLeaderDataTTL);
      if (now < leaderDataTTL) {
        if (localLeaderList) {
          // We're before the settings expiration time, return the local values
          console.debug('Leader data present.\nReturning from local storage...\n');
          return this.returnLocalLeaderData();
        }
      }
    }
    console.warn('Leader data not stored.\nFetching...\n');
    return this.fetchAndReturnLeaderData();
  }

  getPPLSettings(): Observable<PPLSettings> {
    const rawAppSettingsTTL = localStorage.getItem('app-settings-ttl');
    if (rawAppSettingsTTL) {
      const now = new Date().getTime();
      const appSettingsTTL = Date.parse(rawAppSettingsTTL);
      if (now < appSettingsTTL) {
        // We're before the settings expiration time, return the local values
        return this.returnLocalPPLSettings();
      }
    }

    return this.fetchAndReturnPPLSettings();
  }

  private fetchAndReturnLeaderData(): Observable<Leader[]> {
    const url = `${api.serverUrl}/api/v2/allleaderdata`;

    return this.http.get(url, this.httpOptions).pipe(
      map((response: JSON) => {
        const leaders: Leader[] = [];
        for (const leaderId of Object.keys(response)) {
          const leader: Leader = {
            leaderId,
            displayName: response[leaderId].name as string,
            badgeName: response[leaderId].badgeName as string,
            bio: response[leaderId].bio as string,
            tagline: response[leaderId].tagline as string,
            leaderTypeIds: DataService.getLeaderTypesFromBitmask(response[leaderId].leaderType),
            leaderTypes: DataService.getLeaderTypesFromBitmask(response[leaderId].leaderType).map(function (typeId) {
              const type: Format = {
                id: typeId,
                name: leaderTypesReverseMap[typeId],
              };
              return type;
            }, []),
            battleFormatIds: this.getBattleFormatsFromBitmask(response[leaderId].battleFormat),
            battleFormats: this.getBattleFormatsFromBitmask(response[leaderId].battleFormat).map(function (formatId) {
              const format: Format = {
                id: formatId,
                name: battleFormatsReverseMap[formatId],
              };
              return format;
            }, []),
            champion: DataService.getLeaderTypesFromBitmask(response[leaderId].leaderType).includes(16), // champion leaderType
          };
          leaders.push(leader);
          // Store individual leader data
          localStorage.setItem(`leader-data-${leaderId}`, JSON.stringify(leader));
        }

        // Sort list of leaders
        const sortedfLeaders: Leader[] = leaders.sort((a, b) => {
          if (a.leaderTypeIds === b.leaderTypeIds) {
            return a.displayName < b.displayName ? -1 : 1;
          } else {
            return a.leaderTypeIds < b.leaderTypeIds ? -1 : 1;
          }
        });
        const sortedListOfLeaders: string[] = [];
        for (const leader of sortedfLeaders) {
          // Lower bit is higher tier
          sortedListOfLeaders.push(`leader-data-${leader.leaderId}`);
        }

        // Store list of leaders
        localStorage.setItem(`leader-data-list`, JSON.stringify(sortedListOfLeaders));

        // Set TTL
        const ttl = new Date();
        ttl.setMonth(ttl.getMonth() + 1);
        localStorage.setItem('leader-data-ttl', ttl.toString());

        return sortedfLeaders;
      }),
      tap((_) => this.log('fetched leader data')),
      catchError(this.handleErrorNoLogout<Leader[]>('fetchLeaderData', [])),
    );
  }

  private returnLocalLeaderData(): Observable<Leader[]> {
    const localLeaderList = JSON.parse(localStorage.getItem('leader-data-list'));
    console.debug(localLeaderList);

    try {
      const leaders: Leader[] = [];
      for (const leaderEntry of localLeaderList) {
        console.debug(leaderEntry);
        console.debug(localStorage.getItem(leaderEntry));
        const leader: Leader = JSON.parse(localStorage.getItem(leaderEntry));
        leaders.push(leader);
      }
      return of(leaders);
    } catch (error) {
      console.error(error);
      return this.fetchAndReturnLeaderData();
    }
  }

  private fetchAndReturnPPLSettings(): Observable<PPLSettings> {
    const url = `${api.serverUrl}/api/v2/appsettings`;

    return this.http.get(url, this.httpOptions).pipe(
      tap(() => console.debug(`++ /api/v2/appsettings was newly called at ${new Date().toLocaleTimeString()} ++`)),
      map((response: any) => {
        const settings: PPLSettings = {
          showTrainerCard: response.showTrainerCard,
          bingoBoard: response.bingoBoard,
          eventIsOver: response.eventIsOver,
          eventSupportsQueueState: response.eventSupportsQueueState,
          leadersToDefeat: response.leadersToDefeat,
          elitesToDefeat: response.elitesToDefeat,
          leagueFormat: response.leagueFormat,
          assets: response.assets,
          meetupTimes: response.meetupTimes
            .map((meetupTime: { location: any; startTime: string; duration: number }) => {
              return {
                location: meetupTime.location,
                startTime: Date.parse(meetupTime.startTime),
                duration: meetupTime.duration,
                endTime: Date.parse(meetupTime.startTime) + meetupTime.duration * 60 * 1000,
              };
            })
            .sort((a, b) => (a.startTime > b.startTime ? 1 : b.startTime > a.startTime ? -1 : 0)),
        };

        // Store settings
        localStorage.setItem('app-settings', JSON.stringify(settings));

        // Set TTL
        const ttl = new Date();
        ttl.setHours(ttl.getMinutes() + 15);
        localStorage.setItem('app-settings-ttl', ttl.toString());

        return settings;
      }),
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
    console.debug(`ChallengerService: ${message}`);
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
  getBattleFormatsFromBitmask(bitmask: number): number[] {
    const battleFormats = [];
    for (const key of Object.keys(battleFormatsMap)) {
      if (bitmask & battleFormatsMap[key]) {
        battleFormats.push(battleFormatsMap[key]);
      }
    }

    return battleFormats;
  }

  //   Cookies
  getLoginId(): string {
    return this.cookieService.get('loginId');
  }
  setLoginId(loginId: string) {
    return this.cookieService.set('loginId', loginId, 1);
  }
  getIsLeader(): boolean {
    return 'true' === this.cookieService.get('isLeader');
  }
  setLeaderId(leaderId: string) {
    return this.cookieService.set('leaderId', leaderId, 1);
  }
  getToken(): string {
    return this.cookieService.get('token');
  }
  setToken(token: string) {
    return this.cookieService.set('token', token, 1);
  }
  setIsLeader(isLeader: boolean) {
    return this.cookieService.set('isLeader', String(isLeader), 1);
  }
  getBingoViewed(): boolean {
    return 'true' === this.cookieService.get('bingoViewed');
  }
  setBingoViewed() {
    return this.cookieService.set('bingoViewed', String(true), 7);
  }
  clearCookies() {
    return this.cookieService.deleteAll();
  }
}
