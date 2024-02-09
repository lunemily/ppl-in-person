import { Component, ComponentFactoryResolver, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Person } from '../models/person';
import { ApiService } from '../services/api.service';
import { Challenger } from '../models/challenger';
import { MessageService } from '../services/message.service';
import { api, pplEvent } from '../constants.data';
import { DataService } from '../services/static-data.service';
import { Leader } from '../models/leader';

@Component({
  selector: 'app-trainer-card',
  templateUrl: './trainer-card.component.html',
  styleUrls: ['./trainer-card.component.scss'],
})
export class TrainerCardComponent implements OnInit {
  @Input() hideName: boolean;
  challengerId: string;
  person: Person;
  @Input() challenger: Challenger;
  trainerCardLink: string;
  url = api.serverUrl;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private messageService: MessageService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
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
}
