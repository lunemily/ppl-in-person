import { Component, OnInit } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { pplEvent } from '../constants.data';

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
  showLogs: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    public headerService: HeaderService,
    private htmlTitle: Title
  ) {}

  ngOnInit(): void {
    // Add year
    this.title += " '" + new Date().getFullYear().toString().substring(2);
    // Add location
    this.title += ` ${pplEvent}`;
    this.htmlTitle.setTitle(`PAX ${pplEvent} Pokémon League`);
  }

  openChallenging() {
    window.open(`assets/images/challenging-${pplEvent.toLowerCase}.png`);
  }

  openPrizes() {
    window.open(`assets/images/prizes-${pplEvent.toLowerCase}.png`);
  }

  openRules() {
    window.open(`assets/images/rules-${pplEvent.toLowerCase}.png`);
  }

  // openSchedule() {
  //   window.open('assets/images/schedule.png');
  // }

  logout() {
    this.authenticationService.logout();
  }
}
