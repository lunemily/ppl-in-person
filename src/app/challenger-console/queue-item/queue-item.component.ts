import { Component, Input, OnInit } from '@angular/core';
import { Queue } from 'src/app/models/queue';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-queue-item',
  templateUrl: './queue-item.component.html',
  styleUrls: ['./queue-item.component.scss'],
})
export class QueueItemComponent implements OnInit {
  @Input() queue: Queue;
  onHold: boolean = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.onHold = this.queue.position === -1 ? true : false;
  }

  hold(): void {
    this.apiService.holdFromQueue(this.queue.leaderId, this.queue.challengerId, true);
  }

  drop(): void {
    this.apiService.removeFromQueue(this.queue.leaderId, this.queue.challengerId, true);
  }
}
