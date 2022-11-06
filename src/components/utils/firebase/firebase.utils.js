// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvyCb-IauK4Bv2nVoj0QMqGUVHs5ri1fk",
  authDomain: "cocomerce-db.firebaseapp.com",
  projectId: "cocomerce-db",
  storageBucket: "cocomerce-db.appspot.com",
  messagingSenderId: "349999206198",
  appId: "1:349999206198:web:8415a8607848fc64152d97"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);