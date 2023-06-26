import { Component, Input, OnInit } from '@angular/core';
import { battleFormatsReverseMap } from 'src/app/constants.data';
import { Leader } from 'src/app/models/leader';

@Component({
  selector: 'app-leader-badge',
  templateUrl: './leader-badge.component.html',
  styleUrls: ['./leader-badge.component.scss'],
})
export class LeaderBadgeComponent implements OnInit {
  @Input() leader: Leader;
  battleFormats: {
    id: number;
    name: string;
  }[];

  constructor() {}

  ngOnInit(): void {
    // Populate battleformats
    this.battleFormats = [];
    this.leader.battleFormat?.forEach((format) => {
      this.battleFormats.push({
        id: format,
        name: battleFormatsReverseMap[format],
      });
    });
  }
}
