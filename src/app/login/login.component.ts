import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ChallengerService } from '../services/challenger.service';
import { HeaderService } from '../services/header.service';
import { LeaderService } from '../services/leader.service';
import { CookieService } from 'ngx-cookie-service';

import { Challenger } from '../models/challenger';
import { Leader } from '../models/leader';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginId: string;
  isLeader: boolean;
  @Input() leader: Leader;
  @Input() challenger: Challenger;
  showLogin: boolean;

  constructor(
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private challengerService: ChallengerService,
    private cookieService: CookieService,
    private headerService: HeaderService,
    private leaderService: LeaderService
  ) {}

  ngOnInit(): void {
    this.showLogin = true;
    this.loginId = this.cookieService.get('loginId');
    this.isLeader = 'true' == this.cookieService.get('isLeader');
    if (this.loginId) {
      this.showLogin = false;
      if (this.isLeader) {
        this.getLeader();
      } else {
        this.getChallenger();
      }
    }
    this.headerService.setUrl(window.location.href);
  }

  getChallenger(): void {
    this.challengerService.getChallenger(this.loginId).subscribe((challenger) => (this.challenger = challenger));
  }

  getLeader(): void {
    this.leaderService.getLeader(this.loginId).subscribe((leader) => (this.leader = leader));
  }

  logout() {
    this.authenticationService.logout();
  }
}
