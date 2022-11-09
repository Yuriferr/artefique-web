
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBzIt_sxilwQTskq2fKNPrqehXjJNCX9p4",
  authDomain: "teste-e3910.firebaseapp.com",
  projectId: "teste-e3910",
  storageBucket: "teste-e3910.appspot.com",
  messagingSenderId: "316069052947",
  appId: "1:316069052947:web:07f34a7025e7728dc6f5e6"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);