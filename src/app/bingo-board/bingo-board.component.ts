import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { pplEvent } from '../constants.data';
import { BingoSpace } from '../models/bingo-space';
import { ApiService } from '../services/api.service';
import { api } from '../constants.data';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bingo-board',
  templateUrl: './bingo-board.component.html',
  styleUrls: ['./bingo-board.component.scss'],
})
export class BingoBoardComponent implements OnInit {
  loginId: string;
  isLeader: boolean;
  bingoBoard: BingoSpace[][];
  title: string = 'PPL';
  @Input() reloadBingoBoard: EventEmitter<any>;
  private subscription: Subscription;

  // Copy
  bingoHeader = `assets/images/bingo-header-${pplEvent.toLowerCase()}.png`;
  bingoHeaderAlt = `PAX ${pplEvent} ${new Date().getFullYear()} Pokemon League Tera Bingo`;
  bingoHowTo = `assets/images/bingo-how-${pplEvent.toLowerCase()}.png`;
  bingoHowToAlt =
    'How it works: Each time you battle a gym leader, win or lose you will automatically catch their Signature Pokemon on your bingo card. Successfully capture 5 in a line to complete a bingo and win a prize!';
  url = api.serverUrl;
  bingoClaimPredicate =
    pplEvent.toLowerCase() !== 'online'
      ? 'show an Admin.'
      : 'message @doomy8902 with a screenshot of your bingo board.';

  constructor(private apiService: ApiService, private cookieService: CookieService) {}

  ngOnInit(): void {
    // Add year
    this.title += " '" + new Date().getFullYear().toString().substring(2);
    this.title = `PAX ${pplEvent.toUpperCase()} ${new Date().getFullYear().toString()} POKÉMON LEAGUE\nSIGNATURE BINGO`;
    this.loginId = this.cookieService.get('loginId');
    this.isLeader = 'true' == this.cookieService.get('isLeader');
    if (this.loginId && !this.isLeader) {
      this.getBingoBoard();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getBingoBoard() {
    this.apiService.getBingoBoard(this.loginId).subscribe((bingoBoard) => {
      this.bingoBoard = bingoBoard;
      if (this.bingoBoard.length === 0) {
        this.bingoBoard.push([]);
        this.bingoBoard[0].push({ id: 'missingno', earned: false });
      }
    });
  }

  subscribeToParentEmitter(): void {
    this.subscription = this.reloadBingoBoard.subscribe(() => {
      this.ngOnInit();
    });
  }
}
