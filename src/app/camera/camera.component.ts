import { Component, VERSION, OnInit, ViewChild, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BarcodeFormat } from '@zxing/library';

import { BehaviorSubject } from 'rxjs';
import { ChallengerService } from '../services/challenger.service';
import { LeaderService } from '../services/leader.service';

export interface DialogData {
  challengerId: string;
  leaderId: string;
  isLeader: boolean;
}

@Component({
  selector: 'app-camera',
  templateUrl: 'camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent implements OnInit {
  // Presence of a leaderId indicates that we are enqueuing a challenger
  @Input() leaderId: string;
  // Presence of a challengerId indicates that we are enqueuing a challenger
  @Input() challengerId: string;
  // @ViewChild(QrScannerComponent) qrScannerComponent: QrScannerComponent;
  qrResultString: string;

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

  constructor(
    private challengerService: ChallengerService,
    private leaderService: LeaderService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  onCodeResult(result: string) {
    console.info(result);
    this.scannerEnabled = false;
    // const devURL = 'https://localhost:4200';
    // const prodURL = 'https://paxpokemonleague.net/qr/';
    const challengerEnqueueRegex =
      /^http(s|):\/\/(localhost:4200|paxpokemonleague\.net\/qr)\/\?(challenger)=([a-zA-Z0-9]+){0,16}$/g;
    const leaderEnqueueRegex =
      /^http(s|):\/\/(localhost:4200|paxpokemonleague\.net\/qr)\/\?(leader)=([a-zA-Z0-9]+){0,16}$/g;
    const loginRegex =
      /^http(s|):\/\/(localhost:4200|paxpokemonleague.net\/qr)\/\?(leader|challenger)=([a-zA-Z0-9]+){0,16}$/g;
    if (this.leaderId) {
      // If a leader is scanning a challenger, the QR code will have ?challenger=
      if (result.match(challengerEnqueueRegex)) {
        let challengerId = result
          .replace('http://localhost:4200/?challenger=', '')
          .replace('http://paxpokemonleague.net/qr/?challenger=', '')
          .replace('https://localhost:4200/?challenger=', '')
          .replace('https://paxpokemonleague.net/qr/?challenger=', '');
        this.openEnqueueDialog(challengerId, this.leaderId);
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

  openEnqueueDialog(challengerId: string, leaderId: string): void {
    const dialogRef = this.dialog.open(EnqueueDialog, {
      width: '250px',
      data: {
        challengerId: challengerId,
        leaderId: leaderId,
        isLeader: this.challengerId == null,
      },
    });

    dialogRef.afterClosed().subscribe((doEnqueue) => {
      if (this.leaderId && doEnqueue === 'true') {
        this.leaderService.enqueueChallenger(this.leaderId, challengerId);
      } else if (this.challengerId && doEnqueue === 'true') {
        this.challengerService.enqueueLeader(this.challengerId, leaderId);
      } else {
        window.location.reload();
      }
    });
  }

  ngOnInit() {}

  ngAfterViewInit() {}
}

@Component({
  selector: 'enqueue-dialog',
  templateUrl: 'enqueue-dialog.html',
})
export class EnqueueDialog {
  constructor(public dialogRef: MatDialogRef<EnqueueDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.dialogRef.close('true');
  }
}
