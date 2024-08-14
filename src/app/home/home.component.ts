import { Component, EventEmitter, OnInit } from '@angular/core';
import { HeaderService } from '../services/header.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/static-data.service';
import { PPLSettings } from '../models/settings';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { api } from '../constants.data';
import { MessageService } from '../services/message.service';

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
  public socket$!: WebSocketSubject<any>;
  reloadConsole: EventEmitter<any> = new EventEmitter();
  reloadBingoBoard: EventEmitter<any> = new EventEmitter();

  constructor(
    private headerService: HeaderService,
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private messageService: MessageService,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.startUp();
    this.loadPPLSettings();
    this.setupWebSocket();
  }

  startUp(): void {
    if (this.route.snapshot.queryParams.id) {
      this.challengerId = this.route.snapshot.queryParamMap.get('id');
    }
    this.showLogin = true;
    this.loginId = this.dataService.getLoginId();
    if (this.loginId) {
      this.showLogin = false;
    }
    this.isLeader = this.dataService.getIsLeader();
    this.headerService.setUrl(window.location.href);
  }

  loadPPLSettings(): void {
    this.dataService.getPPLSettings().subscribe((pplSettings) => {
      this.pplSettings = pplSettings;
    });
  }

  connect = () => {
    this.socket$ = webSocket(api.socketUrl); // Establish WebSocket connection
  };
  disconnect() {
    this.socket$.complete();
  }
  isConnected(): boolean {
    return this.socket$ === null ? false : !this.socket$.closed;
  }
  onMessage = (message: { action: number }) => {
    console.debug(JSON.stringify(message));
    switch (message.action) {
      case 0:
        // Connection established but server needs token to correlate user
        console.debug('Authentication requested by server.');
        const token = this.dataService.getToken();
        if (token) {
          console.debug('Sending credentials.');
          this.send({
            action: 0,
            id: this.dataService.getLoginId(),
            token: `Bearer ${token}`,
          });
        }
        break;
      case 1:
        console.debug('Authentication successful.');
        break;
      case 2:
        console.debug('Reload console.');
        this.reloadConsole.emit();
        break;
      case 3:
        console.debug('Reload bingo board.');
        this.reloadBingoBoard.emit();
        break;
      default:
        // Unknown action, error out
        this.messageService.showError('Unknown action requested from server');
        break;
    }
  };
  send = (message: any) => {
    this.socket$.next(message);
  };

  setupWebSocket = () => {
    this.connect();
    // Subscribe to the incoming messages from the WebSocket server
    this.socket$.subscribe(
      (message) => {
        this.isWebSocketConnected = true;
        this.onMessage(message);
      },
      (error) => console.error('WebSocket error:', error),
      () => {
        this.isWebSocketConnected = false;
        console.warn('WebSocket connection closed');
      },
    );
  };
}
