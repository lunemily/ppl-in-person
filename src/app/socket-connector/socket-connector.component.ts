import { Component, OnInit } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { api } from '../constants.data';
@Component({
  selector: 'app-socket-connector',
  templateUrl: './socket-connector.component.html',
  styleUrls: ['./socket-connector.component.scss'],
})
export class SocketConnectorComponent implements OnInit {
  todos: string[] = [];
  newTodo: string = '';
  isConnected: boolean = false;
  constructor(private webSocketService: WebSocketService) {}
  ngOnInit() {
    this.webSocketService.socket$ = webSocket(api.socketUrl); // Establish WebSocket connection
    // Subscribe to the incoming messages from the WebSocket server
    this.webSocketService.socket$.subscribe(
      (message) => {
        this.isConnected = true;
        console.info(JSON.stringify(message));
      },
      (error) => console.error('WebSocket error:', error),
      () => {
        this.isConnected = false;
        console.warn('WebSocket connection closed');
      }
    );
  }
}
