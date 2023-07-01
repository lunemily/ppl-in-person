import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

import { map, Observable, startWith, Subject } from 'rxjs';

import { Challenger } from '../models/challenger';
import { Leader } from '../models/leader';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-challenger-search',
  templateUrl: './challenger-search.component.html',
  styleUrls: ['./challenger-search.component.scss'],
})
export class ChallengerSearchComponent implements OnInit {
  myControl = new FormControl<string>('');
  @Input() leader: Leader;
  selectedFormat: number;
  selectedDifficulty: number;
  challengers: Challenger[];
  searchValue = '';
  selected: string;
  filteredChallengers: Observable<Challenger[]>;
  @Output('enqueueQR') callEnqueueQR: EventEmitter<any> = new EventEmitter();

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getChallengers();
  }

  getChallengers(): void {
    // this.challengers = challengers;
    this.apiService.getChallengers(this.leader.id).subscribe((challengers) => {
      this.challengers = challengers;
      this.filteredChallengers = this.myControl.valueChanges.pipe(
        startWith(''),
        map((value) => {
          return typeof value !== undefined && value !== null ? this._filter(value) : this.challengers.slice();
        })
      );
    });
  }

  enqueue(): void {
    let challengerId = this.getChallengerIdByDisplayName(this.searchValue);
    this.apiService.enqueue(challengerId, this.leader.id, this.selectedFormat, this.selectedDifficulty, false);
  }

  enqueueQR() {
    this.callEnqueueQR.emit();
  }

  private _filter(name: string): Challenger[] {
    const filterValue = name.toLowerCase();
    return this.challengers.filter((option) => option.displayName.toLowerCase().includes(filterValue));
  }

  getChallengerIdByDisplayName(displayName: string): string {
    return this.challengers.find((challenger) => {
      return challenger.displayName.toLowerCase() === displayName.toLowerCase();
    }).id;
  }
}
