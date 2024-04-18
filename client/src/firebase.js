// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-website-beace.firebaseapp.com",
  projectId: "blog-website-beace",
  storageBucket: "blog-website-beace.appspot.com",
  messagingSenderId: "222318630482",
  appId: "1:222318630482:web:7c171212526e8df9b0318b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);