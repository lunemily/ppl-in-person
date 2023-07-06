import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Challenger } from '../models/challenger';
import { Leader } from '../models/leader';
import { Person } from '../models/person';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss'],
})
export class ConsoleComponent implements OnInit {
  loginId: string;
  isLeader: boolean;
  person: Person;
  leader: Leader;
  challenger: Challenger;
  feedbackSurveyUrl: string;
  championSurveyUrl: string;

  constructor(private cookieService: CookieService, private apiService: ApiService) {}

  ngOnInit(): void {
    this.loginId = this.cookieService.get('loginId');
    this.isLeader = 'true' == this.cookieService.get('isLeader');
    if (this.loginId) {
      if (this.isLeader) {
        this.getLeader();
      } else {
        this.getChallenger();
      }
    }
  }

  getChallenger(): void {
    this.apiService.getChallenger(this.loginId).subscribe((challenger) => {
      this.challenger = challenger;
      this.person = challenger;
      this.feedbackSurveyUrl = this.person.feedbackSurveyUrl;
      this.championSurveyUrl = this.challenger.championSurveyUrl;
    });
  }

  getLeader(): void {
    this.apiService.getLeader(this.loginId).subscribe((leader) => {
      this.leader = leader;
      this.person = leader;
      this.feedbackSurveyUrl = this.person.feedbackSurveyUrl;
    });
  }
}
