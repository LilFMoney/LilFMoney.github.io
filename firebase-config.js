import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA-dMaH5y25lnZD20J5dyKIagcfRWcUR0",
  authDomain: "between-covers-credits.firebaseapp.com",
  projectId: "between-covers-credits",
  storageBucket: "between-covers-credits.firebasestorage.app",
  messagingSenderId: "1098426393378",
  appId: "1:1098426393378:web:f447df569a87c9d8c7bb7b"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);