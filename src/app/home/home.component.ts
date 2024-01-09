import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HeaderService } from '../services/header.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/static-data.service';
import { PPLSettings } from '../models/settings';
import { WebSocketService } from '../services/web-socket.service';
import { webSocket } from 'rxjs/webSocket';
import { api } from '../constants.data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  loginId: string;
  isLeader = false;
  showLogin: boolean;
  challengerId: string;
  pplSettings: PPLSettings;
  isWebSocketConnected = false;

  constructor(
    private cookieService: CookieService,
    private headerService: HeaderService,
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private webSocketService: WebSocketService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.startUp();
    this.loadPPLSettings();
    this.webSocketService.setupWebSocket();
  }

  startUp() {
    if (this.route.snapshot.queryParams['id']) {
      this.challengerId = this.route.snapshot.queryParamMap.get('id');
    }
    this.showLogin = true;
    this.loginId = this.cookieService.get('loginId');
    if (this.loginId) {
      this.showLogin = false;
    }
    this.isLeader = 'true' == this.cookieService.get('isLeader');
    this.headerService.setUrl(window.location.href);
  }

  loadPPLSettings() {
    this.dataService.getPPLSettings().subscribe((pplSettings) => {
      this.pplSettings = pplSettings;
    });
  }
}
