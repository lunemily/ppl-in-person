import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Leader } from '../leader';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LeaderService } from '../leader.service';

export interface DialogData {
  previousName: string;
  newName: string;
}

@Component({
  selector: 'app-leader-console',
  templateUrl: './leader-console.component.html',
  styleUrls: ['./leader-console.component.css']
})
export class LeaderConsoleComponent implements OnInit {
  showCamera: boolean
  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');

  previousName: string;
  newName: string;

  @Input() leader: Leader;

  constructor(public dialog: MatDialog,
    private leaderService: LeaderService,) { }

  ngOnInit(): void {
    this.showCamera = false
  }

  enqueue(): void {
    this.showCamera = true
  }


}