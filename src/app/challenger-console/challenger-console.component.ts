import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Challenger } from '../models/challenger';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChallengerService } from '../services/challenger.service';
import { DataService } from '../services/data.service';

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
  myAngularxQrCode: string;
  showCamera: boolean;
  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');

  previousName: string;
  newName: string;

  @Input() challenger: Challenger;

  leaderData: JSON;

  constructor(
    public dialog: MatDialog,
    private challengerService: ChallengerService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.showCamera = false;
    this.myAngularxQrCode = `https://paxpokemonleague.net/qr/?challenger=${this.challenger.id}`;
    // this.injectBadges();
  }

  enqueue(): void {
    if (this.showCamera === false) {
      this.showCamera = true;
    } else {
      this.showCamera = false;
    }
  }

  editName(): void {
    const dialogRef = this.dialog.open(ChallengerSetNameDialog, {
      width: '250px',
      data: { previousName: this.challenger.displayName, newName: this.challenger.displayName },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.newName = result;
      this.challengerService.setChallengerName(this.challenger.id, this.newName);
    });
  }

  injectBadges(): void {
    // Get leader data
    this.leaderData = this.dataService.parseData();

    // Inject badges into queues
    let queuesEntered = this.challenger.queuesEntered.map((queue) => ({
      ...queue,
      badgeArt: this.leaderData[queue.leaderId]['badgeArt'],
    }));
    this.challenger.queuesEntered = queuesEntered;

    // Inject badges into earned badges
    let badgesEarned = this.challenger.badgesEarned.map((badgeEarned) => ({
      ...badgeEarned,
      badgeArt: this.leaderData[badgeEarned.leaderId]['badgeArt'],
    }));
    this.challenger.badgesEarned = badgesEarned;
  }
}

@Component({
  selector: 'challenger-set-name-dialog',
  templateUrl: 'challenger-set-name-dialog.html',
})
export class ChallengerSetNameDialog {
  constructor(
    public dialogRef: MatDialogRef<ChallengerSetNameDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
