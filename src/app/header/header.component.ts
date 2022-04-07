import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../services/authentication.service';
import { HeaderService } from '../services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  // Base string
  title: string = 'PPL';

  constructor(private authenticationService: AuthenticationService, public headerService: HeaderService) {}

  ngOnInit(): void {
    // Add year
    this.title += " '" + new Date().getFullYear().toString().substring(2);
    // Add location
    this.title += ' East';
  }

  openChallenging() {
    window.open('assets/images/challenging-east.png');
  }

  openPrizes() {
    window.open('assets/images/prizes-east.png');
  }

  openRules() {
    window.open('assets/images/rules-east.png');
  }

  // openSchedule() {
  //   window.open('assets/images/schedule.png');
  // }

  logout() {
    this.authenticationService.logout();
  }
}
