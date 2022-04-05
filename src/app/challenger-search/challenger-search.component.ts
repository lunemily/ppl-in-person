import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { Challenger } from '../models/challenger';
import { ChallengerService } from '../services/challenger.service';
import { LeaderService } from '../services/leader.service';

@Component({
  selector: 'app-challenger-search',
  templateUrl: './challenger-search.component.html',
  styleUrls: ['./challenger-search.component.scss']
})
export class ChallengerSearchComponent implements OnInit {
  @Input() leaderId: string;
  challengers: Challenger[];
  selected: string;
  @Output("enqueueQR") callEnqueueQR: EventEmitter<any> = new EventEmitter();

  constructor(
    private leaderService: LeaderService,
  ) { }

  ngOnInit(): void {
    this.getChallengers();
  }

  getChallengers(): void {
    this.leaderService.getChallengers(this.leaderId)
      .subscribe( challengers => this.challengers = challengers);
  }

  enqueue(): void {
    console.log('enqueueing challenger id:' + this.selected)
    this.leaderService.enqueueChallenger(this.leaderId, this.selected);
  }

  enqueueQR() {
    this.callEnqueueQR.emit();
  }

}
