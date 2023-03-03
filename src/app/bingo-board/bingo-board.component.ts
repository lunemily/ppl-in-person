import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Challenger } from '../models/challenger';
import { ChallengerService } from '../services/challenger.service';

@Component({
  selector: 'app-bingo-board',
  templateUrl: './bingo-board.component.html',
  styleUrls: ['./bingo-board.component.scss'],
})
export class BingoBoardComponent implements OnInit {
  loginId: string;
  isLeader: boolean;
  bingoBoard: [][];

  constructor(private challengerService: ChallengerService, private cookieService: CookieService) {}

  ngOnInit(): void {
    this.loginId = this.cookieService.get('loginId');
    this.isLeader = 'true' == this.cookieService.get('isLeader');
    if (this.loginId && !this.isLeader) {
      this.getBingoBoard();
    }
  }
  getBingoBoard() {
    this.challengerService.getBingoBoard(this.loginId).subscribe((bingoBoard) => {
      this.bingoBoard = bingoBoard;
    });
  }
}
