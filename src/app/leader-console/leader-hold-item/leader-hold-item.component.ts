import { Component, Input, OnInit } from '@angular/core';
import { Hold } from 'src/app/models/hold';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-leader-hold-item',
  templateUrl: './leader-hold-item.component.html',
  styleUrls: ['./leader-hold-item.component.scss'],
})
export class LeaderHoldItemComponent implements OnInit {
  @Input() leaderId: string;
  @Input() hold: Hold;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {}

  unholdFront(challengerId: string): void {
    this.apiService.unholdChallenger(this.leaderId, challengerId, true);
  }

  unholdBack(challengerId: string): void {
    this.apiService.unholdChallenger(this.leaderId, challengerId, false);
  }
}
