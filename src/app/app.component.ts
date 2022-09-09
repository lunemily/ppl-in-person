import { Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CookieService } from 'ngx-cookie-service';
import { HomeComponent } from './home/home.component';
import { Challenger } from './models/challenger';
import { Leader } from './models/leader';
import { AuthenticationService } from './services/authentication.service';
import { ChallengerService } from './services/challenger.service';
import { HeaderService } from './services/header.service';
import { LeaderService } from './services/leader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  loginId: string;
  isLeader: boolean;
  @Input() leader: Leader;
  @Input() challenger: Challenger;
  showLogin: boolean;

  constructor(
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

  toggleSidenav(): void {
    this.sidenav.toggle();
  }
}
