/* =========================================
   1. BOOT & TEXT
   ========================================= */
const preloader = document.getElementById('preloader');
const bootText = document.getElementById('boot-text');
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

document.querySelectorAll('.scramble-link').forEach(link => link.addEventListener('mouseover', () => scrambleText(link)));

function startTypewriter() {
    const greeting = document.querySelector('.greeting');
    if (greeting) {
        const text = "hii i'm VISHAL";
        greeting.innerHTML = "";
        let i = 0;
        function type() { if (i < text.length) { greeting.innerHTML += text.charAt(i); i++; setTimeout(type, 100); } }
        setTimeout(type, 500);
    }
    scrambleText(document.querySelector('.main-title'));
}

if (preloader && bootText) {
    const logs = ["SYSTEM BOOT...", "ACCESS GRANTED."];
    let i = 0;
    const typeLine = () => {
        if (i < logs.length) {
            const line = document.createElement('div'); line.className = 'log-line'; line.innerText = `> ${logs[i]}`; bootText.appendChild(line); setTimeout(typeLine, 400); i++;
        } else {
            setTimeout(() => { preloader.classList.add('loaded'); document.body.classList.remove('no-scroll'); startTypewriter(); setTimeout(() => preloader.style.display = 'none', 800); }, 600);
        }
    };
    setTimeout(typeLine, 200);
}

/* =========================================
   2. THREE.JS COOL PARTICLE SHAPES (NEW!)
   ========================================= */
const meshes = []; // Store particle systems for animation/theme updates

function create3DScene(containerId, shapeType) {
    const container = document.getElementById(containerId);
    if (!container || window.innerWidth < 900) return;

    const width = container.clientWidth;
    const height = container.clientHeight;
    const scene = new THREE.Scene();
    // Camera positioned further back for larger particle clouds
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 2000);
    camera.position.z = 40;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // --- PARTICLE MATERIAL ---
    const particleMaterial = new THREE.PointsMaterial({
        color: getThemeColorHex(),
        size: 0.3, // Size of each dot
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending // Makes them glow when overlapping
    });

    let geometry, particles;
    const points = [];

    // --- SHAPE DEFINITIONS ---
    if (shapeType === 'dna') {
        // ABOUT: PARTICLE DNA HELIX
        for (let i = 0; i < 3000; i++) {
            const t = i * 0.01;
            // Strand 1
            points.push(new THREE.Vector3(Math.cos(t) * 8, t * 2 - 30, Math.sin(t) * 8));
            // Strand 2 (offset)
            points.push(new THREE.Vector3(Math.cos(t + Math.PI) * 8, t * 2 - 30, Math.sin(t + Math.PI) * 8));
            // Random scatter around strands
            if (i % 5 === 0) {
                points.push(new THREE.Vector3((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 60, (Math.random() - 0.5) * 20));
            }
        }
    }
    else if (shapeType === 'atom') {
        // SKILLS: ATOMIC CORE + RINGS
        // Core sphere cloud
        for (let i = 0; i < 2000; i++) {
            const u = Math.random(); const v = Math.random();
            const theta = 2 * Math.PI * u; const phi = Math.acos(2 * v - 1);
            const r = 6 + Math.random() * 2; // Radius variation
            points.push(new THREE.Vector3(r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi)));
        }
        // Orbital Rings (handled as separate meshes below)
    }
    else if (shapeType === 'vortex') {
        // CONTACT: PARTICLE VORTEX/WORMHOLE
        for (let i = 0; i < 4000; i++) {
            const t = i * 0.005; // spiral tightness
            const r = t * 3;     // radius increases with t
            const x = r * Math.cos(t * 10);
            const y = r * Math.sin(t * 10);
            const z = t * 5 - 20; // pull deeper into Z depth
            points.push(new THREE.Vector3(x, y, z));
        }
    }

    // Create main particle system
    geometry = new THREE.BufferGeometry().setFromPoints(points);
    particles = new THREE.Points(geometry, particleMaterial);
    scene.add(particles);
    meshes.push(particles);

    // --- EXTRA ELEMENTS FOR SKILLS (RINGS) ---
    let ring1, ring2;
    if (shapeType === 'atom') {
        const ringMat = new THREE.MeshBasicMaterial({ color: getThemeColorHex(), wireframe: true, transparent: true, opacity: 0.2 });
        ring1 = new THREE.Mesh(new THREE.TorusGeometry(12, 0.2, 16, 100), ringMat);
        ring2 = new THREE.Mesh(new THREE.TorusGeometry(15, 0.2, 16, 100), ringMat);
        ring1.rotation.x = Math.PI / 2; ring2.rotation.x = Math.PI / 3;
        scene.add(ring1); scene.add(ring2);
        meshes.push(ring1); meshes.push(ring2);
    }

    // --- ANIMATION LOOP ---
    function animate() {
        requestAnimationFrame(animate);

        // Rotate main cloud based on type
        if (shapeType === 'dna') {
            particles.rotation.y += 0.005;
            particles.rotation.z += 0.001;
        } else if (shapeType === 'atom') {
            particles.rotation.y -= 0.003;
            if (ring1) { ring1.rotation.z += 0.01; ring1.rotation.y += 0.005; }
            if (ring2) { ring2.rotation.z -= 0.015; ring2.rotation.x += 0.005; }
        } else if (shapeType === 'vortex') {
            particles.rotation.z -= 0.02; // Fast spin
        }

        renderer.render(scene, camera);
    }
    animate();
}

function initAll3D() {
    // Call with new shape types
    create3DScene('about-3d', 'dna');     // About: DNA Helix
    create3DScene('skills-3d', 'atom');   // Skills: Atomic Core
    create3DScene('contact-3d', 'vortex'); // Contact: Vortex
}

/* =========================================
   3. THEME SWITCHER (DEFAULT = PURPLE)
   ========================================= */
document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    // R = RED
    if (key === 'r') { document.body.classList.remove('green-mode'); document.body.classList.toggle('red-mode'); updateAllThemes(); }
    // G = GREEN
    else if (key === 'g') { document.body.classList.remove('red-mode'); document.body.classList.toggle('green-mode'); updateAllThemes(); }
    // N = PURPLE (Default Reset)
    else if (key === 'n') { document.body.classList.remove('red-mode'); document.body.classList.remove('green-mode'); updateAllThemes(); }
});

function updateAllThemes() {
    initParticles(); // Update 2D canvas
    update3DTheme(); // Update 3D meshes
}

function getThemeColor() {
    if (document.body.classList.contains('red-mode')) return '#F42C1D';
    if (document.body.classList.contains('green-mode')) return '#32CD32';
    return '#F1B7EA'; // Default Purple
}

function getThemeRGBA(opacity) {
    if (document.body.classList.contains('red-mode')) return `rgba(244, 44, 29, ${opacity})`;
    if (document.body.classList.contains('green-mode')) return `rgba(50, 205, 50, ${opacity})`;
    return `rgba(241, 183, 234, ${opacity})`;
}

function getThemeColorHex() {
    if (document.body.classList.contains('red-mode')) return 0xF42C1D;
    if (document.body.classList.contains('green-mode')) return 0x32CD32;
    return 0xF1B7EA;
}

function update3DTheme() {
    const color = getThemeColorHex();
    // Update points and wireframe materials
    meshes.forEach(mesh => {
        if (mesh.material.color) mesh.material.color.setHex(color);
    });
}

/* =========================================
   4. INIT & PARTICLES
   ========================================= */
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.project-card').forEach(c => {
        if (c.getAttribute('data-img')) c.style.backgroundImage = `url('${c.getAttribute('data-img')}')`;
    });
    initTiltCards();
    initAll3D();
});

const canvas = document.getElementById('neural-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;
let particlesArray;
if (canvas) { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
let mouse = { x: null, y: null, radius: 150 };
window.addEventListener('mousemove', (e) => {
    mouse.x = e.x; mouse.y = e.y;
    document.documentElement.style.setProperty('--cursor-x', e.clientX + 'px');
    document.documentElement.style.setProperty('--cursor-y', e.clientY + 'px');
});

class Particle {
    constructor(x, y, dx, dy, size) { this.x = x; this.y = y; this.dx = dx; this.dy = dy; this.size = size; }
    draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false); ctx.fillStyle = getThemeColor(); ctx.fill(); }
    update() {
        if (this.x > canvas.width || this.x < 0) this.dx = -this.dx; if (this.y > canvas.height || this.y < 0) this.dy = -this.dy;
        let dx = mouse.x - this.x; let dy = mouse.y - this.y; let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) { const f = (mouse.radius - dist) / mouse.radius; this.x -= (dx / dist) * f * 5; this.y -= (dy / dist) * f * 5; }
        this.x += this.dx; this.y += this.dy; this.draw();
    }
}
function initParticles() {
    if (!canvas || window.innerWidth < 768) return; particlesArray = [];
    let n = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < n; i++) particlesArray.push(new Particle(Math.random() * innerWidth, Math.random() * innerHeight, (Math.random() * 1.5) - 0.75, (Math.random() * 1.5) - 0.75, Math.random() * 2 + 1));
}
function animateParticles() {
    if (!canvas) return;
    if (document.body.classList.contains('low-power')) { ctx.clearRect(0, 0, innerWidth, innerHeight); requestAnimationFrame(animateParticles); return; }
    requestAnimationFrame(animateParticles); ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < particlesArray.length; i++) { particlesArray[i].update(); }
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let d = ((particlesArray[a].x - particlesArray[b].x) ** 2) + ((particlesArray[a].y - particlesArray[b].y) ** 2);
            if (d < (canvas.width / 7) * (canvas.height / 7)) {
                ctx.strokeStyle = getThemeRGBA(1 - (d / 20000)); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(particlesArray[a].x, particlesArray[a].y); ctx.lineTo(particlesArray[b].x, particlesArray[b].y); ctx.stroke();
            }
        }
    }
}
if (canvas) { initParticles(); animateParticles(); window.addEventListener('resize', () => { canvas.width = innerWidth; canvas.height = innerHeight; initParticles(); }); }

/* =========================================
   MISC
   ========================================= */
function initTiltCards() {
    document.querySelectorAll('.project-card').forEach(c => {
        c.addEventListener('mousemove', (e) => {
            const r = c.getBoundingClientRect(); c.style.setProperty('--card-x', `${e.clientX - r.left}px`); c.style.setProperty('--card-y', `${e.clientY - r.top}px`);
            c.style.transform = `perspective(1000px) rotateX(${((e.clientY - r.top - r.height / 2) / r.height / 2) * -10}deg) rotateY(${((e.clientX - r.left - r.width / 2) / r.width / 2) * 10}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        c.addEventListener('mouseleave', () => c.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)');
    });
}
document.getElementById('whatsappBtn')?.addEventListener('click', (e) => { e.preventDefault(); window.open('https://wa.me/916203899720', '_blank'); });