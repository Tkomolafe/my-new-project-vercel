// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyB1uq5vC3FZ09rAboQRyDcU1qbjwpmWFHw",
    authDomain: "authentication-react-384fd.firebaseapp.com",
    projectId: "authentication-react-384fd",
    storageBucket: "authentication-react-384fd.appspot.com",
    messagingSenderId: "624992284435",
    appId: "1:624992284435:web:876b9e29985c3494e374e6",
    measurementId: "G-3YK471Q9S3"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { auth };
