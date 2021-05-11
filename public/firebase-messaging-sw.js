importScripts('https://www.gstatic.com/firebasejs/8.5.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.5.0/firebase-messaging.js');


const firebaseConfig = {
    apiKey: "AIzaSyAAo5GW3sFCa6tA9St8Mh0cttyERN7f3Ow",
    authDomain: "slavab2b.firebaseapp.com",
    projectId: "slavab2b",
    storageBucket: "slavab2b.appspot.com",
    messagingSenderId: "701236639847",
    appId: "1:701236639847:web:e59585ed303b467323bcc2",
    measurementId: "G-3VRX91E5JH"
};


firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();


messaging.setBackgroundMessageHandler(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = payload.data.title;
    const notificationOptions = {
      body: payload.data.body,
      icon: '/firebase-logo.png'
    };
    return self.registration.showNotification(notificationTitle,
      notificationOptions);
  });
  