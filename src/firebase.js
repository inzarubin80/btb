import firebase from 'firebase/app';
import 'firebase/messaging';

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
var messaging = firebase.messaging();

messaging.onMessage(function(payload) {
    console.log("Message received. ", payload);
});

function initToken() {
    messaging.getToken().then(function(currentToken) {
        if (currentToken) {

          console.log(currentToken);
          localStorage.setItem('messageRecipientKey', currentToken);

        } else {
          
          localStorage.setItem('messageRecipientKey', '');
          console.log('No Instance ID token available. Request permission to generate one.');
        }
    }).catch(function(err) {
    localStorage.setItem('messageRecipientKey', "");
      });
}


initToken()


