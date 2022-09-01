import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LeaderService } from 'src/app/services/leader.service';
import { Queue } from 'src/app/models/queue';
import { UntypedFormControl, Validators } from '@angular/forms';

export interface DialogData {
  win: boolean;
  report: boolean;
}

@Component({
  selector: 'app-leader-queue-item',
  templateUrl: './leader-queue-item.component.html',
  styleUrls: ['./leader-queue-item.component.scss'],
})
export class LeaderQueueItemComponent implements OnInit {
  @Input() leaderId: string;
  @Input() queue: Queue;
  win: boolean;
  badge: boolean;
  report: boolean;

  constructor(public dialog: MatDialog, private leaderService: LeaderService) {}

  ngOnInit(): void {}

  holdChallenger(challengerId: string): void {
    this.leaderService.holdChallenger(this.leaderId, challengerId);
  }

  removeChallenger(challengerId: string): void {
    this.leaderService.removeChallenger(this.leaderId, challengerId);
  }

  reportBattle(): void {
    const dialogRef = this.dialog.open(ReportBattleDialog, {
      width: '300px',
      data: { win: false, report: false },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.win = result['win'];
      this.badge = result['badge'];
      this.report = result['report'];
      if (this.report) {
        this.leaderService.reportBattle(this.leaderId, this.queue.challengerId, this.win, this.badge);
      }
    });
  }
}

@Component({
  selector: 'report-battle-dialog',
  templateUrl: 'report-battle-dialog.html',
  styleUrls: ['./report-battle-dialog.scss'],
})
export class ReportBattleDialog {
  winControl = new UntypedFormControl(null, Validators.required);
  badgeControl = new UntypedFormControl(null, Validators.required);
  win: string;
  badge: string;
  report: boolean;

  constructor(public dialogRef: MatDialogRef<ReportBattleDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  // onWinClick(): void {
  //   this.win = true;
  //   this.report = true;
  //   this.dialogRef.close({win: this.win, report: this.report});
  // }

  // onLoseClick(): void {
  //   this.win = false;
  //   this.report = true;
  //   this.dialogRef.close({win: this.win, report: this.report});
  // }

  onSubmitClick(): void {
    this.report = true;
    this.dialogRef.close({
      win: this.win == 'true',
      badge: this.badge == 'true',
      report: this.report,
    });
  }

  onCancelClick(): void {
    this.report = false;
    this.dialogRef.close({
      win: this.win == 'true',
      badge: this.badge == 'true',
      report: this.report,
    });
  }
}
