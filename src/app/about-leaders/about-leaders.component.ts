import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Leader } from '../models/leader';
import { DataService } from '../services/static-data.service';
import { leaderTypesMap, leaderTypesReverseMap } from '../constants.data';

@Component({
  selector: 'app-about-leaders',
  templateUrl: './about-leaders.component.html',
  styleUrls: ['./about-leaders.component.scss'],
})
export class AboutLeadersComponent implements OnInit {
  leaderData: {
    casual: Leader[];
    intermediate: Leader[];
    veteran: Leader[];
    elite: Leader[];
    champion: Leader[];
  };

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.leaderData = {
      casual: [],
      intermediate: [],
      veteran: [],
      elite: [],
      champion: [],
    };
    this.dataService.getLeaderData().subscribe((data) => {
      data.forEach((leader) => {
        leader.leaderType.forEach((leaderType) => {
          this.leaderData[leaderTypesReverseMap[leaderType]].push(leader);
        });
      });
    });
  }

  refreshData(): void {
    this.leaderData = {
      casual: [],
      intermediate: [],
      veteran: [],
      elite: [],
      champion: [],
    };
    localStorage.clear();
    this.ngOnInit();
  }
}
