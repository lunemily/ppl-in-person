import { Component, Inject, Input, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Challenger } from '../../models/challenger';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { features } from '../../constants.data';
import { MessageService } from '../../services/message.service';
import { MatTabGroup } from '@angular/material/tabs';

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
  showCamera: boolean;
  options: UntypedFormGroup;
  @Input() challenger: Challenger;

  useQR = features.useQR;
  trainerCardLink: string;

  constructor(public dialog: MatDialog, private messageService: MessageService) {}

  ngOnInit(): void {
    this.showCamera = false;
    this.trainerCardLink = `https://paxpokemonleague.net/online/?id=${this.challenger.id}`;
  }

  enqueue(): void {
    if (this.showCamera === false) {
      this.showCamera = true;
    } else {
      this.showCamera = false;
    }
  }

  openHelp = () => {
    this.dialog.open(PPLQueueHelpDialog);
  };
}

@Component({
  selector: 'ppl-help-dialog',
  templateUrl: 'ppl-help-dialog.html',
})
export class PPLQueueHelpDialog {}
