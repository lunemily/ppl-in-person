import { Component, OnInit } from '@angular/core';
import { pplEvent } from '../constants.data';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {}

  goHome() {
    window.location.reload();
  }

  openChallenging() {
    window.open(`assets/images/challenging-${pplEvent.toLowerCase()}.png`);
  }

  openPrizes() {
    window.open(`assets/images/prizes-${pplEvent.toLowerCase()}.png`);
  }

  openRules() {
    window.open(`assets/images/rules-${pplEvent.toLowerCase()}.png`);
  }

  openAboutLeaders() {
    window.location.reload();
  }

  logout() {
    this.authenticationService.logout();
  }
}
