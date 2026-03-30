import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

// ✅ UPDATED TO NEW PROJECT CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyDWvRGwqsin8dOpSN0cCcVB2Uk4ksqAW6o",
  authDomain: "fx-13-valour-robotics-cl.firebaseapp.com",
  projectId: "fx-13-valour-robotics-cl",
  storageBucket: "fx-13-valour-robotics-cl.firebasestorage.app",
  messagingSenderId: "59539717639",
  appId: "1:59539717639:web:305c99ba707b934a25b4a2",
  measurementId: "G-HJZ3X155PV"
};

// INITIALIZE
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// ... rest of your listener code

const loginBtn = document.getElementById('signInBtn');
const signInScreen = document.getElementById('signInScreen')
const successSignInExecutive = document.getElementById('successSignInExecutive')
const notExecutive = document.getElementById('notExecutive')

loginBtn.addEventListener('click', async () => {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (!email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    try {
        // The core Firebase magic
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        console.log("Logged in as:", user.email);
        
          const executiveRef = doc(db , 'authorized_emails' , email)
          const executiveSnap = await getDoc(executiveRef)

          if(executiveSnap.exists()){
               signInScreen.style.display = 'none'
               successSignInExecutive.style.display = 'flex'
          }
          else{
               signInScreen.style.display = 'none'
               notExecutive.style.display = 'flex'
          }

    } catch (error) {
        // Handle common login errors gracefully
        if (error.code === 'auth/invalid-credential') {
            alert("Incorrect email or password. Please try again.");
        } else if (error.code === 'auth/user-not-found') {
            alert("No account found with this email.");
        } else {
            alert("Error: " + error.message);
        }
    }
});