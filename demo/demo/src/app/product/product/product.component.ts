import { Component, OnInit } from '@angular/core';
import {PushNotificationService} from "../../../service/push-notification.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  messageReceived = 'aa';

  constructor(private _nofitication: PushNotificationService) {
    _nofitication.requestPermission().then(
      token => {
        console.log("token:",token);
      }
    )
  }

  ngOnInit(): void {
    this._nofitication.receiveMessage().subscribe(payload => {
      console.log("payload:",payload);
      this.messageReceived = payload.notification.title;
    })
  }

}
