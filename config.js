import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyAwTCilFAiNbiYK8l9O0L9QCwjwAOitQoo",
    authDomain: "otp-verification-c8f1e.firebaseapp.com",
    projectId: "otp-verification-c8f1e",
    storageBucket: "otp-verification-c8f1e.appspot.com",
    messagingSenderId: "17246253058",
    appId: "1:17246253058:web:d1188080c48b03f341f71b"
  };
  // Initialize Firebase
  
  firebase.initializeApp(firebaseConfig);
  export default firebase;