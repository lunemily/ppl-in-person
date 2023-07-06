import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { pplEvent, sidenav } from '../constants.data';
import { PPLHelpDialog } from '../header/header.component';
import { PPLSettings } from '../models/settings';
import { AuthenticationService } from '../services/authentication.service';
import { DataService } from '../services/static-data.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  @Output('closeSidenav') callCloseSidenav: EventEmitter<any> = new EventEmitter();
  pplSettings: PPLSettings;

  constructor(private authenticationService: AuthenticationService, private dataService: DataService) {}

  ngOnInit(): void {
    this.loadPPLSettings();
  }

  loadPPLSettings() {
    this.dataService.getPPLSettings().subscribe((pplSettings) => {
      this.pplSettings = pplSettings;
    });
  }

  closeSidenav() {
    this.callCloseSidenav.emit();
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
