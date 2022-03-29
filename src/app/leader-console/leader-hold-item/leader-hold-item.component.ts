import { Component, Input, OnInit } from '@angular/core';
import { Hold } from 'src/app/models/hold';
import { LeaderService } from 'src/app/services/leader.service';

@Component({
  selector: 'app-leader-hold-item',
  templateUrl: './leader-hold-item.component.html',
  styleUrls: ['./leader-hold-item.component.scss']
})
export class LeaderHoldItemComponent implements OnInit {
  @Input() leaderId: string;
  @Input() hold: Hold;

  constructor(
    private leaderService: LeaderService,) { }

  ngOnInit(): void {
  }

  unholdFront(challengerId: string): void {
    this.leaderService.unholdChallenger(this.leaderId, challengerId, true)
  }

  unholdBack(challengerId: string): void {
    this.leaderService.unholdChallenger(this.leaderId, challengerId, false)
  }

}
