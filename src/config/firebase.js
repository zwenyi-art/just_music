import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBbnNCyI5fnqolr2UPjHAbJugKcpHVnD6Y",
  authDomain: "justmusic-c1a49.firebaseapp.com",
  projectId: "justmusic-c1a49",
  storageBucket: "justmusic-c1a49.appspot.com",
  messagingSenderId: "383811383987",
  appId: "1:383811383987:web:83886cfd1727e7a633b6c6",
  measurementId: "G-7SM1VL6TNR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage();
