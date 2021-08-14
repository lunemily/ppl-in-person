import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Challenger } from '../challenger';
import { ChallengerService } from '../challenger.service';

@Component({
  selector: 'app-challenger-search',
  templateUrl: './challenger-search.component.html',
  styleUrls: [ './challenger-search.component.css' ]
})
export class ChallengerSearchComponent implements OnInit {
  searchValue = "";
  challengers$: Observable<Challenger[]>;
  private searchTerms = new Subject<string>();

  constructor(private challengerService: ChallengerService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.challengers$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.challengerService.searchChallengers(term)),
    );
  }
}