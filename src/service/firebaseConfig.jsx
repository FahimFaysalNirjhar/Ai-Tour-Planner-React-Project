// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzZsAdEaT0y9pGdie5kB6rJyLm19McZmk",
  authDomain: "ai-travel-planner-37e7a.firebaseapp.com",
  projectId: "ai-travel-planner-37e7a",
  storageBucket: "ai-travel-planner-37e7a.firebasestorage.app",
  messagingSenderId: "313182552470",
  appId: "1:313182552470:web:6765073511b223ceb7ddb7",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
