import { Component, OnInit } from '@angular/core';
import { pplEvent } from '../constants.data';

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

  ngOnInit(): void {
    this.year = new Date().getFullYear().toString();
  }
}
