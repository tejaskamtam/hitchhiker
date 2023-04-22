// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "hitchhiker-f0d84.firebaseapp.com",
  projectId: "hitchhiker-f0d84",
  storageBucket: "hitchhiker-f0d84.appspot.com",
  messagingSenderId: "390077034808",
  appId: "1:390077034808:web:9e09983a85eaf8bdc111cd",
  measurementId: "G-DRE2D72Z3Q"
};

export const app = initializeApp(firebaseConfig);

export const initFirebase = () => {
  return app;
}