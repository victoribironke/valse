import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_Ga5oYdeAKN0I5PJ77LpqCJ-ZV5B9WcQ",
  authDomain: "bthdc-incident-reporting.firebaseapp.com",
  projectId: "bthdc-incident-reporting",
  storageBucket: "bthdc-incident-reporting.firebasestorage.app",
  messagingSenderId: "264156991977",
  appId: "1:264156991977:web:0a9faf0c3619dee95d7b78",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
