// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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
export const app = initializeApp(firebaseConfig);
export const storageService = getStorage();
export const auth = getAuth();
export const db = getFirestore();