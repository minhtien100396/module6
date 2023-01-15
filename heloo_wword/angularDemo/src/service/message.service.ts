import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {AngularFireMessaging} from "@angular/fire/messaging";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  /**
   * BehaviorSubject: là một loại Subject
   * giống với Event Emiter: có thể ném ra emit và nó cũng là một Observerble
   * và thằng BehaviorSubject là loại Subject có thể bắt được giá trị cuối cùng được emit ra
   */
  currentMessage = new BehaviorSubject(null);

  constructor(private angularFireMessaging: AngularFireMessaging) {
  }

  /**
   * requestPermission: hỏi chúng ta có cho nhận tin nhắn không
   * Nếu không cấp phép thì requestToken: sẽ không được gọi
   * Nếu cấp phép thì requestToken sẽ được gọi lúc này firebase sẽ gửi về trình duyệt một mã token đại diện
   * cho app chúng ta
   * Để mà nhận được tin nhắn từ server gửi về ứng dụng của chúng ta bắt buộc chúng ta phải cũng
   * cấp cái mã token gửi ngược lại cho server. Khi server cần gửi thông báo cho app thì server sẽ dùng
   * cái token này để gửi thông báo đến thiết bị yêu cầu
   * Và để nhận được thông báo thì chúng ta phải cần một cái authorization Key để xác thực ->
   * Nếu không có không thể nhận được tin nhắn
   *
   */
  // tslint:disable-next-line:typedef

  /**
   * requestPermission():Chức năng này sẽ được kích hoạt khi nhận được tin nhắn mới
   */
  requestPermission() {
    this.angularFireMessaging.requestPermission.subscribe((token) => {
        console.log('requestPermission ', token);
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );

    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        console.log('token', token);
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }

  // tslint:disable-next-line:typedef
  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (payload) => {
        console.log('new message received. ', payload);
        this.currentMessage.next(payload);
        this.showCustomerNotification(payload);
      });
  }

  showCustomerNotification(payload: any) {
    let notify_data = payload['notification'];
    let title = notify_data['title'];
    let options = {
      body: notify_data['body'],
      icon: "./assets/funny.jpg",
      badge: "./assets/funny.jpg",
      image: "./assets/ra_dao.jpg",
    };
    console.log("new message received", notify_data);
    let notify: Notification = new Notification(title, options);
    notify.onclick = event => {
      event.preventDefault();
      window.location.href = "https://www.google.com";
    }
  }
}
