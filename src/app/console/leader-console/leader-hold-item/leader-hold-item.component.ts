import { Component, Input, OnInit } from '@angular/core';
import { Hold } from 'src/app/models/hold';
import { ApiService } from 'src/app/services/api.service';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-leader-hold-item',
    templateUrl: './leader-hold-item.component.html',
    styleUrls: ['./leader-hold-item.component.scss'],
    standalone: true,
    imports: [
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
    ],
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
