import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDh9HYlYMlhrx6_swzWkdGNVM7ayMgqsGE",
  authDomain: "plumbing-vancouver.firebaseapp.com",
  projectId: "plumbing-vancouver",
  storageBucket: "plumbing-vancouver.firebasestorage.app",
  messagingSenderId: "637963581512",
  appId: "1:637963581512:web:d46d4c53939f6a513ac07d",
  measurementId: "G-198NPZ2V3G",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
