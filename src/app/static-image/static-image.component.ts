import { Component, Input, OnInit } from '@angular/core';
import { pplEvent } from '../constants.data';

@Component({
  selector: 'app-static-image',
  templateUrl: './static-image.component.html',
  styleUrls: ['./static-image.component.scss'],
})
export class StaticImageComponent implements OnInit {
  @Input() image;
  pplEvent = pplEvent;

  ngOnInit(): void {}
}
