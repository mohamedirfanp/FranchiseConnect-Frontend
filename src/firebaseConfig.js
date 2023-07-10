import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
 
const firebaseConfiguration = {
    apiKey: "AIzaSyCPj-Ag-j22qcSEoBuV5H0vvncfq7KuBGE",
    authDomain: "franchiseconnect-d1f04.firebaseapp.com",
    projectId: "franchiseconnect-d1f04",
    storageBucket: "franchiseconnect-d1f04.appspot.com",
    messagingSenderId: "1018175403429",
    appId: "1:1018175403429:web:119b1491c385ee4b7a244c",
    measurementId: "G-9SR191G4CX"
  };

// Initialize Firebase
const app = initializeApp (firebaseConfiguration);
 
// Firebase storage reference
export const firebaseDb = getFirestore(app);
export const storage = getStorage(app);
