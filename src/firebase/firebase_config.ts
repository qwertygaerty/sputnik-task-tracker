import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAHYojo-ARk04vfDB1fQ5JxvWKdtFA3vUs",
  authDomain: "sputnik-task-tracker.firebaseapp.com",
  databaseURL:
    "https://sputnik-task-tracker-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "sputnik-task-tracker",
  storageBucket: "sputnik-task-tracker.appspot.com",
  messagingSenderId: "767101755102",
  appId: "1:767101755102:web:47b2616f7b9d1da0a6ac4f",
  measurementId: "G-68DBBM353R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { app, db };
