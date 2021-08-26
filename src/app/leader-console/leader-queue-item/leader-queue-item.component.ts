import { Component, Input, OnInit } from '@angular/core';
import { Queue } from 'src/app/queue';

@Component({
  selector: 'app-leader-queue-item',
  templateUrl: './leader-queue-item.component.html',
  styleUrls: ['./leader-queue-item.component.css']
})
export class LeaderQueueItemComponent implements OnInit {
  @Input() queue: Queue;

  constructor() { }

  ngOnInit(): void {
    console.log(this.queue);
  }

  manageChallenger(): void {
  }

}
