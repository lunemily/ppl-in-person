import { Component, Input } from '@angular/core';
import { Leader } from 'src/app/models/leader';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-queue-mgmt',
  templateUrl: './queue-mgmt.component.html',
  styleUrls: ['./queue-mgmt.component.scss'],
})
export class QueueMgmtComponent {
  @Input() leader: Leader;

  constructor(private apiService: ApiService) {}

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
