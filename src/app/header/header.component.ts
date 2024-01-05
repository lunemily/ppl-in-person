import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BrowserModule, Title } from '@angular/platform-browser';
import { pplEvent } from '../constants.data';

import { HeaderService } from '../services/header.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  // Base string
  title: string = 'PPL';
  showLogs: boolean = false;
  @Output('toggleSidenav') callToggleSidenav: EventEmitter<any> = new EventEmitter();

  constructor(
    private authenticationService: AuthenticationService,
    public headerService: HeaderService,
    private htmlTitle: Title,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // Add year
    this.title += " '" + new Date().getFullYear().toString().substring(2);
    // Add location
    this.title += ` ${pplEvent}`;
    this.htmlTitle.setTitle(`PAX ${pplEvent} Pokémon League`);
  }

  toggleSidenav() {
    this.callToggleSidenav.emit();
  }

  openHelp() {
    this.dialog.open(PPLHelpDialog);
  }

  logout() {
    this.authenticationService.logout();
  }
}

@Component({
  selector: 'ppl-help-dialog',
  templateUrl: 'ppl-help-dialog.html',
})
export class PPLHelpDialog {}
