// Profile Button change based on if the user is logged in or not
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";

// ✅ UPDATED TO NEW PROJECT CONFIG (-cl)
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

// Get references to your navigation buttons
const signInBtn = document.getElementById('Sign-in-Button');
const profileBtn = document.getElementById('Profile-Button');

// This function runs every time the page loads or the user logs in/out
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is logged in: Show Profile, Hide Sign In
        if (signInBtn) signInBtn.style.display = 'none';
        if (profileBtn) profileBtn.style.display = 'flex';
        
        console.log("Welcome back, Executive:", user.email);
    } else {
        // User is logged out: Show Sign In, Hide Profile
        if (signInBtn) signInBtn.style.display = 'flex';
        if (profileBtn) profileBtn.style.display = 'none';
        
        console.log("No active session found.");
    }
});

// Redirect to Profile Page when clicking the Profile Button
if (profileBtn) {
    profileBtn.addEventListener('click', () => {
        window.location.href = "/public/Auth/executiveProfile.html"; // Adjust path if needed
    });
}
// Code Block for type writing event in the home page starts here
const textElement = document.getElementById("typewriter-text");
const phrases = [
    "creativity meets talent",
    "we are learning robotics in a new way"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        // Remove characters
        textElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50; // Faster when deleting
    } else {
        // Add characters
        textElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }

    // Logic for switching states
    if (!isDeleting && charIndex === currentPhrase.length) {
        // Pause at the end of the phrase
        isDeleting = true;
        typeSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
}

// Start the effect
document.addEventListener("DOMContentLoaded", typeEffect);

// Code block for the type writing effect ends here

// POP-UP when an event is clicked code here

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("event-modal");
    const modalBody = document.getElementById("modal-body-content");
    const eventCards = document.querySelectorAll(".event-container");
    const closeModal = document.querySelector(".close-modal");

    eventCards.forEach(card => {
        card.addEventListener("click", () => {
            // 1. Grab data from the clicked card
            const imgSrc = card.querySelector("img").src;
            const title = card.querySelector(".events-heading").innerText;
            const classTag = card.querySelector(".event-for-which-class").innerText;
            const description = card.querySelector("p.events-text").innerText;

            // 2. Inject data into the modal
            modalBody.innerHTML = `
                <img src="${imgSrc}" class="modal-main-img">
                <div class="modal-header-flex">
                    <h2>${title}</h2>
                    <span class="modal-tag">${classTag}</span>
                </div>
                <div class="modal-scroll-area">
                    <p>${description}</p>
                </div>
            `;

            // 3. Show the modal
            modal.style.display = "flex";
            document.body.style.overflow = "hidden"; // Freeze background scroll

            // Trigger animation 
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    modal.classList.add('active');
                });
            });
        });
    });

    const closeEventModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = "auto";
        setTimeout(() => {
            if (!modal.classList.contains('active')) {
                modal.style.display = "none";
            }
        }, 300); // matches the 0.3s CSS transition
    };

    // Close Button logic
    if (closeModal) {
        closeModal.addEventListener("click", closeEventModal);
    }

    // Close if clicking the dark background
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeEventModal();
        }
    });
});

// Smooth-scroll handler for nav links (accounts for navbar offset)
document.querySelectorAll('.nav-item-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (!targetId || targetId.charAt(0) !== '#') return;
        const targetSection = document.querySelector(targetId);
        if (!targetSection) return;

        const navOffset = 120; // adjust to match navbar height
        window.scrollTo({
            top: targetSection.offsetTop - navOffset,
            behavior: 'smooth'
        });
    });
});

// Initialize Lenis if the library loaded successfully, makes everything smoother btw
if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
        duration: 1.2,
        smooth: true
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
} else {
    console.warn('Lenis is not available. Ensure the CDN script is loaded before index.js.');
}


// AeroScense car interaction logic here

const AeroScenseCard = document.getElementById('project-container1');

AeroScenseCard.addEventListener('click', () => {
    // Navigates to the new page in the same tab
    window.location.href = "AeroScense_blog.html";
});

// Event Date

// SET YOUR TARGET DATE HERE
// Format: "Month Day, Year Hours:Minutes:Seconds"
const targetDate = new Date("March 18, 2026 10:00:00").getTime();

const countdownFunction = setInterval(function() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="upcoming-event-countdown"
    const countdownElement = document.getElementById("upcoming-event-countdown");
    const statusElement = document.getElementById("event-status");

    if (countdownElement) {
        countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        statusElement.innerHTML = "LIVE INITIATIVE";
    }

    // If the countdown is finished
    if (distance < 0) {
        clearInterval(countdownFunction);
        countdownElement.innerHTML = "EVENT STARTED";
        statusElement.innerHTML = "ONGOING";
        statusElement.style.color = "#3b604b"; // Change to green when live
    }
}, 1000);

// Participate in upcoming event button location

// Select all buttons with this class
const eventButtons = document.querySelectorAll('.event-participate-button');

// Loop through each button found
eventButtons.forEach(button => {
    button.addEventListener('click', () => {
        window.location.href = "Upcoming-Event.html";
    });
});


// Optional Lenis smooth-scrolling init
if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({ duration: 1.2, smooth: true });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
} else {
    console.warn('Lenis is not available. Ensure the CDN script is loaded before index.js.');
}

// Logical mapping for later use
const connections = [
    { start: 'exec-1', end: 'exec-3', pathId: 'line-1' },
    { start: 'exec-1', end: 'trunk', pathId: 'line-2' },
    { start: 'exec-2', end: 'trunk', pathId: 'line-3' },
    { start: 'exec-3', end: 'trunk', pathId: 'line-4' },
    { start: 'trunk', end: 'exec-4', pathId: 'line-5' },
    { start: 'trunk', end: 'exec-5', pathId: 'line-5' }
];

// Hover / focus activation for exec nodes
document.addEventListener('DOMContentLoaded', () => {
    const nodes = document.querySelectorAll('.exec-node');
    nodes.forEach(node => {
        const mapping = node.getAttribute('data-lines') || '';
        const ids = mapping.split(' ').map(s => s.trim()).filter(Boolean);
        const setActive = (on) => ids.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.toggle('active', !!on);
            const pulse = document.getElementById(id + '-pulse');
            if (pulse) pulse.classList.toggle('active', !!on);
        });

        node.addEventListener('mouseenter', () => setActive(true));
        node.addEventListener('mouseleave', () => setActive(false));
        node.setAttribute('tabindex', '0');
        node.addEventListener('focus', () => setActive(true));
        node.addEventListener('blur', () => setActive(false));
    });
});

// Pulse-enabled bridge-style updateCircuits
function updateCircuits() {
    const svg = document.querySelector('.exec-circuits');
    if (!svg) return;

    const svgRect = svg.getBoundingClientRect();
    const vb = svg.viewBox.baseVal || { width: svgRect.width, height: svgRect.height };
    const scaleX = vb.width / svgRect.width;
    const scaleY = vb.height / svgRect.height;
    const toSvg = (pt) => ({ x: (pt.x - svgRect.left) * scaleX, y: (pt.y - svgRect.top) * scaleY });

    const el = id => document.getElementById(id);
    const nodes = [el('exec-1'), el('exec-2'), el('exec-3'), el('exec-4'), el('exec-5')];
    if (nodes.some(n => !n)) return;

    const getPos = (n) => {
        const r = n.getBoundingClientRect();
        return { cx: r.left + r.width / 2, cy: r.top + r.height / 2, top: r.top, bottom: r.bottom };
    };

    const p1 = getPos(nodes[0]);
    const p2 = getPos(nodes[1]);
    const p3 = getPos(nodes[2]);
    const p4 = getPos(nodes[3]);
    const p5 = getPos(nodes[4]);

    const bridgeY = toSvg({ x: 0, y: p2.bottom + (p4.top - p2.bottom) / 2 }).y;
    const s1 = toSvg({ x: p1.cx, y: p1.bottom });
    const s2 = toSvg({ x: p2.cx, y: p2.bottom });
    const s3 = toSvg({ x: p3.cx, y: p3.bottom });
    const s4 = toSvg({ x: p4.cx, y: p4.top });
    const s5 = toSvg({ x: p5.cx, y: p5.top });
    const bottomBranchY = s4.y - 30;

    const setPath = (id, d) => {
        const p = document.getElementById(id);
        if (!p) return;
        p.setAttribute('d', d);

        let pulse = document.getElementById(id + '-pulse');
        if (!pulse) {
            pulse = p.cloneNode(true);
            pulse.id = id + '-pulse';
            pulse.classList.remove('circuit-line');
            pulse.classList.remove('active');
            pulse.classList.add('pulse-line');
            if (p.parentNode) p.parentNode.appendChild(pulse);
            else svg.appendChild(pulse);
        }
        pulse.setAttribute('d', d);
    };

    setPath('line-1', `M ${s1.x} ${s1.y} L ${s1.x} ${bridgeY} L ${s3.x} ${bridgeY} L ${s3.x} ${s3.y}`);
    setPath('line-2', `M ${s2.x} ${s2.y} L ${s2.x} ${bottomBranchY}`);
    setPath('line-3', `M ${s4.x} ${s4.y} L ${s4.x} ${bottomBranchY} L ${s5.x} ${bottomBranchY} L ${s5.x} ${s5.y}`);

    ['line-4', 'line-5', 'line-6'].forEach(id => {
        const p = document.getElementById(id);
        if (p) p.setAttribute('d', '');
        const pulse = document.getElementById(id + '-pulse');
        if (pulse) pulse.remove();
    });
}

// circuit do circuit
let circuitsResizeTimeout = null;
function scheduleUpdateCircuits() {
    if (circuitsResizeTimeout) clearTimeout(circuitsResizeTimeout);
    circuitsResizeTimeout = setTimeout(updateCircuits, 80);
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(updateCircuits, 120);
    window.addEventListener('resize', scheduleUpdateCircuits);
    window.addEventListener('load', updateCircuits);
});

// --- Interactive Star Particle Background ---
const canvas = document.getElementById('bg-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    // Mouse interaction W
    const mouse = { x: null, y: null, radius: 150 };

    window.addEventListener('mousemove', (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
    });

    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        initParticles();
    }
    window.addEventListener('resize', resize);

    class Particle {
        constructor(x, y, dx, dy, size) {
            this.x = x;
            this.y = y;
            this.dx = dx;
            this.dy = dy;
            this.size = size;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            // Stars are off-white/blue shaded
            ctx.fillStyle = 'rgba(232, 232, 232, 0.8)';
            ctx.fill();
        }
        update() {
            if (this.x > width || this.x < 0) this.dx = -this.dx;
            if (this.y > height || this.y < 0) this.dy = -this.dy;

            // Interaction with mouse (repel slightly)
            if (mouse.x != null && mouse.y != null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouse.radius) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouse.radius - distance) / mouse.radius;
                    this.x -= forceDirectionX * force * 1.5;
                    this.y -= forceDirectionY * force * 1.5;
                }
            }

            this.x += this.dx;
            this.y += this.dy;
            this.draw();
        }
    }

    function initParticles() {
        particles = [];
        // Adjust density: lower divisor = more particles so its better haha
        let numberOfParticles = (width * height) / 9000;
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 1.5) + 0.5; // tiny stars
            let x = (Math.random() * (width - size * 2)) + size * 2;
            let y = (Math.random() * (height - size * 2)) + size * 2;
            let dx = (Math.random() - 0.5) * 0.5; // slow drift
            let dy = (Math.random() - 0.5) * 0.5;
            particles.push(new Particle(x, y, dx, dy, size));
        }
    }

    function animateParticles() {
        requestAnimationFrame(animateParticles);
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
        }
        connectParticles();
    }

    function connectParticles() {
        let maxDistance = 100;
        for (let a = 0; a < particles.length; a++) {
            for (let b = a; b < particles.length; b++) {
                let dx = particles[a].x - particles[b].x;
                let dy = particles[a].y - particles[b].y;
                let distance = dx * dx + dy * dy;

                // Connect particles to each other
                if (distance < (maxDistance * maxDistance)) {
                    let opacity = 1 - (distance / (maxDistance * maxDistance));
                    ctx.strokeStyle = `rgba(232, 232, 232, ${opacity * 0.15})`; // VERY faint web
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
            // Mouse connection: "shit appear when u hover over the web"
            if (mouse.x != null && mouse.y != null) {
                let dx = particles[a].x - mouse.x;
                let dy = particles[a].y - mouse.y;
                let distance = dx * dx + dy * dy;
                if (distance < (mouse.radius * mouse.radius)) {
                    let opacity = 1 - (distance / (mouse.radius * mouse.radius));
                    // Electric blue lines shoot out to the cursor like Woosh
                    ctx.strokeStyle = `rgba(0, 123, 255, ${opacity * 0.9})`;
                    ctx.lineWidth = 1.2;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }
        }
    }

    resize();
    animateParticles();
}