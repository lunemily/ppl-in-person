import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  @Output('toggleSidenav') callToggleSidenav: EventEmitter<any> = new EventEmitter();

  constructor(public headerService: HeaderService, private htmlTitle: Title) {}

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
}
