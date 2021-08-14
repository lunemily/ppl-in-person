import { Component, OnInit, Input, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Clipboard } from '@angular/cdk/clipboard';

import { HeaderService } from '../header.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title: string = "PPL \'21      Online";

  constructor(
    private router : Router,
    public headerService: HeaderService,
    private snackBar: MatSnackBar,
    private clipboard: Clipboard,
  ) { }

  ngOnInit(): void { }

  openChallenging() {
    window.open("assets/images/challenging.png");
  }

  openCopy() {
    this.clipboard.copy(this.headerService.url);
    this.snackBar.open("URL copied to clipboard!", "Dismiss", {
      duration: 2000,
    });
  }

  openRules() {
    window.open("assets/images/rules.png");
  }

  openSchedule() {
    window.open("https://docs.google.com/spreadsheets/d/1IAbFVbaM77S5KE8-p8wtJ2ts_k1fKVFb-lvTfvSsMbw/edit?usp=sharing");
  }
}
