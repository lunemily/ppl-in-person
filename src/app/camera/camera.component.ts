import { Component, VERSION, OnInit, ViewChild, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BarcodeFormat } from '@zxing/library';

import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../services/api.service';
import { DataService } from '../services/static-data.service';
import { Leader } from '../models/leader';
import { Format } from '../models/format';

export interface DialogData {
  challengerId: string;
  leaderId: string;
  isLeader: boolean;
  battleFormats: Format[];
  leaderTypes: Format[];
}

@Component({
  selector: 'app-camera',
  templateUrl: 'camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent implements OnInit {
  // Presence of a leaderId indicates that we are enqueuing a challenger
  @Input() leaderLoginId: string;
  @Input() leaderId: string;
  // Presence of a challengerId indicates that we are enqueuing a challenger
  @Input() challengerId: string;
  qrResultString: string;
  allLeaderData: Leader[];
  leaderData: Leader;

  availableDevices: MediaDeviceInfo[];
  deviceCurrent: MediaDeviceInfo;
  deviceSelected: string;

  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
  ];

  hasDevices: boolean;
  hasPermission: boolean;

  scannerEnabled = true;
  torchEnabled = false;
  torchAvailable$ = new BehaviorSubject<boolean>(false);
  tryHarder = false;

  constructor(public dialog: MatDialog, private apiService: ApiService, private dataService: DataService) {}

  onCodeResult(result: string): void {
    /*
    The camera is quite finicky and basically no longer supported. This is an artificial gate to
    set the result value to whatever comes back from the QR scanner picks up the first time and
    completely ignore all other attempts to do a thing until either the result doesn't match our
    regex, OR the leader does a thing with the dialog.
    */
    if (!this.qrResultString) {
      this.qrResultString = result;
      this.scannerEnabled = false;
      this.evaluateResult(result);
    }
  }

  evaluateResult(result: string): void {
    // const devURL = 'https://localhost:4200';
    // const prodURL = 'https://paxpokemonleague.net/qr/';
    const challengerEnqueueRegex =
      /^http(s|):\/\/(localhost:4200|paxpokemonleague\.net\/qr)\/\?(challenger)=([a-zA-Z0-9]+){0,16}$/g;
    const leaderEnqueueRegex =
      /^http(s|):\/\/(localhost:4200|paxpokemonleague\.net\/qr)\/\?(leader)=([a-zA-Z0-9]+){0,16}$/g;
    const loginRegex =
      /^http(s|):\/\/(localhost:4200|paxpokemonleague.net\/qr)\/\?(leader|challenger)=([a-zA-Z0-9]+){0,16}$/g;
    if (this.leaderLoginId) {
      // If a leader is scanning a challenger, the QR code will have ?challenger=
      if (result.match(challengerEnqueueRegex)) {
        let challengerId = result
          .replace('http://localhost:4200/?challenger=', '')
          .replace('http://paxpokemonleague.net/qr/?challenger=', '')
          .replace('https://localhost:4200/?challenger=', '')
          .replace('https://paxpokemonleague.net/qr/?challenger=', '');
        this.openEnqueueDialog(challengerId, this.leaderLoginId);
      } else {
        window.location.reload();
      }
    } else if (this.challengerId) {
      // If a challenger is scanning a leader, the QR code will have ?leader=
      if (result.match(leaderEnqueueRegex)) {
        let leaderId = result
          .replace('http://localhost:4200/?leader=', '')
          .replace('http://paxpokemonleague.net/qr/?leader=', '')
          .replace('https://localhost:4200/?leader=', '')
          .replace('https://paxpokemonleague.net/qr/?leader=', '');
        this.openEnqueueDialog(this.challengerId, leaderId);
      } else {
        window.location.reload();
      }
    } else {
      // window.location.reload();
    }
  }

  clearResult(): void {
    this.qrResultString = null;
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  onDeviceSelectChange(selected: string) {
    const selectedStr = selected || '';
    if (this.deviceSelected === selectedStr) {
      return;
    }
    this.deviceSelected = selectedStr;
    const device = this.availableDevices.find((x) => x.deviceId === selected);
    this.deviceCurrent = device || undefined;
  }

  onDeviceChange(device: MediaDeviceInfo) {
    const selectedStr = device?.deviceId || '';
    if (this.deviceSelected === selectedStr) {
      return;
    }
    this.deviceSelected = selectedStr;
    this.deviceCurrent = device || undefined;
  }

  openFormatsDialog() {
    const data = {
      formatsEnabled: this.formatsEnabled,
    };
  }

  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  openInfoDialog() {
    const data = {
      hasDevices: this.hasDevices,
      hasPermission: this.hasPermission,
    };
  }

  onTorchCompatible(isCompatible: boolean): void {
    this.torchAvailable$.next(isCompatible || false);
  }

  toggleTorch(): void {
    this.torchEnabled = !this.torchEnabled;
  }

  toggleTryHarder(): void {
    this.tryHarder = !this.tryHarder;
  }

  openEnqueueDialog(challengerId: string, leaderLoginId: string): void {
    // We know the leaderId. Now get the specific leader data.
    this.leaderData = this.allLeaderData.filter((leader) => {
      return leader.leaderId === leaderLoginId || leader.leaderId === this.leaderId;
    })[0];
    const dialogRef = this.dialog.open(EnqueueDialog, {
      width: '250px',
      data: {
        challengerId: challengerId,
        leaderId: leaderLoginId,
        battleFormats: this.leaderData.battleFormats,
        leaderTypes: this.leaderData.leaderTypes,
        isLeader: typeof this.challengerId === 'undefined' || this.challengerId === null,
      },
    });

    dialogRef.afterClosed().subscribe((dialogData) => {
      if (this.leaderLoginId && dialogData.doEnqueue === 'true') {
        this.apiService.enqueue(
          challengerId,
          this.leaderLoginId,
          dialogData.selectedFormat,
          dialogData.selectedDifficulty,
          false
        );
        console.error('Camera under construction.');
      } else if (this.challengerId && dialogData.doEnqueue === 'true') {
        this.apiService.enqueue(
          this.challengerId,
          leaderLoginId,
          dialogData.selectedFormat,
          dialogData.selectedDifficulty,
          true
        );
        console.error('Camera under construction.');
      } else {
        window.location.reload();
      }
    });
  }

  ngOnInit() {
    // Load all leader data because this could be a challenger using the camera.
    this.dataService.getLeaderData().subscribe((data) => {
      this.allLeaderData = data;
    });
    // Debugging
    // this.onCodeResult('https://paxpokemonleague.net/qr/?challenger=ff6ef05603575410');
    // this.onCodeResult('https://paxpokemonleague.net/qr/?leader=24246b757f66');
  }

  ngAfterViewInit() {}
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
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.dialogRef.close({
      doEnqueue: 'true',
      selectedFormat: this.selectedFormat,
      selectedDifficulty: this.selectedDifficulty,
    });
  }
}
