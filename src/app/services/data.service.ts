import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private serverUrl = 'https://toastserv.com:26438'; // URL to web api
  leaderData: string;

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

  getRemoteData(): any {
    const url = `${this.serverUrl}/allleaderdata`;
    return this.http.get(url).subscribe((data) => {
      return data;
    });
  }

  cacheData(): void {
    if (!this.cookieService.check('leaderData')) {
      this.cookieService.set('leaderData', JSON.stringify(this.getRemoteData()), 7); // Cache lives for 7 days
    }
  }

  parseData(): JSON {
    this.leaderData = this.cookieService.get('leaderData');
    return JSON.parse(this.leaderData);
  }

  constructor(private http: HttpClient, private cookieService: CookieService) {}
}
