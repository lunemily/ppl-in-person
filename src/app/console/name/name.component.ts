import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Challenger } from 'src/app/models/challenger';
import { Leader } from 'src/app/models/leader';
import { Person } from 'src/app/models/person';
import * as confetti from 'canvas-confetti';
import { ApiService } from 'src/app/services/api.service';
import { PPLSettings } from '../../models/settings';
import { DataService } from '../../services/static-data.service';

export interface DialogData {
  previousName: string;
  newName: string;
}

@Component({
  selector: 'app-name',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.scss'],
})
export class NameComponent implements OnInit, OnChanges {
  @Input() leader: Leader;
  @Input() challenger: Challenger;
  @Input() person: Person;
  previousName: string;
  newName: string;
  @Input() feedbackSurveyUrl: string;
  @Input() championSurveyUrl: string;
  pplSettings: PPLSettings;
  isLeader: boolean;

  @Output('ngInit') initEvent: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialog: MatDialog,
    private apiService: ApiService,
    private renderer2: Renderer2,
    private elementRef: ElementRef,
    private dataService: DataService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.championSurveyUrl) {
      this.shootConfetti();
    }
  }

  ngOnInit(): void {
    this.loadPPLSettings();
    this.isLeader = this.dataService.getIsLeader();
  }

  loadPPLSettings(): void {
    this.dataService.getPPLSettings().subscribe((pplSettings) => {
      this.pplSettings = pplSettings;
    });
  }

  editName(): void {
    const dialogRef = this.dialog.open(SetNameDialog, {
      width: '250px',
      data: { previousName: this.challenger.displayName, newName: this.challenger.displayName },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.newName = result;
      this.apiService.setChallengerName(this.challenger.id, this.newName);
    });
  }

  shootConfetti(): void {
    const canvas = this.renderer2.createElement('canvas');

    this.renderer2.appendChild(this.elementRef.nativeElement, canvas);

    const myConfetti = confetti.create(canvas, {
      resize: true, // will fit all screen sizes
    });

    // 3 instances to increase realism
    myConfetti({
      shapes: ['square'],
      particleCount: 150,
      spread: 90,
      ticks: 300,
    });

    myConfetti({
      shapes: ['square'],
      particleCount: 150,
      spread: 130,
      ticks: 300,
    });

    myConfetti({
      shapes: ['square'],
      particleCount: 150,
      spread: 160,
      ticks: 300,
      startVelocity: 20,
    });
    setTimeout(() => {
      this.renderer2.removeChild(this.elementRef.nativeElement, canvas);
    }, 3000);
  }
}

// Separate component for the name dialog

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
