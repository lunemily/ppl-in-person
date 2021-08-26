import { Component, Input, OnInit } from '@angular/core';
import { LeaderService } from 'src/app/leader.service';
import { Queue } from 'src/app/queue';

@Component({
  selector: 'app-leader-queue-item',
  templateUrl: './leader-queue-item.component.html',
  styleUrls: ['./leader-queue-item.component.css']
})
export class LeaderQueueItemComponent implements OnInit {
  @Input() leaderId: string;
  @Input() queue: Queue;

  constructor(
    private leaderService: LeaderService,) { }

  ngOnInit(): void {
  }

  holdChallenger(challengerId: string): void {
    console.log(challengerId)
    this.leaderService.holdChallenger(this.leaderId, challengerId)
  }

  manageChallenger(): void {
  }

}
