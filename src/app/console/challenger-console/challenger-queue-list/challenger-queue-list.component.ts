import { Component, Input, OnInit } from '@angular/core';
import { Queue } from 'src/app/models/queue';
import { ApiService } from 'src/app/services/api.service';
import { api } from 'src/environments/environment';
import { MatButtonModule } from '@angular/material/button';
import { NgFor, NgIf } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
    selector: 'app-challenger-queue-list',
    templateUrl: './challenger-queue-list.component.html',
    styleUrls: ['./challenger-queue-list.component.scss'],
    standalone: true,
    imports: [
        MatExpansionModule,
        NgFor,
        NgIf,
        MatButtonModule,
    ],
})
export class ChallengerQueueListComponent implements OnInit {
  @Input() queues: Queue[];
  url = api.serverUrl;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {}

  hold(queue: Queue): void {
    this.apiService.holdFromQueue(queue.leaderId, queue.challengerId, true);
  }

  drop(queue: Queue): void {
    this.apiService.removeFromQueue(queue.leaderId, queue.challengerId, true);
  }
}
