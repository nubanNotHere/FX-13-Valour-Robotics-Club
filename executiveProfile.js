import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

// ✅ NEW PROJECT CONFIG
const firebaseConfig = {
    apiKey: "AIzaSyDWvRGwqsin8dOpSN0cCcVB2Uk4ksqAW6o",
    authDomain: "fx-13-valour-robotics-cl.firebaseapp.com",
    projectId: "fx-13-valour-robotics-cl",
    storageBucket: "fx-13-valour-robotics-cl.firebasestorage.app",
    messagingSenderId: "59539717639",
    appId: "1:59539717639:web:305c99ba707b934a25b4a2",
    measurementId: "G-HJZ3X155PV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 1. Check Authentication State
onAuthStateChanged(auth, async (user) => {
    if (user) {
        console.log("Logged in as:", user.email);
        await loadExecutiveData(user.email);
    } else {
        window.location.href = "../signin.html";
    }
});

// 2. Fetch Data by Email Query
async function loadExecutiveData(email) {
    try {
        const executivesRef = collection(db, "Executives");
        const q = query(executivesRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const data = querySnapshot.docs[0].data();
            updateUI(data);
        } else {
            document.getElementById('fullNameDisplay').innerHTML = "<span>Profile Not Found</span>";
        }
    } catch (error) {
        console.error("Firestore Error:", error);
    }
}

// 3. Update the Dashboard UI
function updateUI(data) {
    // --- Name Display ---
    if (data.fullName) {
        const parts = data.fullName.split(' ');
        const first = parts[0];
        const rest = parts.slice(1).join(' ');
        document.getElementById('fullNameDisplay').innerHTML = `${first} <span>${rest}</span>`;
    }
    
    // --- Academic & Contact Info ---
    document.getElementById('displayClass').textContent = data.executiveClass || "N/A";
    document.getElementById('displaySection').textContent = data.section || "N/A";
    document.getElementById('displayGender').textContent = data.gender || "N/A";
    document.getElementById('displayYear').textContent = data.joiningYear || "N/A";
    document.getElementById('displayEmail').textContent = data.email || "N/A";
    document.getElementById('displayPhone').textContent = data.phoneNumber || "N/A";

    // --- Role and Tags ---
    document.getElementById('roleTag').textContent = data.role || "Executive";
    if(data.specialTag) {
        const sTag = document.getElementById('specialTag1');
        sTag.textContent = data.specialTag;
        sTag.style.display = 'inline-block';
    }

    // --- Contributions Logic (INSIDE updateUI) ---
    const contributionsContainer = document.getElementById('contributionsList');
    if (data.contributions && Object.keys(data.contributions).length > 0) {
        contributionsContainer.innerHTML = ''; 
        Object.entries(data.contributions).forEach(([projectName, details]) => {
            const item = document.createElement('div');
            item.className = 'data-item';
            item.innerHTML = `
                <p class="item-title"><strong>${projectName}</strong></p>
                <p class="item-detail">${details}</p>
            `;
            contributionsContainer.appendChild(item);
        });
    }

    // --- Attendance Logic (INSIDE updateUI) ---
    const attendanceContainer = document.getElementById('attendanceList');
    if (data.attendance && Object.keys(data.attendance).length > 0) {
        attendanceContainer.innerHTML = ''; 
        
        const sortedDates = Object.keys(data.attendance).sort().reverse();

        sortedDates.forEach(date => {
            const status = data.attendance[date];
            const item = document.createElement('div');
            item.className = 'attendance-row';
            item.innerHTML = `
                <span class="date-label">${date}</span>
                <span class="status-badge ${status.toLowerCase()}">${status}</span>
            `;
            attendanceContainer.appendChild(item);
        });
    }
} // <--- This closing brace must be AFTER all the logic that uses "data"

// 4. Button Actions
document.getElementById('logOut').addEventListener('click', () => {
    signOut(auth).then(() => {
        window.location.href = "../index.html";
    });
});

document.getElementById('website').addEventListener('click', () => {
    window.location.href = "../index.html";
});

document.getElementById('editProfile').addEventListener('click', () => {
    window.alert("Profile editing is currently being integrated with the database. Check back soon!");
});

// 4. Select the button from your HTML
const logOutBtn = document.getElementById('logOut');

// 5. Add the Log Out Logic
if (logOutBtn) {
    logOutBtn.addEventListener('click', () => {
        // Confirmation popup
        const confirmLogout = confirm("Are you sure you want to log out of the FX-13 Valour Dashboard?");
        
        if (confirmLogout) {
            signOut(auth)
                .then(() => {
                    console.log("Logged out successfully.");
                    // Redirect back to the home page
                    // Use ../ if this file is in a /pages folder
                    window.location.href = "../index.html"; 
                })
                .catch((error) => {
                    console.error("Logout Error:", error);
                    alert("Error: " + error.message);
                });
        }
    });
}