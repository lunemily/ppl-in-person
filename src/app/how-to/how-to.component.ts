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
  year: string;
  prizesImage = `assets/images/prizes-${pplEvent.toLowerCase()}.png`;
  scheduleImage = `assets/images/schedule-${pplEvent.toLowerCase()}.png`;
  leadersToDefeat = 0;
  elitesToDefeat = 0;
  @Input() tabGroup: MatTabGroup;

  ngOnInit(): void {
    this.year = new Date().getFullYear().toString();
    this.dataService.getPPLSettings().subscribe((settings) => {
      this.leadersToDefeat = settings.leadersToDefeat;
      this.elitesToDefeat = settings.elitesToDefeat;
    });
  }

  goToConsoleTab(): void {
    this.tabGroup.selectedIndex = 0;
  }

  loadPPLSettings() {
    this.dataService.getPPLSettings().subscribe((pplSettings) => {
      this.pplSettings = pplSettings;
    });
  }

  constructor(private dataService: DataService) {}
}
