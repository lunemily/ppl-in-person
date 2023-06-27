import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { battleFormatsReverseMap } from 'src/app/constants.data';
import { Leader } from 'src/app/models/leader';
import { ChallengerService } from 'src/app/services/challenger.service';

export interface DialogData {
  challengerId?: string;
  leader: Leader;
}

@Component({
  selector: 'app-leader-badge',
  templateUrl: './leader-badge.component.html',
  styleUrls: ['./leader-badge.component.scss'],
})
export class LeaderBadgeComponent implements OnInit {
  loginId: string;
  isLeader: boolean;
  @Input() leader: Leader;

  constructor(public dialog: MatDialog, private challengerService: ChallengerService) {}

  ngOnInit(): void {
    // Populate battleformats
    let battleFormats = [];
    this.leader.battleFormatIds?.forEach((format) => {
      battleFormats.push({
        id: format,
        name: battleFormatsReverseMap[format],
      });
    });
    this.leader.battleFormats = battleFormats;
  }

  showLeaderDetail(): void {
    console.warn(this.leader);
    const dialogRef = this.dialog.open(LeaderDetailEnqueueDialog, {
      width: '400px',
      data:
        this.loginId && !this.isLeader ? { challengerId: this.loginId, leader: this.leader } : { leader: this.leader },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Selected difficulty: ${result}`);
      // this.newName = result;
      // this.challengerService.setChallengerName(this.challenger.id, this.newName);
    });
  }
}

// Separate component for the enqueue dialog

@Component({
  selector: 'leader-detail-enqueue-dialog',
  templateUrl: 'leader-detail-enqueue-dialog.html',
  styleUrls: ['leader-detail-enqueue-dialog.scss'],
})
export class LeaderDetailEnqueueDialog {
  selectedFormat: number;
  constructor(
    public dialogRef: MatDialogRef<LeaderDetailEnqueueDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
