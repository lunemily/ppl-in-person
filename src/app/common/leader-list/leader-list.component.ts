import { Component, Input, OnInit } from '@angular/core';
import { api } from 'src/app/constants.data';
import { Leader, isEliteLeader } from 'src/app/models/leader';

@Component({
  selector: 'app-leader-list',
  templateUrl: './leader-list.component.html',
  styleUrls: ['./leader-list.component.scss'],
})
export class LeaderListComponent implements OnInit {
  url = api.serverUrl;
  @Input() leaderList: Leader[];
  @Input() highlightLeaders: boolean;
  @Input() leaderDifficulty: string;

  ngOnInit(): void {
    if (!this.highlightLeaders) {
      this.highlightLeaders = false;
    }
  }

  isEliteLeader(leader: Leader): boolean {
    return isEliteLeader(leader);
  }

  constructor() {}
}
