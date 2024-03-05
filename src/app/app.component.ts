import { Component, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { DataService } from './services/static-data.service';
import { MatDialog } from '@angular/material/dialog';
import { PPLSettings } from './models/settings';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobileResolution: boolean;
  eventIsOver = false;

  constructor(private dataService: DataService, public dialog: MatDialog) {
    if (window.innerWidth < 768) {
      this.isMobileResolution = true;
    } else {
      this.isMobileResolution = false;
    }
  }

  ngOnInit(): void {
    this.loadPPLSettings();
  }

  toggleSidenav(): void {
    this.sidenav.toggle();
  }

  closeSidenav(): void {
    this.sidenav.close();
  }

  loadPPLSettings() {
    this.dataService.getPPLSettings().subscribe((pplSettings) => {
      this.eventIsOver = pplSettings.eventIsOver;
      if (this.eventIsOver) {
        console.error('What are you still doing here? PPL is over.');
        this.eventIsOver = pplSettings.eventIsOver;
        this.openEventOverDialog();
      }
    });
  }

  openEventOverDialog() {
    this.dialog.open(EventOverDialog);
  }
}

@Component({
  selector: 'event-over-dialog',
  templateUrl: 'event-over-dialog.html',
  styleUrls: ['./event-over-dialog.scss'],
})
export class EventOverDialog {}
