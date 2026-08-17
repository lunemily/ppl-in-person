import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Challenger } from '../models/challenger';
import { Leader } from '../models/leader';
import { Person } from '../models/person';
import { ApiService } from '../services/api.service';
import { Subscription } from 'rxjs';
import { DataService } from '../services/static-data.service';
import { MatTabGroup } from '@angular/material/tabs';
import { PPLSettings } from '../models/settings';
import { ChallengerConsoleComponent } from './challenger-console/challenger-console.component';
import { LeaderConsoleComponent } from './leader-console/leader-console.component';
import { NameComponent } from './name/name.component';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-console',
    templateUrl: './console.component.html',
    styleUrls: ['./console.component.scss'],
    standalone: true,
    imports: [
        NgIf,
        MatButtonModule,
        NameComponent,
        LeaderConsoleComponent,
        ChallengerConsoleComponent,
    ],
})
export class ConsoleComponent implements OnInit {
  loginId: string;
  isLeader: boolean;
  person: Person;
  leader: Leader;
  challenger: Challenger;
  feedbackSurveyUrl: string;
  championSurveyUrl: string;
  @Input() reloadConsole: EventEmitter<any>;
  @Input() tabGroup: MatTabGroup;
  private subscription: Subscription;
  seenBingo = false;
  pplSettings: PPLSettings;

  constructor(private apiService: ApiService, private dataService: DataService) {}

  ngOnInit(): void {
    this.loadPPLSettings();
    this.loginId = this.dataService.getLoginId();
    this.isLeader = this.dataService.getIsLeader();
    this.loadUser();
    this.subscribeToParentEmitter();
    this.seenBingo = this.dataService.getBingoViewed();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadPPLSettings(): void {
    this.dataService.getPPLSettings().subscribe((pplSettings) => {
      this.pplSettings = pplSettings;
    });
  }

  loadUser(): void {
    if (this.loginId) {
      if (this.isLeader) {
        this.getLeader();
      } else {
        this.getChallenger();
      }
    }
  }

  getChallenger(): void {
    this.apiService.getChallenger(this.loginId).subscribe((challenger) => {
      this.challenger = challenger;
      this.person = challenger;
      this.feedbackSurveyUrl = this.person.feedbackSurveyUrl;
      this.championSurveyUrl = this.challenger.championSurveyUrl;
    });
  }

  getLeader(): void {
    this.apiService.getLeader(this.loginId).subscribe((leader) => {
      this.leader = leader;
      this.person = leader;
      this.feedbackSurveyUrl = this.person.feedbackSurveyUrl;
    });
  }

  subscribeToParentEmitter(): void {
    this.subscription = this.reloadConsole.subscribe(() => {
      console.info(`Reloading console for user ${this.loginId}`);
      this.loadUser();
    });
  }

  goToBingoTab(): void {
    // Bad. Don't do this
    this.tabGroup.selectedIndex = 3;
  }
}
