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
    @ViewChild(QrScannerComponent) qrScannerComponent: QrScannerComponent ;

    constructor(
        private leaderService: LeaderService,
    ) {}

    ngOnInit() {
        console.log(this.leaderId)
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
                    if (dev.label.includes('front')){
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
            // const devURL = 'http://localhost:4200';
            // const prodURL = 'http://paxpokemonleague.net/west/';
            const enqueueRegex = /^http:\/\/(localhost:4200|paxpokemonleague.net\/west)\/\?(challenger)=([a-zA-Z0-9]+){16}$/g;
            const loginRegex = /^http:\/\/(localhost:4200|paxpokemonleague.net\/west)\/\?(leader|challenger)=([a-zA-Z0-9]+){16}$/g;
            if (this.leaderId) {
                if (result.match(enqueueRegex)) {
                    let challengerId = result.replace("http://localhost:4200/?challenger=", "").replace("http://paxpokemonleague.net/west/?challenger=", "")
                    this.leaderService.enqueueChallenger(this.leaderId, challengerId);
                }
            } else {
                if (result.match(loginRegex)) {
                    window.location.replace(result);
                }
            }
        });
    }
}