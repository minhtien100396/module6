import { Component } from '@angular/core';
import {Stomp} from "@stomp/stompjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'grokonez';
  description = 'Angular-WebSocket Demo';

  greetings: string[] = [];
  disabled = true;
  name: string;
  private stompClient :any;
  message:string="";

  constructor() { }

  setConnected(connected: boolean) {
    this.disabled = !connected;

    if (connected) {
      this.greetings = [];
    }
  }

  connect() {
    //Đường dẫn đến server chuyển https -> ws
    const socket = new WebSocket('ws://localhost:8080/gkz-stomp-endpoint/websocket');
    this.stompClient = Stomp.over(socket);

    const _this = this;
    this.stompClient.connect({}, function (frame:any) {
      _this.setConnected(true);
      console.log('Connected: ' + frame);

      //Chờ xem server gửi về gì
      _this.stompClient.subscribe('/topic/public', function (hello:any) {
        _this.showGreeting(JSON.parse(hello.body).greeting);
      });
    });
  }

  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }

    this.setConnected(false);
    console.log('Disconnected!');
  }

  sendName() {
    this.stompClient.send(
      '/gkz/hello',
      {},
      //Dữ liệu được gửi đi
      JSON.stringify({ 'name': this.name,'message':this.message }),
    );
  }

  showGreeting(message:any) {
    this.greetings.push(message);
  }
}
