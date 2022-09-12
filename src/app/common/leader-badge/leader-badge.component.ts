import { Component, Input, OnInit } from '@angular/core';
import { Leader } from 'src/app/models/leader';

@Component({
  selector: 'app-leader-badge',
  templateUrl: './leader-badge.component.html',
  styleUrls: ['./leader-badge.component.scss'],
})
export class LeaderBadgeComponent implements OnInit {
  @Input() leader: Leader;

  constructor() {}

  ngOnInit(): void {}
}
