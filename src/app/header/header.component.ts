import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BrowserModule, Title } from '@angular/platform-browser';
import { pplEvent } from '../constants.data';

import { HeaderService } from '../services/header.service';
import { AuthenticationService } from '../services/authentication.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
    ],
})
export class HeaderComponent implements OnInit {
  // Base string
  title: string = 'PPL';
  showLogs: boolean = false;

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

  logout() {
    this.authenticationService.logout();
  }
}

@Component({
    selector: 'ppl-help-dialog',
    templateUrl: 'ppl-help-dialog.html',
    standalone: true,
    imports: [MatDialogModule, MatButtonModule],
})
export class PPLHelpDialog {}
