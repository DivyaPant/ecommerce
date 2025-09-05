// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";

const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;
const PROJECT_ID = import.meta.env.VITE_FIREBASE_PROJECT_ID;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: `${PROJECT_ID}.firebaseapp.com`,
  projectId: PROJECT_ID,
  storageBucket: `${PROJECT_ID}.appspot.com`
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);