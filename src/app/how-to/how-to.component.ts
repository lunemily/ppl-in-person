import { Component, OnInit } from '@angular/core';
import { pplEvent } from '../constants.data';

@Component({
  selector: 'app-how-to',
  templateUrl: './how-to.component.html',
  styleUrls: ['./how-to.component.scss'],
})
export class HowToComponent {
  prizesImage = `assets/images/prizes-${pplEvent.toLowerCase()}.png`;
  scheduleImage = `assets/images/schedule-${pplEvent.toLowerCase()}.png`;
}
