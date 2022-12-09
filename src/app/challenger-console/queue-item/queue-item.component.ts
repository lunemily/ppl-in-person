import { Component, Input, OnInit } from '@angular/core';
import { Queue } from 'src/app/models/queue';

@Component({
  selector: 'app-queue-item',
  templateUrl: './queue-item.component.html',
  styleUrls: ['./queue-item.component.scss'],
})
export class QueueItemComponent implements OnInit {
  @Input() queue: Queue;
  onHold: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.onHold = this.queue.position === -1 ? true : false;
  }
}
