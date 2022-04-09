import { Component, VERSION, OnInit, ViewChild, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BarcodeFormat } from '@zxing/library';

import { QrScannerComponent } from 'angular2-qrscanner';
import { BehaviorSubject } from 'rxjs';
import { ChallengerService } from '../services/challenger.service';
import { LeaderService } from '../services/leader.service';

@Component({
    selector: 'app-camera',
    templateUrl: 'camera.component.html',
    styleUrls: ['./camera.component.scss']
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
  
    torchEnabled = false;
    torchAvailable$ = new BehaviorSubject<boolean>(false);
    tryHarder = false;

    constructor(
        private challengerService: ChallengerService,
        private leaderService: LeaderService,
        private snackBar: MatSnackBar,
    ) {}

    onCodeResult(result: string) {
        console.info(result);
        this.snackBar.open(result, "Dismiss", {
          duration: 2000,
        });
        // const devURL = 'https://localhost:4200';
        // const prodURL = 'https://paxpokemonleague.net/qr/';
        const challengerEnqueueRegex = /^http(s|):\/\/(localhost:4200|paxpokemonleague\.net\/qr)\/\?(challenger)=([a-zA-Z0-9]+){0,16}$/g;
        const leaderEnqueueRegex = /^http(s|):\/\/(localhost:4200|paxpokemonleague\.net\/qr)\/\?(leader)=([a-zA-Z0-9]+){0,16}$/g;
        const loginRegex = /^http(s|):\/\/(localhost:4200|paxpokemonleague.net\/qr)\/\?(leader|challenger)=([a-zA-Z0-9]+){0,16}$/g;
        if (this.leaderId) {
            // If a leader is scanning a challenger, the QR code will have ?challenger=
            if (result.match(challengerEnqueueRegex)) {
                let challengerId = result.replace("http://localhost:4200/?challenger=", "")
                        .replace("http://paxpokemonleague.net/qr/?challenger=", "")
                        .replace("https://localhost:4200/?challenger=", "")
                        .replace("https://paxpokemonleague.net/qr/?challenger=", "")
                this.leaderService.enqueueChallenger(this.leaderId, challengerId);
            } else {
                // window.location.reload();
            }
        }
        else if (this.challengerId) {
            // If a challenger is scanning a leader, the QR code will have ?leader=
            if (result.match(leaderEnqueueRegex)) {
                let leaderId = result.replace("http://localhost:4200/?leader=", "")
                        .replace("http://paxpokemonleague.net/qr/?leader=", "")
                        .replace("https://localhost:4200/?leader=", "")
                        .replace("https://paxpokemonleague.net/qr/?leader=", "")
                this.challengerService.enqueueLeader(this.challengerId, leaderId);
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
        if (this.deviceSelected === selectedStr) { return; }
        this.deviceSelected = selectedStr;
        const device = this.availableDevices.find(x => x.deviceId === selected);
        this.deviceCurrent = device || undefined;
      }
    
      onDeviceChange(device: MediaDeviceInfo) {
        const selectedStr = device?.deviceId || '';
        if (this.deviceSelected === selectedStr) { return; }
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

    ngOnInit() {
        // this.qrScannerComponent.videoElement.setAttribute('playsinline', 'true');
    }

    ngAfterViewInit() {
        // this.qrScannerComponent.getMediaDevices().then(devices => {
        //     console.log(devices);
        //     const videoDevices: MediaDeviceInfo[] = [];
        //     for (const device of devices) {
        //         if (device.kind.toString() === 'videoinput') {
        //             videoDevices.push(device);
        //         }
        //     }
        //     if (videoDevices.length > 0){
        //         let choosenDev;
        //         for (const dev of videoDevices){
        //             if (dev.label.includes('back') || dev.label.includes('rear')){ // Select rear-facing camera
        //                 choosenDev = dev;
        //                 break;
        //             }
        //         }
        //         if (choosenDev) {
        //             this.qrScannerComponent.chooseCamera.next(choosenDev);
        //         } else {
        //             this.qrScannerComponent.chooseCamera.next(videoDevices[0]);
        //         }
        //     }
        // });

        // this.qrScannerComponent.capturedQr.subscribe(result => {
        //     // const devURL = 'https://localhost:4200';
        //     // const prodURL = 'https://paxpokemonleague.net/west/';
        //     const challengerEnqueueRegex = /^http(s|):\/\/(localhost:4200|paxpokemonleague\.net\/qr)\/\?(challenger)=([a-zA-Z0-9]+){0,16}$/g;
        //     const leaderEnqueueRegex = /^http(s|):\/\/(localhost:4200|paxpokemonleague\.net\/qr)\/\?(leader)=([a-zA-Z0-9]+){0,16}$/g;
        //     const loginRegex = /^http(s|):\/\/(localhost:4200|paxpokemonleague.net\/qr)\/\?(leader|challenger)=([a-zA-Z0-9]+){0,16}$/g;
        //     if (this.leaderId) {
        //         // If a leader is scanning a challenger, the QR code will have ?challenger=
        //         if (result.match(challengerEnqueueRegex)) {
        //             let challengerId = result.replace("http://localhost:4200/?challenger=", "")
        //                     .replace("http://paxpokemonleague.net/west/?challenger=", "")
        //                     .replace("https://localhost:4200/?challenger=", "")
        //                     .replace("https://paxpokemonleague.net/west/?challenger=", "")
        //             this.leaderService.enqueueChallenger(this.leaderId, challengerId);
        //         } else {
        //             window.location.reload();
        //         }
        //     }
        //     else if (this.challengerId) {
        //         // If a challenger is scanning a leader, the QR code will have ?leader=
        //         if (result.match(leaderEnqueueRegex)) {
        //             let leaderId = result.replace("http://localhost:4200/?leader=", "")
        //                     .replace("http://paxpokemonleague.net/west/?leader=", "")
        //                     .replace("https://localhost:4200/?leader=", "")
        //                     .replace("https://paxpokemonleague.net/west/?leader=", "")
        //             this.leaderService.enqueueChallenger(leaderId, this.challengerId);
        //         } else {
        //             window.location.reload();
        //         }
        //     } else {
        //         if (result.match(loginRegex)) {
        //             window.location.replace(result);
        //         } else {
        //             window.location.reload();
        //         }
        //     }
        // });
    }
}
