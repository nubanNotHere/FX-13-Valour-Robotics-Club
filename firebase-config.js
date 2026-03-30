import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCRIEzU3okgKvra_N87iu9oDagFUN1hZNo",
  authDomain: "fx-13-valour-robotics-club.firebaseapp.com",
  projectId: "fx-13-valour-robotics-club",
  storageBucket: "fx-13-valour-robotics-club.firebasestorage.app",
  messagingSenderId: "820042360724",
  appId: "1:820042360724:web:1dbe4f4028c5b88066d181",
  measurementId: "G-CKMYJRFV0D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the services so you can use them in other files
export const auth = getAuth(app);
export const db = getFirestore(app);