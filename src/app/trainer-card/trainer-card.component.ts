import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Person } from '../models/person';
import { ApiService } from '../services/api.service';
import { Challenger } from '../models/challenger';

@Component({
  selector: 'app-trainer-card',
  templateUrl: './trainer-card.component.html',
  styleUrls: ['./trainer-card.component.scss'],
})
export class TrainerCardComponent implements OnInit {
  challengerId: string;
  person: Person;
  challenger: Challenger;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.challengerId = this.route.snapshot.queryParamMap.get('id');
    this.apiService.getTrainerCardForChallenger(this.challengerId).subscribe((challenger) => {
      this.person = {
        id: challenger.id,
        displayName: challenger.displayName,
      };
      this.challenger = challenger;
    });
  }
}
