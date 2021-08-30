import { Component, VERSION, OnInit, ViewChild } from '@angular/core';

import { QrScannerComponent } from 'angular2-qrscanner';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-camera',
  templateUrl: 'camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {
  @ViewChild(QrScannerComponent) qrScannerComponent: QrScannerComponent ;

  constructor() {
  }

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
            const regex = /^http:\/\/(localhost:4200|paxpokemonleague.net\/west)\/\?(leader|challenger)=([a-zA-Z0-9]+){16}$/g;
            console.log(result);
            if (result.match(regex)) {
                window.location.replace(result);
            }
        });
    }
}
