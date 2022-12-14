// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5QRvCdjjO6Kz3impRMn7x8ZccnP1k5uU",
  authDomain: "devs-7997e.firebaseapp.com",
  projectId: "devs-7997e",
  storageBucket: "devs-7997e.appspot.com",
  messagingSenderId: "329139682585",
  appId: "1:329139682585:web:bd76fd7a8b8164bb955988",
  measurementId: "G-B6GPL16KRV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const storageService = getStorage(app);