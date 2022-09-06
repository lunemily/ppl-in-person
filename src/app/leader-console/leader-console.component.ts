import { Component, Inject, Input, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Leader } from '../models/leader';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LeaderService } from '../services/leader.service';

export interface DialogData {
  previousName: string;
  newName: string;
}

@Component({
  selector: 'app-leader-console',
  templateUrl: './leader-console.component.html',
  styleUrls: ['./leader-console.component.scss'],
})
export class LeaderConsoleComponent implements OnInit {
  badgeImageUrl = 'assets/images/pokeball.png';
  leaderImageUrl = 'assets/images/pokeball.png';
  myAngularxQrCode: string;
  battleCode: string;
  showCamera: boolean;
  options: UntypedFormGroup;
  hideRequiredControl = new UntypedFormControl(false);
  floatLabelControl = new UntypedFormControl('auto');

  previousName: string;
  newName: string;

  @Input() leader: Leader;

  constructor(public dialog: MatDialog, private leaderService: LeaderService) {}

  ngOnInit(): void {
    this.showCamera = false;
    this.myAngularxQrCode = `https://paxpokemonleague.net/qr/?leader=${this.leader.leaderId}`;
    this.battleCode = this.generateCode();
  }

  enqueueQR(): void {
    if (this.showCamera === false) {
      this.showCamera = true;
    } else {
      this.showCamera = false;
    }
  }

  generateCode(): string {
    let code = '';
    let possible = '0123456789';

    for (let i = 0; i < 8; i++) code += possible.charAt(Math.floor(Math.random() * possible.length));

    return code.match(/.{1,4}/g).join(' ');
  }
}
