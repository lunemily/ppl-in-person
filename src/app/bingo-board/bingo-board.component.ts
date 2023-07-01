import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { pplEvent } from '../constants.data';
import { BingoSpace } from '../models/bingo-space';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-bingo-board',
  templateUrl: './bingo-board.component.html',
  styleUrls: ['./bingo-board.component.scss'],
})
export class BingoBoardComponent implements OnInit {
  loginId: string;
  isLeader: boolean;
  bingoBoard: BingoSpace[][];

  // Copy
  bingoHeader = `assets/images/bingo-header-${pplEvent.toLowerCase()}.png`;
  bingoHeaderAlt = `PAX ${pplEvent} ${new Date().getFullYear()} Pokemon League Tera Bingo`;
  bingoHowTo = `assets/images/bingo-how-${pplEvent.toLowerCase()}.png`;
  bingoHowToAlt =
    'How it works: Each time you battle a gym leader, win or lose you will automatically catch their Signature Pokemon on your bingo card. Successfully capture 5 in a line to complete a bingo and win a prize!';

  constructor(private apiService: ApiService, private cookieService: CookieService) {}

  ngOnInit(): void {
    this.loginId = this.cookieService.get('loginId');
    this.isLeader = 'true' == this.cookieService.get('isLeader');
    if (this.loginId && !this.isLeader) {
      this.getBingoBoard();
    }
  }
  getBingoBoard() {
    this.apiService.getBingoBoard(this.loginId).subscribe((bingoBoard) => {
      this.bingoBoard = bingoBoard;
    });
  }
}
