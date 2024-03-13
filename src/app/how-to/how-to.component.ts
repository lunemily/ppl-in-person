import { Component, Input, OnInit } from '@angular/core';
import { pplEvent } from '../constants.data';
import { DataService } from '../services/static-data.service';
import { MatTabGroup } from '@angular/material/tabs';
import { PPLSettings } from '../models/settings';

@Component({
  selector: 'app-how-to',
  templateUrl: './how-to.component.html',
  styleUrls: ['./how-to.component.scss'],
})
export class HowToComponent implements OnInit {
  pplSettings: PPLSettings;
  pplEvent = pplEvent;
  isBattleFrontierFormat: boolean = false;
  elitesInLeague: boolean = false;
  year: string;
  challengingImage = `assets/images/challenging-${pplEvent.toLowerCase()}.png`;
  prizesImage = `assets/images/prizes-${pplEvent.toLowerCase()}.png`;
  scheduleImage = `assets/images/schedule-${pplEvent.toLowerCase()}.png`;
  @Input() tabGroup: MatTabGroup;

  ngOnInit(): void {
    this.year = new Date().getFullYear().toString();
    this.loadPPLSettings();
    this.identifyLeagueFormat();
  }

  goToConsoleTab(): void {
    this.tabGroup.selectedIndex = 0;
  }

  loadPPLSettings() {
    this.dataService.getPPLSettings().subscribe((pplSettings) => {
      this.pplSettings = pplSettings;
    });
  }

  identifyLeagueFormat(): void {
    if (this.pplSettings.leagueFormat.emblemsForChamp === 0) {
      // Emblems not required for champ
      // assume battle frontier
      this.isBattleFrontierFormat = true;
    }
    if (this.pplSettings.leagueFormat.emblemWeight > 0) {
      // Elites present in league format
      this.elitesInLeague = true;
    }
  }

  constructor(private dataService: DataService) {}
}
