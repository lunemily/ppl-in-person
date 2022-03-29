import { Component, Input, OnInit } from '@angular/core';
import { Badge } from 'src/app/models/badge';

@Component({
  selector: 'app-badge-item',
  templateUrl: './badge-item.component.html',
  styleUrls: ['./badge-item.component.scss']
})
export class BadgeItemComponent implements OnInit {
  @Input() badge: Badge;

  constructor() { }

  ngOnInit(): void {
  }

}
