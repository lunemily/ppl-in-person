import { Component, OnInit } from '@angular/core';
import { Leader } from '../models/leader';
import { DataService } from '../services/static-data.service';
import { api, leaderTypesReverseMap } from '../constants.data';
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

  constructor(private dataService: DataService, private apiService: ApiService) {}

  ngOnInit(): void {
    this.loginId = this.dataService.getLoginId();
    this.isLeader = this.dataService.getIsLeader();
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
}
