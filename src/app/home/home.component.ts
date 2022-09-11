import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Challenger } from '../models/challenger';
import { Leader } from '../models/leader';
import { ChallengerService } from '../services/challenger.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @Input() leader: Leader;
  @Input() challenger: Challenger;

  constructor(private challengerService: ChallengerService) {}

  ngOnInit(): void {
    this.challengerService.fetchLeaderData().subscribe((data) => {
      console.log('Leader data:');
      console.log(data);
      return data;
    });
  }
}
