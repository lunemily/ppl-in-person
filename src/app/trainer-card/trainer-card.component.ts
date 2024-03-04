import { Component, ComponentFactoryResolver, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Person } from '../models/person';
import { ApiService } from '../services/api.service';
import { Challenger } from '../models/challenger';
import { MessageService } from '../services/message.service';
import { api, pplEvent } from '../constants.data';
import { DataService } from '../services/static-data.service';
import { Leader, isEliteLeader } from '../models/leader';
import { PPLSettings } from '../models/settings';

@Component({
  selector: 'app-trainer-card',
  templateUrl: './trainer-card.component.html',
  styleUrls: ['./trainer-card.component.scss'],
})
export class TrainerCardComponent implements OnInit {
  pplSettings: PPLSettings;
  @Input() hideName: boolean;
  challengerId: string;
  person: Person;
  @Input() challenger: Challenger;
  trainerCardLink: string;
  url = api.serverUrl;
  isBattleFrontierFormat: boolean = false;
  elitesInLeague: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private messageService: MessageService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.dataService.getPPLSettings().subscribe((pplSettings) => {
      this.pplSettings = pplSettings;
    });
    this.challengerId = this.route.snapshot.queryParamMap.get('id');
    if (this.challengerId) {
      this.apiService.getTrainerCardForChallenger(this.challengerId).subscribe((challenger) => {
        this.person = {
          id: challenger.id,
          displayName: challenger.displayName,
        };
        this.challenger = this.loadBadgesEarned(challenger);
        this.trainerCardLink = `https://paxpokemonleague.net/${pplEvent}/?id=${this.challengerId}`;
      });
    } else if (this.challenger) {
      this.challenger = this.loadBadgesEarned(this.challenger);
      this.trainerCardLink = `https://paxpokemonleague.net/${pplEvent}/?id=${this.challenger.id}`;
    } else {
      console.error('No challenger ID available.');
    }
    this.identifyLeagueFormat();
  }

  shareTrainerCard() {
    this.messageService.showError('Trainer Card link saved to clipboard');
  }

  loadBadgesEarned(challenger: Challenger): Challenger {
    this.dataService.getLeaderData().subscribe((leaders) => {
      let detailedBadgesEarned: Leader[] = challenger.badgesEarned.map((earnedBadge) => {
        earnedBadge.bio = leaders.filter((item) => item.leaderId === earnedBadge.leaderId)[0].bio;
        return earnedBadge;
      });
      challenger.badgesEarned = detailedBadgesEarned;
    });
    return challenger;
  }

  badgePointCount(): number {
    let badgePointCount = 0;
    this.challenger.badgesEarned.map((leader) => {
      if (isEliteLeader(leader)) {
        if (this.pplSettings.leagueFormat.badgesForChamp > 0)
          badgePointCount += this.pplSettings.leagueFormat.emblemWeight;
      } else {
        badgePointCount += 1;
      }
    });
    return badgePointCount;
  }

  badgeCount(): number {
    let badgeCount = 0;
    this.challenger.badgesEarned.map((leader) => {
      if (!isEliteLeader(leader)) {
        badgeCount += 1;
      }
    });
    return badgeCount;
  }

  emblemCount(): number {
    let emblemCount = 0;
    this.challenger.badgesEarned.map((leader) => {
      if (isEliteLeader(leader)) {
        emblemCount += 1;
      }
    });
    return emblemCount;
  }

  identifyLeagueFormat(): void {
    if (this.pplSettings.leagueFormat.emblemsForChamp === 0) {
      // Emblems not required for champ
      // assume battle frontier
      this.isBattleFrontierFormat = true;
    }
    if (this.pplSettings.leagueFormat.emblemWeight > 0) {
      // Elites present in league format
      this.elitesInLeague = true;
    }
  }
}
