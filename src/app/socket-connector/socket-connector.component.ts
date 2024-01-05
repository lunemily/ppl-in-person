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
  constructor(private webSocketService: WebSocketService) {
    this.todos = this.webSocketService.getTodoArr();
  }
  ngOnInit() {
    this.webSocketService.socket$ = webSocket(api.socketUrl); // Establish WebSocket connection
    // Subscribe to the incoming messages from the WebSocket server
    this.webSocketService.socket$.subscribe(
      (message) => {
        this.isConnected = true;
        var arrTodo: string[] = [];
        message.forEach((element: any) => {
          arrTodo.push(element.replace('"', '').replace('"', ''));
        });
        console.log(arrTodo);
        this.todos = arrTodo;
      },
      (error) => console.error('WebSocket error:', error),
      () => {
        this.isConnected = false;
        console.log('WebSocket connection closed');
      }
    );
  }
  addTodo() {
    if (this.newTodo.trim() !== '') {
      this.webSocketService.send(this.newTodo); // Send new to-do item to the server
      this.newTodo = '';
    }
  }
  resetList() {
    this.webSocketService.send('reset!*(@h9890138ch1908'); // Send a special message to reset the to-do list
  }
  connectWebSocket() {
    // Establish WebSocket connection
    this.webSocketService.socket$ = webSocket(api.socketUrl);
    this.webSocketService.socket$.subscribe(
      (message) => {
        this.isConnected = true;
        var arrTodo: string[] = [];
        message.forEach((element: any) => {
          arrTodo.push(element.replace('"', '').replace('"', ''));
        });
        console.log(arrTodo);
        this.todos = arrTodo;
      },
      (error) => console.error('WebSocket error:', error),
      () => {
        this.isConnected = false;
        console.log('WebSocket connection closed');
      }
    );
  }
  disconnectWebSocket() {
    this.webSocketService.disconnect(); // Close WebSocket connection
  }
  isWebSocketConnected(): boolean {
    return this.webSocketService.isConnected(); // Check if WebSocket connection is established
  }
  refresh() {
    this.todos = this.webSocketService.getTodoArr(); // Update the to-do list by retrieving it from the WebSocket service
  }
}
