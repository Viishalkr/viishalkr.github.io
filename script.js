/* =========================================
   1. BOOT SEQUENCE & ONE-TIME SHUFFLE
   ========================================= */
const preloader = document.getElementById('preloader');
const bootText = document.getElementById('boot-text');
const body = document.body;
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function scrambleText(element) {
    if (!element) return;
    const originalText = element.dataset.value || element.innerText;
    if (!element.dataset.value) element.dataset.value = originalText;
    let iterations = 0;
    const interval = setInterval(() => {
        element.innerText = originalText.split("").map((letter, index) => {
            if (index < iterations) return originalText[index];
            return letters[Math.floor(Math.random() * 26)];
        }).join("");
        if (iterations >= originalText.length) clearInterval(interval);
        iterations += 1 / 3;
    }, 30);
}

document.querySelectorAll('.scramble-link').forEach(link => {
    link.addEventListener('mouseover', () => scrambleText(link));
});

function startTypewriter() {
    const greeting = document.querySelector('.greeting');
    if (greeting) {
        const text = "hii i'm VISHAL";
        greeting.innerHTML = "";
        let i = 0;
        function type() {
            if (i < text.length) { greeting.innerHTML += text.charAt(i); i++; setTimeout(type, 100); }
        }
        setTimeout(type, 500);
    }
    const mainTitle = document.querySelector('.main-title');
    scrambleText(mainTitle);
}

if (preloader && bootText) {
    const logs = ["SYSTEM BOOT...", "ACCESS GRANTED."];
    let i = 0;
    const typeLine = () => {
        if (i < logs.length) {
            const line = document.createElement('div'); line.classList.add('log-line'); line.innerText = `> ${logs[i]}`; bootText.appendChild(line); setTimeout(typeLine, 400); i++;
        } else {
            setTimeout(() => { preloader.classList.add('loaded'); body.classList.remove('no-scroll'); startTypewriter(); setTimeout(() => preloader.style.display = 'none', 800); }, 600);
        }
    };
    setTimeout(typeLine, 200);
}

/* =========================================
   2. THREE.JS 3D CYBER KNOT (NEW!)
   ========================================= */
let scene, camera, renderer, cyberKnot, cyberKnot2;
const hero3DContainer = document.getElementById('hero-3d');

function init3D() {
    if (!hero3DContainer || window.innerWidth < 768) return; // Skip on mobile

    // Scene Setup
    scene = new THREE.Scene();
    const width = hero3DContainer.clientWidth;
    const height = hero3DContainer.clientHeight;
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 30;

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    hero3DContainer.appendChild(renderer.domElement);

    // Create 3D Objects (Wireframe Torus Knots)
    const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
    const material = new THREE.MeshBasicMaterial({
        color: getThemeColorHex(), // Get initial color
        wireframe: true,
        transparent: true,
        opacity: 0.8
    });

    // Main knot
    cyberKnot = new THREE.Mesh(geometry, material);
    scene.add(cyberKnot);

    // Smaller, faster inner knot
    const geometry2 = new THREE.TorusKnotGeometry(6, 2, 80, 10);
    const material2 = new THREE.MeshBasicMaterial({
        color: getThemeColorHex(),
        wireframe: true,
        transparent: true,
        opacity: 0.5
    });
    cyberKnot2 = new THREE.Mesh(geometry2, material2);
    scene.add(cyberKnot2);

    animate3D();
}

function animate3D() {
    requestAnimationFrame(animate3D);
    if (cyberKnot) {
        cyberKnot.rotation.x += 0.005;
        cyberKnot.rotation.y += 0.007;
    }
    if (cyberKnot2) {
        cyberKnot2.rotation.x -= 0.01;
        cyberKnot2.rotation.y -= 0.008;
    }
    renderer.render(scene, camera);
}

// Helper to get the raw HEX color for Three.js
function getThemeColorHex() {
    if (document.body.classList.contains('purple-mode')) return 0xF1B7EA;
    if (document.body.classList.contains('green-mode')) return 0x32CD32;
    return 0xF42C1D;
}

// Function to update 3D color when theme changes
function update3DTheme() {
    if (!cyberKnot) return;
    const newColor = getThemeColorHex();
    cyberKnot.material.color.setHex(newColor);
    cyberKnot2.material.color.setHex(newColor);
}

/* =========================================
   3. MULTI-THEME SWITCHER (UPDATED)
   ========================================= */
document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    if (key === 'n') {
        document.body.classList.remove('green-mode');
        document.body.classList.toggle('purple-mode');
        initParticles(); // Update 2D particles
        update3DTheme(); // Update 3D model
    }
    else if (key === 'g') {
        document.body.classList.remove('purple-mode');
        document.body.classList.toggle('green-mode');
        initParticles(); // Update 2D particles
        update3DTheme(); // Update 3D model
    }
});

function getThemeColor() {
    if (document.body.classList.contains('purple-mode')) return '#F1B7EA';
    if (document.body.classList.contains('green-mode')) return '#32CD32';
    return '#F42C1D';
}
function getThemeRGBA(opacity) {
    if (document.body.classList.contains('purple-mode')) return `rgba(241, 183, 234, ${opacity})`;
    if (document.body.classList.contains('green-mode')) return `rgba(50, 205, 50, ${opacity})`;
    return `rgba(244, 44, 29, ${opacity})`;
}

/* =========================================
   4. INITIALIZATION (LOADERS)
   ========================================= */
document.addEventListener("DOMContentLoaded", () => {
    // Load images
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        const imgPath = card.getAttribute('data-img');
        if (imgPath) card.style.backgroundImage = `url('${imgPath}')`;
    });

    // Init functions
    initTiltCards();
    init3D(); // Start Three.js
});

/* =========================================
   5. 3D TILT CARD LOGIC
   ========================================= */
function initTiltCards() {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; y = e.clientY - rect.top;
            card.style.setProperty('--card-x', `${x}px`); card.style.setProperty('--card-y', `${y}px`);
            const centerX = rect.width / 2; centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -10; const rotateY = ((x - centerX) / centerX) * 10;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

/* =========================================
   6. 2D PARTICLES (Reactive)
   ========================================= */
const canvas = document.getElementById('neural-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;
let particlesArray;
if (canvas) { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
let mouse = { x: null, y: null, radius: 150 };
window.addEventListener('mousemove', (event) => {
    mouse.x = event.x; mouse.y = event.y;
    document.documentElement.style.setProperty('--cursor-x', event.clientX + 'px');
    document.documentElement.style.setProperty('--cursor-y', event.clientY + 'px');
});

class Particle {
    constructor(x, y, directionX, directionY, size) {
        this.x = x; this.y = y; this.directionX = directionX; this.directionY = directionY; this.size = size;
    }
    draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false); ctx.fillStyle = getThemeColor(); ctx.fill(); }
    update() {
        if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
        let dx = mouse.x - this.x; let dy = mouse.y - this.y; let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            this.x -= (dx / distance) * force * 5; this.y -= (dy / distance) * force * 5;
        }
        this.x += this.directionX; this.y += this.directionY; this.draw();
    }
}
function initParticles() {
    if (!canvas || window.innerWidth < 768) return;
    particlesArray = []; let numberOfParticles = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1; let x = Math.random() * innerWidth; let y = Math.random() * innerHeight;
        particlesArray.push(new Particle(x, y, (Math.random() * 1.5) - 0.75, (Math.random() * 1.5) - 0.75, size));
    }
}
function connectParticles() {
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) ** 2) + ((particlesArray[a].y - particlesArray[b].y) ** 2);
            if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                ctx.strokeStyle = getThemeRGBA(1 - (distance / 20000)); ctx.lineWidth = 1;
                ctx.beginPath(); ctx.moveTo(particlesArray[a].x, particlesArray[a].y); ctx.lineTo(particlesArray[b].x, particlesArray[b].y); ctx.stroke();
            }
        }
    }
}
function animateParticles() {
    if (!canvas) return;
    if (document.body.classList.contains('low-power')) { ctx.clearRect(0, 0, innerWidth, innerHeight); requestAnimationFrame(animateParticles); return; }
    requestAnimationFrame(animateParticles); ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < particlesArray.length; i++) { particlesArray[i].update(); } connectParticles();
}
if (canvas) { initParticles(); animateParticles(); window.addEventListener('resize', () => { canvas.width = innerWidth; canvas.height = innerHeight; initParticles(); }); }

/* =========================================
   MISC (Security, Eco, Scroll, Nav, Modal)
   ========================================= */
document.addEventListener('contextmenu', (e) => { e.preventDefault(); const s = document.getElementById('security-screen'); if (s) { s.classList.add('active'); setTimeout(() => s.classList.remove('active'), 2000); } });
document.getElementById('ecoBtn').addEventListener('click', function () {
    document.body.classList.toggle('low-power'); const st = document.getElementById('perf-text');
    if (document.body.classList.contains('low-power')) { st.innerText = "ECO MODE"; st.style.color = "yellow"; } else { st.innerText = "ONLINE"; st.style.color = getThemeColor(); }
});
function revealOnScroll() {
    document.querySelectorAll('.reveal').forEach((r) => { if (r.getBoundingClientRect().top < window.innerHeight - 100) r.classList.add('active'); });
    const sT = document.documentElement.scrollTop || document.body.scrollTop;
    const sH = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    document.getElementById("scroll-progress").style.width = `${(sT / sH) * 100}%`;
}
window.addEventListener('scroll', revealOnScroll);
document.querySelectorAll('nav a, .hud-point').forEach(l => l.addEventListener('click', (e) => { e.preventDefault(); window.scrollTo({ top: document.querySelector(l.getAttribute('href')).offsetTop, behavior: 'smooth' }); }));

const m = document.getElementById("projectModal"), mI = document.getElementById("modalImg"), mT = document.getElementById("modalTitle"), mD = document.getElementById("modalDesc"), mTools = document.getElementById("modalTools"), cB = document.querySelector(".close");
document.querySelectorAll(".project-card").forEach(c => c.addEventListener('click', () => { mT.innerText = c.getAttribute('data-title'); mD.innerText = c.getAttribute('data-desc'); mTools.innerText = c.getAttribute('data-tools'); mI.src = c.getAttribute('data-img'); m.style.display = "block"; }));
if (cB) cB.onclick = () => m.style.display = "none"; window.onclick = (e) => { if (e.target == m) m.style.display = "none"; };

/* =========================================
   WHATSAPP REVEAL (RE-ADDED AT END)
   ========================================= */
const waBtn = document.getElementById('whatsappBtn');
if (waBtn) {
    waBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const btnText = waBtn.querySelector('.btn-text');
        if (btnText.innerText === 'WHATSAPP') {
            btnText.innerText = "+91 62038 99720";
            setTimeout(() => { window.open('https://wa.me/916203899720', '_blank'); }, 500);
        } else { window.open('https://wa.me/916203899720', '_blank'); }
    });
}