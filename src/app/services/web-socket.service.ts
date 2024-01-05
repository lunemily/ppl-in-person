import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  public socket$!: WebSocketSubject<any>;
  private todoArr: string[] = [];
  constructor() {}
  connect() {
    this.socket$ = webSocket('ws://localhost:8080'); // Replace with your WebSocket server URL
  }
  disconnect() {
    this.socket$.complete();
  }
  isConnected(): boolean {
    return this.socket$ === null ? false : !this.socket$.closed;
  }
  onMessage(): Observable<any> {
    return this.socket$!.asObservable().pipe(map((message) => message));
  }
  send(message: any) {
    this.socket$.next(message);
  }
  getTodoArr(): string[] {
    return this.todoArr;
  }
}
