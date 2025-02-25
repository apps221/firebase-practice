// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDnxODkJKKJMtA8JcTF1DeXkVe8UnqOl8",
  authDomain: "fir-practice-a9593.firebaseapp.com",
  projectId: "fir-practice-a9593",
  storageBucket: "fir-practice-a9593.firebasestorage.app",
  messagingSenderId: "701031334535",
  appId: "1:701031334535:web:589ac2121d7efb97976e22",
  measurementId: "G-GV75DDN91L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFirestore();
