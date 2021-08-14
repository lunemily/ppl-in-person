import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Challenger } from '../challenger';
import { ChallengerService } from '../challenger.service';
import { HeaderService } from '../header.service';

@Component({
  selector: 'app-challengers',
  templateUrl: './challengers.component.html',
  styleUrls: ['./challengers.component.css']
})
export class ChallengersComponent implements OnInit {

  challengers: Challenger[];

  constructor(
    private route: ActivatedRoute,
    private challengerService: ChallengerService,
    private headerService: HeaderService
  ) { }

  ngOnInit(): void {
    if(!(!!this.route.snapshot.queryParams.id)) {
      this.getChallengers();
    }
    this.headerService.setUrl(window.location.href);
  }

  getChallengers(): void {
    this.challengerService.getChallengers()
      .subscribe( challengers => this.challengers = challengers);
  }
}
