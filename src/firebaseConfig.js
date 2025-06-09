// Import only what you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase config object (keep yours as is)
const firebaseConfig = {
  apiKey: "AIzaSyDCfx4m9yrc6CaEU83q_AbG_RG4agOvje4",
  authDomain: "rbx-sm-db.firebaseapp.com",
  projectId: "rbx-sm-db",
  storageBucket: "rbx-sm-db.firebasestorage.app",
  messagingSenderId: "626499721050",
  appId: "1:626499721050:web:237fd4bf9cb9abd4228563"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore database
const db = getFirestore(app);

// Export the Firestore db to use in your app
export { db };
