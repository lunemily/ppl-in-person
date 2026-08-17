import { Component, Input, OnInit } from '@angular/core';
import { Queue } from 'src/app/models/queue';
import { ApiService } from 'src/app/services/api.service';
import { api } from 'src/app/constants.data';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-queue-item',
    templateUrl: './queue-item.component.html',
    styleUrls: ['./queue-item.component.scss'],
    standalone: true,
    imports: [NgIf, MatButtonModule],
})
export class QueueItemComponent implements OnInit {
  @Input() queue: Queue;
  onHold: boolean = false;
  url = api.serverUrl;

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
