import { Component, Input, OnInit } from '@angular/core';
import { Challenger } from '../challenger';

@Component({
  selector: 'app-challenger-console',
  templateUrl: './challenger-console.component.html',
  styleUrls: ['./challenger-console.component.css']
})
export class ChallengerConsoleComponent implements OnInit {
  @Input() challenger: Challenger;

  constructor() { }

  ngOnInit(): void {
  }

}
