import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Leader } from '../models/leader';
import { DataService } from '../services/static-data.service';

@Component({
  selector: 'app-about-leaders',
  templateUrl: './about-leaders.component.html',
  styleUrls: ['./about-leaders.component.scss'],
})
export class AboutLeadersComponent implements OnInit {
  leaderData: Leader[];

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.dataService.getLeaderData().subscribe((data) => {
      this.leaderData = data;
      console.debug(this.leaderData);
    });
  }

  refreshData(): void {
    this.leaderData = [];
    localStorage.clear();
    this.ngOnInit();
  }
}
