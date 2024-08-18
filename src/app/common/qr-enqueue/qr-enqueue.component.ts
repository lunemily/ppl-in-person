import { Component, Inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Leader } from '../../models/leader';
import { DataService } from '../../services/static-data.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Format } from '../../models/format';
import { ApiService } from '../../services/api.service';

export interface DialogData {
  challengerId: string;
  leaderId: string;
  isLeader: boolean;
  battleFormats: Format[];
  leaderTypes: Format[];
}

@Component({
  selector: 'app-qr-enqueue',
  templateUrl: './qr-enqueue.component.html',
  styleUrls: ['./qr-enqueue.component.scss'],
})
export class QrEnqueueComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private dataService: DataService,
  ) {}
  @Input() inputLeaderLoginId: string;
  @Input() inputLeaderId: string;
  @Input() inputChallengerId: string;
  allLeaderData: Leader[];
  leaderData: Leader;
  isLeader: boolean;

  ngOnInit(): void {
    this.isLeader = this.dataService.getIsLeader();
    // Load all leader data because this could be a challenger using the camera.
    this.dataService.getLeaderData().subscribe((data) => {
      this.allLeaderData = data;

      if (this.validateQrEnqueue()) {
        if (this.inputLeaderLoginId) {
          this.openEnqueueDialog(this.route.snapshot.queryParams.opponentId, this.inputLeaderLoginId);
        } else if (this.inputChallengerId) {
          this.openEnqueueDialog(this.inputChallengerId, this.route.snapshot.queryParams.opponentId);
        } else {
          console.error('Invalid QR Enqueue attempt');
        }
      }
    });
  }

  validateQrEnqueue = (): boolean => {
    if (this.route.snapshot.queryParams.qr !== 'true') {
      // Not a QR scan
      return false;
    }
    if (
      (this.route.snapshot.queryParams.opponentType === 'leader' && this.isLeader) ||
      (this.route.snapshot.queryParams.opponentType === 'challenger' && !this.isLeader)
    ) {
      // Leaders can only challenge challengers and challengers can only challenge leaders
      return false;
    }
    if (!this.route.snapshot.queryParams.opponentId) {
      // No opponentId present
      return false;
    }
    if (!this.inputLeaderLoginId && !this.inputChallengerId && !this.inputChallengerId) {
      //   No input userId
      return false;
    }
    return true;
  };

  openEnqueueDialog = (challengerId: string, leaderLoginId: string) => {
    // We have finished accessing the queryParams to do this enqueue, we can remove them from the URL to avoid a loop
    history.pushState(null, '', location.href.split('?')[0]);
    // We know the leaderId. Now get the specific leader data.
    this.leaderData = this.allLeaderData.filter((leader) => {
      return leader.leaderId === leaderLoginId || leader.leaderId === this.inputLeaderId;
    })[0];
    const dialogRef = this.dialog.open(EnqueueDialog, {
      width: '250px',
      data: {
        challengerId,
        leaderId: leaderLoginId,
        battleFormats: this.leaderData.battleFormats,
        leaderTypes: this.leaderData.leaderTypes,
        isLeader: this.isLeader,
      },
    });

    dialogRef.afterClosed().subscribe((dialogData) => {
      if (this.inputLeaderLoginId && dialogData.doEnqueue === 'true') {
        this.apiService.enqueue(
          challengerId,
          this.inputLeaderLoginId,
          dialogData.selectedFormat,
          dialogData.selectedDifficulty,
          false,
        );
      } else if (this.inputChallengerId && dialogData.doEnqueue === 'true') {
        this.apiService.enqueue(
          this.inputChallengerId,
          leaderLoginId,
          dialogData.selectedFormat,
          dialogData.selectedDifficulty,
          true,
        );
      } else {
        window.location.reload();
      }
    });
  };
}

@Component({
  selector: 'enqueue-dialog',
  templateUrl: 'enqueue-dialog.html',
})
export class EnqueueDialog {
  selectedFormat: number;
  selectedDifficulty: number;
  constructor(public dialogRef: MatDialogRef<EnqueueDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close({ doEnqueue: false });
  }

  onYesClick(): void {
    this.dialogRef.close({
      doEnqueue: 'true',
      selectedFormat: this.selectedFormat,
      selectedDifficulty: this.selectedDifficulty,
    });
  }
}
