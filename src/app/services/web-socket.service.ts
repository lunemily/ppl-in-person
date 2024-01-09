import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { api } from '../constants.data';
import { MessageService } from './message.service';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  public socket$!: WebSocketSubject<any>;
  private isWebSocketConnected = false;
  constructor(private messageService: MessageService, private cookieService: CookieService) {}
  connect() {
    this.socket$ = webSocket(api.socketUrl); // Establish WebSocket connection
  }
  disconnect() {
    this.socket$.complete();
  }
  isConnected(): boolean {
    return this.socket$ === null ? false : !this.socket$.closed;
  }
  onMessage(message: { action: number }): void {
    console.debug(JSON.stringify(message));
    switch (message.action) {
      case 0:
        // Connection established but server needs loginId to correlate user
        this.send({
          action: 0,
          id: this.cookieService.get('loginId'),
          token: `Bearer ${this.cookieService.get('token')}`,
        });
        break;
      case 1:
        console.info('No action from server. Nothing to reload.');
        break;
      default:
        // Unknown action, error out
        this.messageService.showError('Unknown action requested from server');
        break;
    }
  }
  send(message: any) {
    this.socket$.next(message);
  }

  setupWebSocket() {
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
      }
    );
  }

  handleWebSocketMessage(message: { action: number }) {}
}
