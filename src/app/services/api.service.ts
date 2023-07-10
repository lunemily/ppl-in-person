import { Injectable } from '@angular/core';
import {
  api,
  battleFormatsMap,
  battleFormatsReverseMap,
  leaderTypesMap,
  leaderTypesReverseMap,
} from '../constants.data';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { MessageService } from './message.service';
import { Observable, catchError, map, of, tap } from 'rxjs';
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
  httpOptions = {
    headers: api.httpOtions.headers.append('Authorization', `Bearer ${this.cookieService.get('token')}`),
    // headers: new HttpHeaders({ Authorization: `Bearer ${this.cookieService.get('token')}` }),
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
        let challenger: Challenger = {
          id: id,
          displayName: response['displayName'],
          badgesEarned: response['badgesEarned'].map(function (item: Leader) {
            let leader: Leader = {
              leaderId: item['leaderId'],
              displayName: item['leaderName'],
              badgeName: item['badgeName'],
            };
            return leader;
          }, []),
        };

        return challenger;
      }),
      tap((_) => console.debug(`fetched challenger id=${id}`)),
      catchError(this.handleError<Challenger>(`getChallenger id=${id}`))
    );
  }

  // GET OBJECT(S) FUNCTIONS
  getLeader(id: string): Observable<Leader> {
    const url = `${api.serverUrl}/api/v2/leader/${id}`;

    let reponse =
      '{"loginId":"73986cb938a84d6d","leaderId":"f00c087d1a2c","leaderName":"Lord Fingler, the Artiste","badgeName":"Artiste Badge","winCount":0,"lossCount":69,"badgesAwarded":69,"queue":[],"onHold":[]}';

    // return of(reponse).pipe(
    return this.http.get<Leader>(url, this.httpOptions).pipe(
      map((response) => {
        /** Create object to return. Add in all leaders now. */
        let leader: Leader = {
          id: id,
          leaderId: response['leaderId'],
          displayName: response['leaderName'],
          battleFormatIds: this.dataService.getBattleFormatsFromBitmask(response['battleFormat']),
          battleFormats: this.dataService
            .getBattleFormatsFromBitmask(response['battleFormat'])
            .map(function (formatId) {
              let format: Format = {
                id: formatId,
                name: battleFormatsReverseMap[formatId],
              };
              return format;
            }, []),
          leaderTypeIds: this.dataService.getLeaderTypesFromBitmask(response['leaderType']),
          leaderTypes: this.dataService.getLeaderTypesFromBitmask(response['leaderType']).map(function (typeId) {
            let type: Format = {
              id: typeId,
              name: leaderTypesReverseMap[typeId],
            };
            return type;
          }, []),
          queue: response['queue'].map(function (item) {
            let queue: Queue = {
              position: item['position'],
              challengerId: item['challengerId'],
              displayName: item['displayName'],
              battleCode: item['linkCode'],
              battleFormat: {
                id: item['format'],
                name: battleFormatsReverseMap[item['format']],
              },
              battleDifficulty: {
                id: item['difficulty'],
                name: leaderTypesReverseMap[item['difficulty']],
              },
            };
            return queue;
          }, []),
          queueOpen: response['queueOpen'],
          onHold: response['onHold'].map(function (item) {
            let hold: Hold = {
              challengerId: item['challengerId'],
              displayName: item['displayName'],
            };
            return hold;
          }, []),
          twitchEnabled: response['twitchEnabled'],
          wins: response['winCount'],
          losses: response['lossCount'],
          badgesAwarded: response['badgesAwarded'],
          feedbackSurveyUrl: response['feedbackSurveyUrl'] ? response['feedbackSurveyUrl'] : null,
        };
        return leader;
      }),
      tap((_) => console.debug(`fetched leader id=${id}`)),
      catchError(this.handleError<Leader>(`leader id=${id}`))
    );
    // END: real data
  }

  /** GET challenger from the server */
  getChallenger(id: string): Observable<Challenger> {
    const url = `${api.serverUrl}/api/v2/challenger/${id}`;

    let response =
      '{"id":"433c4b55a17da084","displayName":"lunelleast","queuesEntered":[],"badgesEarned":[],"bingoBoard":[["9ddbf474802e","82ee137cec0a","505ae7cfcf50","3f2fdd84c972","b4ec415c761a"],["f27c016d37c9","94660e8e0cbc","5aa97464ba52","70022f182dab","354d81a64586"],["e4ce20138ea7","c881ce67b0b9","","6f6987c7fcb5","d13b6a996d12"],["694e553197d0","7944e32f799a","116e1c1e242b","4fc4e2f3e847","07e84bcc07cf"],["49b1a6453903","eb604a2a0eee","0f50d12ba4cc","a9f3e51dffc8","aed5dc645d93"]],"championDefeated":false}';

    // return of(JSON.parse(response)).pipe(
    return this.http.get<Challenger>(url, this.httpOptions).pipe(
      map((response) => {
        /** Create object to return. Add in all leaders now. */
        let challenger: Challenger = {
          id: id,
          displayName: response['displayName'],
          queuesEntered: response['queuesEntered']
            .reduce(function (result, item) {
              let queue: Queue = {
                displayName: item['leaderName'],
                position: item['position'] + 1,
                leaderId: item['leaderId'],
                challengerId: id,
                battleFormat: {
                  id: item['format'],
                  name: battleFormatsReverseMap[item['format']],
                },
                battleDifficulty: {
                  id: item['difficulty'],
                  name: leaderTypesReverseMap[item['difficulty']],
                },
                battleCode: item['linkCode'],
              };
              result.push(queue);
              return result;
            }, [])
            .concat(
              response['queuesOnHold'].reduce(function (result, item) {
                let queue: Queue = {
                  displayName: item['leaderName'],
                  position: -1,
                  leaderId: item['leaderId'],
                  challengerId: id,
                  battleFormat: {
                    id: item['format'],
                    name: battleFormatsReverseMap[item['format']],
                  },
                  battleDifficulty: {
                    id: item['difficulty'],
                    name: leaderTypesReverseMap[item['difficulty']],
                  },
                };
                result.push(queue);
                return result;
              }, [])
            ),
          badgesEarned: response['badgesEarned'].map(function (item: Leader) {
            let leader: Leader = {
              leaderId: item['leaderId'],
              displayName: item['leaderName'],
              badgeName: item['badgeName'],
            };
            return leader;
          }, []),
          feedbackSurveyUrl: response['feedbackSurveyUrl'] ? response['feedbackSurveyUrl'] : null,
          championSurveyUrl: response['championDefeated'] ? response['championSurveyUrl'] : null,
        };

        return challenger;
      }),
      tap((_) => console.debug(`fetched challenger id=${id}`)),
      catchError(this.handleError<Challenger>(`getChallenger id=${id}`))
    );
  }

  getChallengers(leaderId: string): Observable<Challenger[]> {
    const url = `${api.serverUrl}/api/v2/leader/${leaderId}/allchallengers`;

    // return of(challengers);
    // BEGIN: real data
    return this.http.get<Challenger[]>(url, this.httpOptions).pipe(
      map((response) => {
        let unsortedChallengers = response.map(function (item) {
          let challenger: Challenger = {
            id: item['id'],
            displayName: item['name'],
          };
          return challenger;
        }, []);
        let sortedChallengers = unsortedChallengers.sort(
          (first, second) => 0 - (first.displayName.toLowerCase() > second.displayName.toLowerCase() ? -1 : 1)
        );
        return sortedChallengers;
      }),
      tap((_) => console.debug('fetched challengers')),
      catchError(this.handleError<Challenger[]>('getChallengers', [], true))
    );
    // END: real data
  }

  // CHALLENGER FUNCTIONS
  setChallengerName(id: string, displayName: string): void {
    const url = `${api.serverUrl}/api/v2/challenger/${id}`;

    console.info("Setting user's name to: " + displayName);

    let display: string = displayName;

    this.http.put<any>(url, { displayName: displayName }, this.httpOptions).subscribe((data) => {
      display = data.id;
      window.location.reload();
    });
  }

  getBingoBoard(id: string): Observable<any> {
    const url = `${api.serverUrl}/api/v2/challenger/${id}/bingoBoard`;
    // Transform each object to {id: "value", earned: "bool"}

    let response =
      '{"bingoBoard":[[{"9ddbf474802e":false},{"82ee137cec0a":false},{"505ae7cfcf50":false},{"3f2fdd84c972":false},{"b4ec415c761a":false}],[{"f27c016d37c9":false},{"94660e8e0cbc":false},{"5aa97464ba52":false},{"70022f182dab":false},{"354d81a64586":false}],[{"e4ce20138ea7":false},{"c881ce67b0b9":false},{"":true},{"6f6987c7fcb5":true},{"d13b6a996d12":false}],[{"694e553197d0":false},{"7944e32f799a":false},{"116e1c1e242b":false},{"4fc4e2f3e847":false},{"07e84bcc07cf":true}],[{"49b1a6453903":false},{"eb604a2a0eee":false},{"0f50d12ba4cc":true},{"a9f3e51dffc8":false},{"aed5dc645d93":true}]]}';

    // return of(JSON.parse(response)).pipe(
    return this.http.get<any>(url, this.httpOptions).pipe(
      map((response) => {
        return response['bingoBoard'].map(function (rawRow: []) {
          let row: [] = rawRow;
          return row.map(function (rawColumn: {}) {
            let intermediateColumn = Object.entries(rawColumn)[0];
            let column = {
              id: intermediateColumn[0] === '' ? 'missingno' : intermediateColumn[0],
              earned: intermediateColumn[1],
            };
            return column;
          }, []);
        }, []);
      }),
      tap((_) => console.debug(`fetched bingoBoard for challenger id=${id}`)),
      catchError(this.handleError<Challenger>(`bingoBoard id=${id}`))
    );
  }

  // LEADER FUNCTIONS
  openQueue(loginId: string, duoMode: boolean = false): void {
    const url = `${api.serverUrl}/api/v2/leader/${loginId}/openqueue`;

    this.http.post<any>(url, { duoMode: duoMode }, this.httpOptions).subscribe(
      (data) => {
        window.location.reload();
      },
      (error) => {
        this.messageService.showError(error['error']['error']);
      }
    );
  }

  closeQueue(loginId: string): void {
    const url = `${api.serverUrl}/api/v2/leader/${loginId}/closequeue`;

    this.http.post<any>(url, {}, this.httpOptions).subscribe(
      (data) => {
        window.location.reload();
      },
      (error) => {
        this.messageService.showError(error['error']['error']);
      }
    );
  }

  goLive(loginId: string): void {
    const url = `${api.serverUrl}/api/v2/leader/${loginId}/live`;

    this.http.post<any>(url, {}, this.httpOptions).subscribe(
      (data) => {
        this.messageService.showError("You've gone live!");
      },
      (error) => {
        this.messageService.showError(error['error']['error']);
      }
    );
  }

  // MATCH FUNCTIONS
  enqueue(
    challengerId: string,
    leaderId: string,
    battleFormat: number = battleFormatsMap.singles,
    leaderType: number = leaderTypesMap.casual,
    challengerInitiated: boolean = true
  ): void {
    const url = challengerInitiated
      ? `${api.serverUrl}/api/v2/challenger/${challengerId}/enqueue/${leaderId}`
      : `${api.serverUrl}/api/v2/leader/${leaderId}/enqueue/${challengerId}`;

    if (!battleFormat || !leaderType) {
      this.messageService.showError('No difficulty and/or format selected');
      return;
    }

    let postBody = {
      battleFormat: battleFormat,
      battleDifficulty: leaderType,
    };

    this.http.post<any>(url, postBody, this.httpOptions).subscribe(
      (data) => {
        window.location.reload();
      },
      (error) => {
        console.error(`Posted to url: ${url} with body: ${JSON.stringify(postBody)}`);
        this.messageService.showError(error['error']['error']);
      }
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
        this.messageService.showError(error['error']['error']);
      }
    );
  }

  unholdChallenger(leaderId: string, challengerId: string, placeAtFront: boolean): void {
    const url = `${api.serverUrl}/api/v2/leader/${leaderId}/unhold/${challengerId}`;

    this.http.post<any>(url, { placeAtFront: placeAtFront }, this.httpOptions).subscribe(
      (data) => {
        window.location.reload();
      },
      (error) => {
        this.messageService.showError(error['error']['error']);
      }
    );
  }

  // reportBattle(leaderId: string, challengerId: string, win: boolean, badge: boolean): void {
  reportBattle(queue: Queue, win: boolean, badge: boolean): void {
    let leaderId = queue.leaderId;
    let challengerId = queue.challengerId;
    let url = `${api.serverUrl}/api/v2/leader/${leaderId}/report/${challengerId}`;
    if (queue.battleFormat.id == 4) {
      if ('otherChallengerId' in queue) {
        let otherChallengerId = queue.otherChallengerId;
        url += `/${otherChallengerId}`;
      } else {
        this.messageService.showError('Multi-battle challenger does not have additional challenger');
        return;
      }
    }
    let body = {
      challengerWin: win,
      badgeAwarded: badge,
    };

    this.http.post<any>(url, body, this.httpOptions).subscribe(
      (data) => {
        window.location.reload();
      },
      (error) => {
        this.messageService.showError(error['error']['error']);
      }
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
        this.messageService.showError(error['error']['error']);
      }
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
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

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private messageService: MessageService,
    private dataService: DataService,
    private authenticationService: AuthenticationService
  ) {}
}
