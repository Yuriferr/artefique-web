
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDT4OBZ4eTagd8JDCPnX-iSYrUGyY6C8lM",
  authDomain: "artefique-fcde8.firebaseapp.com",
  projectId: "artefique-fcde8",
  storageBucket: "artefique-fcde8.appspot.com",
  messagingSenderId: "568129389422",
  appId: "1:568129389422:web:e37c3fe90b35f665f7f77f"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);