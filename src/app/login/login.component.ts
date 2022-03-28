import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ChallengerService } from '../services/challenger.service';
import { HeaderService } from '../services/header.service';
import { LeaderService } from '../services/leader.service';

import { Challenger } from '../models/challenger';
import { Leader } from '../models/leader';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() leader: Leader;
  @Input() challenger: Challenger;
  showCamera: boolean

  constructor(
    private route: ActivatedRoute,
    private challengerService: ChallengerService,
    private headerService: HeaderService,
    private leaderService: LeaderService,
  ) { }

  ngOnInit(): void {
    this.showCamera = false;
    if(this.route.snapshot.queryParams.challenger) {
      this.showCamera = false;
      this.getChallenger();
    }
    if(this.route.snapshot.queryParams.leader) {
      this.showCamera = false;
      this.getLeader();
    }
    this.headerService.setUrl(window.location.href);
  }

  getChallenger(): void {
    const challenger = this.route.snapshot.queryParams.challenger;
    this.challengerService.getChallenger(challenger)
      .subscribe(challenger => this.challenger = challenger);
  }

  getLeader(): void {
    const leader = this.route.snapshot.queryParams.leader;
    this.leaderService.getLeader(leader)
      .subscribe(leader => this.leader = leader);
  }

}
