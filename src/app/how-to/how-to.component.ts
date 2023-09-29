import { Component, OnInit } from '@angular/core';
import { pplEvent } from '../constants.data';
import { DataService } from '../services/static-data.service';

@Component({
  selector: 'app-how-to',
  templateUrl: './how-to.component.html',
  styleUrls: ['./how-to.component.scss'],
})
export class HowToComponent implements OnInit {
  pplEvent = pplEvent;
  year: string;
  prizesImage = `assets/images/prizes-${pplEvent.toLowerCase()}.png`;
  scheduleImage = `assets/images/schedule-${pplEvent.toLowerCase()}.png`;
  leadersToDefeat = 0;
  elitesToDefeat = 0;

  ngOnInit(): void {
    this.year = new Date().getFullYear().toString();
    this.dataService.getPPLSettings().subscribe((settings) => {
      this.leadersToDefeat = settings.leadersToDefeat;
      this.elitesToDefeat = settings.elitesToDefeat;
    });
  }

  constructor(private dataService: DataService) {}
}
