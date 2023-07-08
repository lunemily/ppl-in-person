import { Component, Inject, Input, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Leader } from '../models/leader';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { api, features } from '../constants.data';
import { Queue } from '../models/queue';

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
  url = api.serverUrl;
  useQR = features.useQR;

  previousName: string;
  newName: string;

  @Input() leader: Leader;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.showCamera = false;
    this.myAngularxQrCode = `https://paxpokemonleague.net/qr/?leader=${this.leader.leaderId}`;

    // BEGIN: Post-process multi-queues
    // TRhis entire section could *probably* be written into some clever
    // JavaScript stream-like functions, but I was in a hurry. So yeah...
    if (this.leader.battleFormatIds.includes(4)) {
      let preprocessedQueue: Queue[] = this.leader.queue;
      let nonMultiBattleQueue: Queue[] = [];
      let mutliBattleQueue: Queue[] = preprocessedQueue.filter((item) => {
        if (item.battleFormat.id == 4) {
          return true;
        } else {
          nonMultiBattleQueue.push(item);
        }
      });

      // Here's the logic to add the `otherChallengerId` for multi battles. Every position needs to know the next position's challengerId
      for (let i = 1; i < mutliBattleQueue.length; i++) {
        // Start on the 2nd person and update the previous record.
        mutliBattleQueue[i - 1].otherChallengerId = mutliBattleQueue[i].challengerId;
      }

      this.leader.queue = nonMultiBattleQueue.concat(mutliBattleQueue).sort((a, b) => a.position - b.position);
      console.info(this.leader);
    }
    // END: Post-process multi-queues
  }

  enqueueQR(): void {
    if (this.showCamera === false) {
      this.showCamera = true;
    } else {
      this.showCamera = false;
    }
  }
}
