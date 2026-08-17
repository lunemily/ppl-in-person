import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Queue } from 'src/app/models/queue';
import { UntypedFormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { NgIf } from '@angular/common';

export interface DialogData {
  win: boolean;
  report: boolean;
}

@Component({
    selector: 'app-leader-queue-item',
    templateUrl: './leader-queue-item.component.html',
    styleUrls: ['./leader-queue-item.component.scss'],
    standalone: true,
    imports: [
        NgIf,
        MatDividerModule,
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
    ],
})
export class LeaderQueueItemComponent implements OnInit {
  @Input() leaderId: string;
  @Input() queue: Queue;
  win: boolean;
  badge: boolean;
  report: boolean;

  constructor(public dialog: MatDialog, private apiService: ApiService) {}

  ngOnInit(): void {}

  holdChallenger(challengerId: string): void {
    this.apiService.holdFromQueue(this.leaderId, challengerId);
  }

  removeChallenger(challengerId: string): void {
    this.apiService.removeFromQueue(this.leaderId, challengerId);
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
        this.queue.leaderId = this.leaderId;
        this.apiService.reportBattle(this.queue, this.win, this.badge);
      }
    });
  }
}

@Component({
    selector: 'report-battle-dialog',
    templateUrl: 'report-battle-dialog.html',
    styleUrls: ['./report-battle-dialog.scss'],
    standalone: true,
    imports: [
        MatDialogModule,
        MatFormFieldModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule,
        MatOptionModule,
        NgIf,
        MatButtonModule,
    ],
})
export class ReportBattleDialog {
  winControl = new UntypedFormControl(null, Validators.required);
  badgeControl = new UntypedFormControl(null, Validators.required);
  win: string;
  badge: string;
  report: boolean;

  constructor(public dialogRef: MatDialogRef<ReportBattleDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

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
