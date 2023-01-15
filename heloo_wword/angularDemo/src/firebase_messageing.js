importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');
var firebaseConfig = {
  apiKey: "AIzaSyAr4PH0zxmDyNjEYu8nKVAwxzgKacV0Ido",
  authDomain: "bui-minh-tien-1587765708666.firebaseapp.com",
  projectId: "bui-minh-tien-1587765708666",
  storageBucket: "bui-minh-tien-1587765708666.appspot.com",
  messagingSenderId: "604017839544",
  appId: "1:604017839544:web:1bf07d7ab99d5b2c38134d",
  measurementId: "G-G08B6TPV4S"
};
/*Khởi tạo ứng dụng firebaseConfig (push Nofitication)*/
firebase.default.initializeApp(firebaseConfig);
/**
 *
 * @type {firebase.messaging.Messaging}: Gửi tin nhắn đến ứng dụng
 */
const messaging = firebase.default.messaging();
