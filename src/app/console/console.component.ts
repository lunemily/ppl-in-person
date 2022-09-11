import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Challenger } from '../models/challenger';
import { Leader } from '../models/leader';
import { ChallengerService } from '../services/challenger.service';
import { LeaderService } from '../services/leader.service';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss'],
})
export class ConsoleComponent implements OnInit {
  loginId: string;
  isLeader: boolean;
  leader: Leader;
  challenger: Challenger;

  constructor(
    private challengerService: ChallengerService,
    private cookieService: CookieService,
    private leaderService: LeaderService
  ) {}

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
    this.challengerService.getChallenger(this.loginId).subscribe((challenger) => (this.challenger = challenger));
  }

  getLeader(): void {
    this.leaderService.getLeader(this.loginId).subscribe((leader) => (this.leader = leader));
  }
}
