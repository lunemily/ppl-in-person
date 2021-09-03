import { Component, VERSION, OnInit, ViewChild, Input } from '@angular/core';

import { QrScannerComponent } from 'angular2-qrscanner';
import { LeaderService } from '../leader.service';

@Component({
    selector: 'app-camera',
    templateUrl: 'camera.component.html',
    styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {
    // Presence of a leaderId indicates that we are enqueuing a challenger
    @Input() leaderId: string;
    // Presence of a challengerId indicates that we are enqueuing a challenger
    @Input() challengerId: string;
    @ViewChild(QrScannerComponent) qrScannerComponent: QrScannerComponent ;

    constructor(
        private leaderService: LeaderService,
    ) {}

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.qrScannerComponent.getMediaDevices().then(devices => {
            console.log(devices);
            const videoDevices: MediaDeviceInfo[] = [];
            for (const device of devices) {
                if (device.kind.toString() === 'videoinput') {
                    videoDevices.push(device);
                }
            }
            if (videoDevices.length > 0){
                let choosenDev;
                for (const dev of videoDevices){
                    if (dev.label.includes('back') || dev.label.includes('rear')){ // Select rear-facing camera
                        choosenDev = dev;
                        break;
                    }
                }
                if (choosenDev) {
                    this.qrScannerComponent.chooseCamera.next(choosenDev);
                } else {
                    this.qrScannerComponent.chooseCamera.next(videoDevices[0]);
                }
            }
        });

        this.qrScannerComponent.capturedQr.subscribe(result => {
            // const devURL = 'https://localhost:4200';
            // const prodURL = 'https://paxpokemonleague.net/west/';
            const challengerEnqueueRegex = /^http(s|):\/\/(localhost:4200|paxpokemonleague\.net\/west)\/\?(challenger)=([a-zA-Z0-9]+){0,16}$/g;
            const leaderEnqueueRegex = /^http(s|):\/\/(localhost:4200|paxpokemonleague\.net\/west)\/\?(leader)=([a-zA-Z0-9]+){0,16}$/g;
            const loginRegex = /^http(s|):\/\/(localhost:4200|paxpokemonleague.net\/west)\/\?(leader|challenger)=([a-zA-Z0-9]+){0,16}$/g;
            if (this.leaderId) {
                // If a leader is scanning a challenger, the QR code will have ?challenger=
                if (result.match(challengerEnqueueRegex)) {
                    let challengerId = result.replace("http://localhost:4200/?challenger=", "")
                            .replace("http://paxpokemonleague.net/west/?challenger=", "")
                            .replace("https://localhost:4200/?challenger=", "")
                            .replace("https://paxpokemonleague.net/west/?challenger=", "")
                    this.leaderService.enqueueChallenger(this.leaderId, challengerId);
                } else {
                    window.location.reload();
                }
            }
            else if (this.challengerId) {
                // If a challenger is scanning a leader, the QR code will have ?leader=
                if (result.match(leaderEnqueueRegex)) {
                    let leaderId = result.replace("http://localhost:4200/?leader=", "")
                            .replace("http://paxpokemonleague.net/west/?leader=", "")
                            .replace("https://localhost:4200/?leader=", "")
                            .replace("https://paxpokemonleague.net/west/?leader=", "")
                    this.leaderService.enqueueChallenger(leaderId, this.challengerId);
                } else {
                    window.location.reload();
                }
            } else {
                if (result.match(loginRegex)) {
                    window.location.replace(result);
                } else {
                    window.location.reload();
                }
            }
        });
    }
}
