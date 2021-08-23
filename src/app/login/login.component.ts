import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ChallengerService } from '../challenger.service';
import { HeaderService } from '../header.service';
import { LeaderService } from '../leader.service';

import { Challenger } from '../challenger';
import { Leader } from '../leader';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() leader: Leader;
  @Input() challenger: Challenger;

  constructor(
    private route: ActivatedRoute,
    private challengerService: ChallengerService,
    private headerService: HeaderService,
    private leaderService: LeaderService,
  ) { }

  ngOnInit(): void {
    if(this.route.snapshot.queryParams.challenger) {
      this.getChallenger();
    }
    if(this.route.snapshot.queryParams.leader) {
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
