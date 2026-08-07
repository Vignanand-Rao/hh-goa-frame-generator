import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDyWxoJCKSJDIm2YiY4jbwpbxaRmPRRc0M",
  authDomain: "hh-goa-builder.firebaseapp.com",
  projectId: "hh-goa-builder",
  storageBucket: "hh-goa-builder.firebasestorage.app",
  messagingSenderId: "445151887820",
  appId: "1:445151887820:web:bea35c7082bc7f549ddd69",
  measurementId: "G-YZYZ79MNS9",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);