// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcHjpaKOOmEykAaT57GbjekPd8T1MXjhM",
  authDomain: "hardy-ivy-327407.firebaseapp.com",
  projectId: "hardy-ivy-327407",
  storageBucket: "hardy-ivy-327407.firebasestorage.app",
  messagingSenderId: "467296784240",
  appId: "1:467296784240:web:62f42e7477ce01378c09b5",
  measurementId: "G-DPJ80FKHTH"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();


export const db = getFirestore(app);
export const auth = getAuth(app);