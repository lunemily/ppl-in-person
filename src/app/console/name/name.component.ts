import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Challenger } from 'src/app/models/challenger';
import { Leader } from 'src/app/models/leader';
import { Person } from 'src/app/models/person';
import { ChallengerService } from 'src/app/services/challenger.service';

export interface DialogData {
  previousName: string;
  newName: string;
}

@Component({
  selector: 'app-name',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.scss'],
})
export class NameComponent implements OnInit {
  @Input() leader: Leader;
  @Input() challenger: Challenger;
  @Input() person: Person;
  previousName: string;
  newName: string;

  constructor(public dialog: MatDialog, private challengerService: ChallengerService) {}

  ngOnInit(): void {}

  editName(): void {
    const dialogRef = this.dialog.open(SetNameDialog, {
      width: '250px',
      data: { previousName: this.challenger.displayName, newName: this.challenger.displayName },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.newName = result;
      this.challengerService.setChallengerName(this.challenger.id, this.newName);
    });
  }
}

@Component({
  selector: 'set-name-dialog',
  templateUrl: 'set-name-dialog.html',
})
export class SetNameDialog {
  constructor(public dialogRef: MatDialogRef<SetNameDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
