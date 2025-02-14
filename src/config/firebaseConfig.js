import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCk_iT-iLXZ_bWEC7u3QYJWfDLCEXOBH3Y",
  authDomain: "enmsgo-landingpage.firebaseapp.com",
  projectId: "enmsgo-landingpage",
  storageBucket: "enmsgo-landingpage.firebasestorage.app",
  messagingSenderId: "62701350434",
  appId: "1:62701350434:web:84cd315f6393e31353e47b",
  measurementId: "G-TVTWBQ3HPN",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app)
