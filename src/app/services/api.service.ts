import { Injectable } from '@angular/core';
import {
  api,
  battleFormatsMap,
  battleFormatsReverseMap,
  leaderTypesMap,
  leaderTypesReverseMap,
} from '../constants.data';
import { HttpClient } from '@angular/common/http';
import { MessageService } from './message.service';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Challenger } from '../models/challenger';
import { Leader } from '../models/leader';
import { DataService } from './static-data.service';
import { Format } from '../models/format';
import { Queue } from '../models/queue';
import { Hold } from '../models/hold';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private dataService: DataService,
    private authenticationService: AuthenticationService,
  ) {}

  httpOptions = {
    headers: api.httpOtions.headers.append('Authorization', `Bearer ${this.dataService.getToken()}`),
  };

  // UNAUTHENTICATED FUNCTIONS
  getOpenQueues(): Observable<any> {
    const url = `${api.serverUrl}/api/v2/openqueues`;

    return this.http.get<any>(url);
  }

  getTrainerCardForChallenger(id: string): Observable<Challenger> {
    const url = `${api.serverUrl}/api/v2/badges/${id}`;

    return this.http.get<Challenger>(url, this.httpOptions).pipe(
      map((response) => {
        /** Create object to return. Add in all leaders now. */
        const challenger: Challenger = {
          id,
          displayName: response.displayName,
          badgesEarned: response.badgesEarned.map(function (item: Leader) {
            const leader: Leader = {
              leaderId: item.leaderId,
              displayName: item.leaderName,
              badgeName: item.badgeName,
            };
            return leader;
          }, []),
        };

        return challenger;
      }),
      tap((_) => console.debug(`fetched challenger id=${id}`)),
      catchError(this.handleError<Challenger>(`getChallenger id=${id}`)),
    );
  }

  // GET OBJECT(S) FUNCTIONS
  getLeader(id: string): Observable<Leader> {
    const url = `${api.serverUrl}/api/v2/leader/${id}`;

    return this.http.get<Leader>(url, this.httpOptions).pipe(
      map((response) => {
        /** Create object to return. Add in all leaders now. */
        const leader: Leader = {
          id,
          leaderId: response.leaderId,
          displayName: response.leaderName,
          battleFormatIds: this.dataService.getBattleFormatsFromBitmask(response.battleFormat),
          battleFormats: this.dataService.getBattleFormatsFromBitmask(response.battleFormat).map(function (formatId) {
            const format: Format = {
              id: formatId,
              name: battleFormatsReverseMap[formatId],
            };
            return format;
          }, []),
          leaderTypeIds: DataService.getLeaderTypesFromBitmask(response.leaderType),
          leaderTypes: DataService.getLeaderTypesFromBitmask(response.leaderType).map(function (typeId) {
            const type: Format = {
              id: typeId,
              name: leaderTypesReverseMap[typeId],
            };
            return type;
          }, []),
          queue: response.queue.map(function (item) {
            const queue: Queue = {
              position: item.position,
              challengerId: item.challengerId,
              displayName: item.displayName,
              battleCode: item.linkCode,
              battleFormat: {
                id: item.format,
                name: battleFormatsReverseMap[item.format],
              },
              badgeArt: `${url}/static/badges/${response.leaderId}.png`,
              battleDifficulty: {
                id: item.difficulty,
                name: leaderTypesReverseMap[item.difficulty],
              },
            };
            return queue;
          }, []),
          queueOpen: response.queueOpen,
          onHold: response.onHold.map(function (item) {
            const hold: Hold = {
              challengerId: item.challengerId,
              displayName: item.displayName,
            };
            return hold;
          }, []),
          twitchEnabled: response.twitchEnabled,
          wins: response.winCount,
          losses: response.lossCount,
          badgesAwarded: response.badgesAwarded,
          feedbackSurveyUrl: response.feedbackSurveyUrl ? response.feedbackSurveyUrl : null,
        };
        return leader;
      }),
      tap((_) => console.debug(`fetched leader id=${id}`)),
      catchError(this.handleError<Leader>(`leader id=${id}`)),
    );
    // END: real data
  }

  /** GET challenger from the server */
  getChallenger(id: string): Observable<Challenger> {
    const url = `${api.serverUrl}/api/v2/challenger/${id}`;

    return this.http.get<Challenger>(url, this.httpOptions).pipe(
      map((response) => {
        /** Create object to return. Add in all leaders now. */
        const challenger: Challenger = {
          id,
          displayName: response.displayName,
          queuesEntered: response.queuesEntered
            .reduce(function (result, item) {
              const queue: Queue = {
                displayName: item.leaderName,
                position: item.position + 1,
                leaderId: item.leaderId,
                challengerId: id,
                battleFormat: {
                  id: item.format,
                  name: battleFormatsReverseMap[item.format],
                },
                battleDifficulty: {
                  id: item.difficulty,
                  name: leaderTypesReverseMap[item.difficulty],
                },
                battleCode: item.linkCode,
                isChampion: DataService.getLeaderTypesFromBitmask(item.difficulty).includes(16), // champion leaderType
              };
              result.push(queue);
              return result;
            }, [])
            .concat(
              response.queuesOnHold.reduce(function (result, item) {
                const queue: Queue = {
                  displayName: item.leaderName,
                  position: -1,
                  leaderId: item.leaderId,
                  challengerId: id,
                  battleFormat: {
                    id: item.format,
                    name: battleFormatsReverseMap[item.format],
                  },
                  battleDifficulty: {
                    id: item.difficulty,
                    name: leaderTypesReverseMap[item.difficulty],
                  },
                  isChampion: DataService.getLeaderTypesFromBitmask(item.difficulty).includes(16), // champion leaderType
                };
                result.push(queue);
                return result;
              }, []),
            ),
          badgesEarned: response.badgesEarned.map(function (item: Leader) {
            const leader: Leader = {
              leaderId: item.leaderId,
              displayName: item.leaderName,
              badgeName: item.badgeName,
              battleFormatIds: [item.format],
              leaderTypeIds: [item.difficulty],
            };
            return leader;
          }, []),
          feedbackSurveyUrl: response.feedbackSurveyUrl ? response.feedbackSurveyUrl : null,
          championSurveyUrl: response.championDefeated ? response.championSurveyUrl : null,
          battleStats: {
            winCount: response.winCount,
            lossCount: response.lossCount,
          },
          hasBingo: response.hasBingo,
        };

        return challenger;
      }),
      tap((_) => console.debug(`fetched challenger id=${id}`)),
      catchError(this.handleError<Challenger>(`getChallenger id=${id}`)),
    );
  }

  getChallengers(leaderId: string): Observable<Challenger[]> {
    const url = `${api.serverUrl}/api/v2/leader/${leaderId}/allchallengers`;

    return this.http.get<Challenger[]>(url, this.httpOptions).pipe(
      map((response) => {
        const unsortedChallengers = response.map((item) => {
          const challenger: Challenger = {
            id: item.id,
            displayName: item.name,
          };
          return challenger;
        }, []);
        return unsortedChallengers.sort(
          (first, second) => 0 - (first.displayName.toLowerCase() > second.displayName.toLowerCase() ? -1 : 1),
        );
      }),
      tap((_) => console.debug('fetched challengers')),
      catchError(this.handleError<Challenger[]>('getChallengers', [], true)),
    );
    // END: real data
  }

  // CHALLENGER FUNCTIONS
  setChallengerName(id: string, displayName: string): void {
    const url = `${api.serverUrl}/api/v2/challenger/${id}`;

    console.info("Setting user's name to: " + displayName);

    let display: string = displayName;

    this.http.put<any>(url, { displayName }, this.httpOptions).subscribe((data) => {
      display = data.id;
      window.location.reload();
    });
  }

  getBingoBoard(id: string): Observable<any> {
    const url = `${api.serverUrl}/api/v2/challenger/${id}/bingoBoard`;
    // Transform each object to {id: "value", earned: "bool"}

    const response =
      '{"bingoBoard":[[{"9ddbf474802e":false},{"82ee137cec0a":false},{"505ae7cfcf50":false},{"3f2fdd84c972":false},{"b4ec415c761a":false}],[{"f27c016d37c9":false},{"94660e8e0cbc":false},{"5aa97464ba52":false},{"70022f182dab":false},{"354d81a64586":false}],[{"e4ce20138ea7":false},{"c881ce67b0b9":false},{"":true},{"6f6987c7fcb5":true},{"d13b6a996d12":false}],[{"694e553197d0":false},{"7944e32f799a":false},{"116e1c1e242b":false},{"4fc4e2f3e847":false},{"07e84bcc07cf":true}],[{"49b1a6453903":false},{"eb604a2a0eee":false},{"0f50d12ba4cc":true},{"a9f3e51dffc8":false},{"aed5dc645d93":true}]]}';

    // return of(JSON.parse(response)).pipe(
    return this.http.get<any>(url, this.httpOptions).pipe(
      map((response) =>
        response.bingoBoard.map((rawRow: []) => {
          const row: [] = rawRow;
          return row.map((rawColumn: {}) => {
            const intermediateColumn = Object.entries(rawColumn)[0];
            const column = {
              id: intermediateColumn[0] === '' ? 'missingno' : intermediateColumn[0],
              earned: intermediateColumn[1],
            };
            return column;
          }, []);
        }, []),
      ),
      tap((_) => console.debug(`fetched bingoBoard for challenger id=${id}`)),
      catchError(this.handleError<Challenger>(`bingoBoard id=${id}`)),
    );
  }

  // LEADER FUNCTIONS
  openQueue(loginId: string, duoMode: boolean = false): void {
    const url = `${api.serverUrl}/api/v2/leader/${loginId}/openqueue`;

    this.http.post<any>(url, { duoMode }, this.httpOptions).subscribe(
      (data) => {
        window.location.reload();
      },
      (error) => {
        this.messageService.showError(error.error.error);
      },
    );
  }

  closeQueue(loginId: string): void {
    const url = `${api.serverUrl}/api/v2/leader/${loginId}/closequeue`;

    this.http.post<any>(url, {}, this.httpOptions).subscribe(
      (data) => {
        window.location.reload();
      },
      (error) => {
        this.messageService.showError(error.error.error);
      },
    );
  }

  goLive(loginId: string): void {
    const url = `${api.serverUrl}/api/v2/leader/${loginId}/live`;

    this.http.post<any>(url, {}, this.httpOptions).subscribe(
      (data) => {
        this.messageService.showError("You've gone live!");
      },
      (error) => {
        this.messageService.showError(error.error.error);
      },
    );
  }

  // MATCH FUNCTIONS
  enqueue(
    challengerId: string,
    leaderId: string,
    battleFormat: number = battleFormatsMap.singles,
    leaderType: number = leaderTypesMap.casual,
    challengerInitiated: boolean = true,
  ): void {
    const url = challengerInitiated
      ? `${api.serverUrl}/api/v2/challenger/${challengerId}/enqueue/${leaderId}`
      : `${api.serverUrl}/api/v2/leader/${leaderId}/enqueue/${challengerId}`;

    if (!battleFormat || !leaderType) {
      this.messageService.showError('No difficulty and/or format selected');
      return;
    }

    const postBody = {
      battleFormat,
      battleDifficulty: leaderType,
    };

    this.http.post<any>(url, postBody, this.httpOptions).subscribe(
      (data) => {
        window.location.reload();
      },
      (error) => {
        console.error(`Posted to url: ${url} with body: ${JSON.stringify(postBody)}`);
        this.messageService.showError(error.error.error);
      },
    );
  }

  holdFromQueue(leaderId: string, challengerId: string, challengerInitiated: boolean = false): void {
    const url = challengerInitiated
      ? `${api.serverUrl}/api/v2/challenger/${challengerId}/hold/${leaderId}`
      : `${api.serverUrl}/api/v2/leader/${leaderId}/hold/${challengerId}`;

    this.http.post<any>(url, {}, this.httpOptions).subscribe(
      (data) => {
        window.location.reload();
      },
      (error) => {
        this.messageService.showError(error.error.error);
      },
    );
  }

  unholdChallenger(leaderId: string, challengerId: string, placeAtFront: boolean): void {
    const url = `${api.serverUrl}/api/v2/leader/${leaderId}/unhold/${challengerId}`;

    this.http.post<any>(url, { placeAtFront }, this.httpOptions).subscribe(
      (data) => {
        window.location.reload();
      },
      (error) => {
        this.messageService.showError(error.error.error);
      },
    );
  }

  // reportBattle(leaderId: string, challengerId: string, win: boolean, badge: boolean): void {
  reportBattle(queue: Queue, win: boolean, badge: boolean): void {
    const leaderId = queue.leaderId;
    const challengerId = queue.challengerId;
    let url = `${api.serverUrl}/api/v2/leader/${leaderId}/report/${challengerId}`;
    if (queue.battleFormat.id === 4) {
      if ('otherChallengerId' in queue) {
        const otherChallengerId = queue.otherChallengerId;
        url += `/${otherChallengerId}`;
      } else {
        this.messageService.showError('Multi-battle challenger does not have additional challenger');
        return;
      }
    }
    const body = {
      challengerWin: win,
      badgeAwarded: badge,
    };

    this.http.post<any>(url, body, this.httpOptions).subscribe(
      (data) => {
        window.location.reload();
      },
      (error) => {
        this.messageService.showError(error.error.error);
      },
    );
  }

  removeFromQueue(leaderId: string, challengerId: string, challengerInitiated: boolean = false): void {
    const url = challengerInitiated
      ? `${api.serverUrl}/api/v2/challenger/${challengerId}/dequeue/${leaderId}`
      : `${api.serverUrl}/api/v2/leader/${leaderId}/dequeue/${challengerId}`;

    this.http.delete<any>(url, this.httpOptions).subscribe(
      (data) => {
        window.location.reload();
      },
      (error) => {
        this.messageService.showError(error.error.error);
      },
    );
  }

  setLinkCode(newLinkCode: string) {
    const leaderId = this.dataService.getLoginId();
    const url = `${api.serverUrl}/api/v2/leader/${leaderId}`;

    // Validation
    const linkCodeRegex = /^[0-9]{8}$/g;
    const validatedLinkCode = newLinkCode.replace(/\s/g, '').match(linkCodeRegex);

    if (validatedLinkCode.length === 1) {
      console.info("Setting leader's linkCode to: " + newLinkCode);
      this.http.put<any>(url, { linkCode: validatedLinkCode[0] }, this.httpOptions).subscribe(() => {
        window.location.reload();
      });
    } else {
      this.messageService.showError('Invalid linkCode. Please try again.');
    }
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   * @param logout
   */
  private handleError<T>(operation = 'operation', result?: T, logout: boolean = false) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.error(`${operation} failed: ${error.message}`);

      if (logout) {
        this.authenticationService.logout();
      }

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
