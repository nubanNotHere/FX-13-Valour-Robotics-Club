import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

// MOVE THIS UP HERE
const firebaseConfig = {
  apiKey: "AIzaSyDWvRGwqsin8dOpSN0cCcVB2Uk4ksqAW6o",
  authDomain: "fx-13-valour-robotics-cl.firebaseapp.com",
  projectId: "fx-13-valour-robotics-cl", // MUST match the new ID
  storageBucket: "fx-13-valour-robotics-cl.firebasestorage.app",
  messagingSenderId: "59539717639",
  appId: "1:59539717639:web:305c99ba707b934a25b4a2",
  measurementId: "G-HJZ3X155PV"
};
// NOW INITIALIZE
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// ... rest of your listener code

// 1. Add 'async' here so we can use 'await' inside
const continueBtn = document.getElementById('continueBtn')
const signUpScreen = document.getElementById('signUpScreen')
const successfullAccountCreation = document.getElementById('successfullAccountCreation')

continueBtn.addEventListener('click', async () => {

     const email = document.getElementById('email').value.toLowerCase().trim()
     const password = document.getElementById('password').value
     const confirmPassword = document.getElementById('confirmPassword').value
     const fullName = document.getElementById('fullName').value
     const phoneNumber = document.getElementById('phoneNumber').value
     const executiveClass = document.getElementById('class').value
     const gender = document.getElementById('gender').value
     const section = document.getElementById('section').value.toLowerCase().trim()
     const joiningYear = document.getElementById('joiningYear').value

     if (!email) {
        window.alert("Please enter an email address first.");
        return; // This prevents the code from running the 'doc()' function with 1 segment
    }

     if(password === confirmPassword){
          try {
               const executiveRef = doc(db , 'authorized_emails' , email)
               const executiveSnap = await getDoc(executiveRef)

               if(executiveSnap.exists()){
                    
                    const executiveCredential = await createUserWithEmailAndPassword(auth, email, password);
                    const executive = executiveCredential.user;

                    // 3. Fixed the parentheses here: doc(db, 'coll', id), { data }
                    await setDoc(doc(db , 'Executives' , `${fullName} Cl: ${executiveClass}`), {
                         email : email,
                         role : "executive",
                         password: password,
                         fullName : fullName,
                         phoneNumber : phoneNumber,
                         executiveClass : executiveClass,
                         section: section,
                         gender: gender,
                         joiningYear: joiningYear,
                         specialTag: "",
                         contributions: {},
                         attendance: {}
                    });
                    
                    signUpScreen.style.display = 'none'
                    successfullAccountCreation.style.display = 'flex'
                    
               } else {
                    window.alert("This email is not authorized as an Executive.");
               }

          } catch (error) {
               console.error(error);
               window.alert("Error: " + error.message);
          }
     } else {
          window.alert("Your password and confirm password did not match!")
     }
})