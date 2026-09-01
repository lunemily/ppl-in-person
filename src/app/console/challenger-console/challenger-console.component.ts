import { Component, Inject, Input, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Challenger } from '../../models/challenger';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { features } from '../../constants.data';
import { MessageService } from '../../services/message.service';
import { MatTabGroup } from '@angular/material/tabs';
import { QrEnqueueComponent } from '../../common/qr-enqueue/qr-enqueue.component';
import { QrCodeComponent } from '../../common/qr-code/qr-code.component';
import { TrainerCardComponent } from '../../common/trainer-card/trainer-card.component';
import { ChallengerQueueListComponent } from './challenger-queue-list/challenger-queue-list.component';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';

export interface DialogData {
  previousName: string;
  newName: string;
}

@Component({
    selector: 'app-challenger-console',
    templateUrl: './challenger-console.component.html',
    styleUrls: ['./challenger-console.component.scss'],
    standalone: true,
    imports: [
        MatCardModule,
        MatExpansionModule,
        MatIconModule,
        NgIf,
        MatButtonModule,
        ChallengerQueueListComponent,
        TrainerCardComponent,
        QrCodeComponent,
        QrEnqueueComponent,
    ],
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
    standalone: true,
    imports: [MatDialogModule, MatButtonModule],
})
export class PPLQueueHelpDialog {}
