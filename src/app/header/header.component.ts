import { Component, OnInit, Input, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Clipboard } from '@angular/cdk/clipboard';

import { HeaderService } from '../services/header.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  title: string = "PPL \'22 East";

  constructor(
    private router : Router,
    private cookieService: CookieService,
    public headerService: HeaderService,
    private snackBar: MatSnackBar,
    private clipboard: Clipboard,
  ) { }

  ngOnInit(): void { }

  openChallenging() {
    window.open("assets/images/challenging.png");
  }

  openPrizes() {
    window.open("assets/images/prizes-east.png");
  }

  openRules() {
    window.open("assets/images/rules-east.png");
  }

  openSchedule() {
    window.open("assets/images/schedule.png");
  }

  logout() {
    this.cookieService.deleteAll();
    window.location.reload();
  }
}
