import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Challenger } from '../challenger';
// import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-challenger-console',
  templateUrl: './challenger-console.component.html',
  styleUrls: ['./challenger-console.component.css']
})
export class ChallengerConsoleComponent implements OnInit {
  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');

  help: string = "help"

  @Input() challenger: Challenger;

  constructor() { }

  ngOnInit(): void {
  }

  editName(): void {
  }

  saveName(): void {
  }

}
