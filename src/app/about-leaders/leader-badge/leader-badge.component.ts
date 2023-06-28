import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { battleFormatsReverseMap, leaderTypesReverseMap } from 'src/app/constants.data';
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

  constructor(
    public dialog: MatDialog,
    private challengerService: ChallengerService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.loginId = this.cookieService.get('loginId');
    this.isLeader = 'true' == this.cookieService.get('isLeader');
    // Populate battleformats with human-readable values
    let battleFormats = [];
    this.leader.battleFormatIds?.forEach((format) => {
      battleFormats.push({
        id: format,
        name: battleFormatsReverseMap[format],
      });
    });
    this.leader.battleFormats = battleFormats;
    // Populate leader types with human-readable values
    let leaderTypes = [];
    this.leader.leaderTypeIds?.forEach((format) => {
      leaderTypes.push({
        id: format,
        name: leaderTypesReverseMap[format],
      });
    });
    this.leader.leaderTypes = leaderTypes;
  }

  showLeaderDetail(): void {
    const dialogRef = this.dialog.open(LeaderDetailEnqueueDialog, {
      width: '400px',
      data:
        this.loginId && !this.isLeader ? { challengerId: this.loginId, leader: this.leader } : { leader: this.leader },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.enqueue) {
        if (!result?.selectedFormat || !result?.selectedDifficulty) {
          console.error('No difficulty or format selected');
        } else {
        }
      }
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
  selectedDifficulty: number;
  constructor(
    public dialogRef: MatDialogRef<LeaderDetailEnqueueDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    console.log(data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
