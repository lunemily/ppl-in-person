import { Component, Inject, Input, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Challenger } from '../models/challenger';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { features } from '../constants.data';

export interface DialogData {
  previousName: string;
  newName: string;
}

@Component({
  selector: 'app-challenger-console',
  templateUrl: './challenger-console.component.html',
  styleUrls: ['./challenger-console.component.scss'],
})
export class ChallengerConsoleComponent implements OnInit {
  myAngularxQrCode: string;
  showCamera: boolean;
  options: UntypedFormGroup;
  hideRequiredControl = new UntypedFormControl(false);
  floatLabelControl = new UntypedFormControl('auto');

  previousName: string;
  newName: string;

  @Input() challenger: Challenger;

  leaderData: JSON;

  useQR = features.useQR;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.showCamera = false;
    this.myAngularxQrCode = `https://paxpokemonleague.net/qr/?challenger=${this.challenger.id}`;
  }

  enqueue(): void {
    if (this.showCamera === false) {
      this.showCamera = true;
    } else {
      this.showCamera = false;
    }
  }
}
