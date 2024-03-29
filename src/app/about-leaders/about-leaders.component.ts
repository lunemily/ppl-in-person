import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Leader } from '../models/leader';
import { DataService } from '../services/static-data.service';
import { api, leaderTypesMap, leaderTypesReverseMap } from '../constants.data';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../services/api.service';

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
  loginId: string;
  isLeader: boolean;
  url = api.serverUrl;

  constructor(
    private dataService: DataService,
    private router: Router,
    private cookieService: CookieService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.loginId = this.cookieService.get('loginId');
    this.isLeader = 'true' == this.cookieService.get('isLeader');
    this.leaderData = {
      casual: [],
      intermediate: [],
      veteran: [],
      elite: [],
      champion: [],
    };

    this.apiService.getOpenQueues().subscribe((openQueues) => {
      this.dataService.getLeaderData().subscribe((data) => {
        data.forEach((leader) => {
          leader.queueOpen = openQueues[leader.leaderId];
          leader.leaderTypeIds.forEach((leaderType) => {
            this.leaderData[leaderTypesReverseMap[leaderType]].push(leader);
          });
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
