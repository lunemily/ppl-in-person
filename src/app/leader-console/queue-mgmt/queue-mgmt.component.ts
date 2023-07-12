import { Component, Input, OnInit } from '@angular/core';
import { Leader } from 'src/app/models/leader';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-queue-mgmt',
  templateUrl: './queue-mgmt.component.html',
  styleUrls: ['./queue-mgmt.component.scss'],
})
export class QueueMgmtComponent implements OnInit {
  @Input() leader: Leader;
  allowStandardQueue: boolean;
  allowMultiQueue: boolean;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.allowMultiQueue = this.leader.battleFormatIds.includes(4);
    this.allowStandardQueue = this.leader.battleFormatIds.some((item) => [1, 2, 8].includes(item));
  }

  openQueue(duoMode = false) {
    this.apiService.openQueue(this.leader.id, duoMode);
  }

  closeQueue() {
    this.apiService.closeQueue(this.leader.id);
  }

  goLive() {
    this.apiService.goLive(this.leader.id);
  }
}
