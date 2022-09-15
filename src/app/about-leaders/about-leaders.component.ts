import { Component, OnInit } from '@angular/core';
import { Leader } from '../models/leader';
import { DataService } from '../services/static-data.service';

@Component({
  selector: 'app-about-leaders',
  templateUrl: './about-leaders.component.html',
  styleUrls: ['./about-leaders.component.scss'],
})
export class AboutLeadersComponent implements OnInit {
  leaderData: Leader[];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getLeaderData().subscribe((data) => {
      this.leaderData = data;
    });
  }
}
