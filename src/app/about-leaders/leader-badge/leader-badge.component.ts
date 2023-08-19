import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';
import { api, pplEvent } from '../../constants.data';
import { Leader } from 'src/app/models/leader';
import { ApiService } from 'src/app/services/api.service';
import { PPLSettings } from 'src/app/models/settings';
import { DataService } from 'src/app/services/static-data.service';

export interface DialogData {
  url: string;
  challengerId?: string;
  leader: Leader;
  earned?: boolean;
  eventSupportsQueueState: boolean;
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
  @Input() earned: boolean;
  url = api.serverUrl;
  settings: PPLSettings;

  constructor(
    public dialog: MatDialog,
    private apiService: ApiService,
    private dataService: DataService,
    private cookieService: CookieService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loginId = this.cookieService.get('loginId');
    this.isLeader = 'true' == this.cookieService.get('isLeader');
    this.dataService.getPPLSettings().subscribe((settings) => {
      this.settings = settings;
    });
  }

  showLeaderDetail(): void {
    let data: DialogData = {
      url: this.url,
      leader: this.leader,
      earned: this.earned,
      eventSupportsQueueState: this.settings.eventSupportsQueueState,
    };
    if (this.loginId && !this.isLeader) {
      data.challengerId = this.loginId;
    }
    const dialogRef = this.dialog.open(LeaderDetailEnqueueDialog, {
      width: '400px',
      data: data,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.enqueue) {
        if (!result?.selectedFormat || !result?.selectedDifficulty) {
          this.snackBar.open('No difficulty or format selected', 'Dismiss', {
            duration: 2000,
          });
        } else {
          this.apiService.enqueue(
            this.loginId,
            this.leader.leaderId,
            result?.selectedFormat,
            result?.selectedDifficulty,
            true
          );
        }
      }
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
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
