import { Component, Input, OnInit } from '@angular/core'
import { api, pplEvent } from '../../constants.data'
import { QRCodeModule } from 'angularx-qrcode';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-qr-code',
    templateUrl: './qr-code.component.html',
    styleUrls: ['./qr-code.component.scss'],
    standalone: true,
    imports: [MatCardModule, QRCodeModule],
})
export class QrCodeComponent implements OnInit {
  @Input() isLeader: boolean
  @Input() id: string
  qrCode = 'TODO'
  qrImgSrc = 'assets/images/pokeball.png'
  ngOnInit(): void {
    this.qrCode = `https://paxpokemonleague.net/${pplEvent.toLowerCase()}/?qr=true&opponentId=${this.id}&opponentType=${
      this.isLeader ? 'leader' : 'challenger'
    }`
    if (this.isLeader) {
      this.qrImgSrc = api.serverUrl + '/static/badges/' + this.id + '.png'
    }
    console.log(this.qrCode)
  }
}
