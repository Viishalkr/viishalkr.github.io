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
   2. THREE.JS RESPONSIVE CYBER STRUCTURES
   ========================================= */
const meshes = []; // Store meshes for theme updates
// Mouse tracking for 3D
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

// Window center
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
});

function create3DScene(containerId, shapeType) {
    const container = document.getElementById(containerId);
    if (!container || window.innerWidth < 900) return;

    const width = container.clientWidth;
    const height = container.clientHeight;
    const scene = new THREE.Scene();

    // Zoom camera out for "Bigger" feel
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 2000);
    camera.position.z = 45;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // High-Tech Wireframe Material
    const material = new THREE.MeshBasicMaterial({
        color: getThemeColorHex(),
        wireframe: true,
        transparent: true,
        opacity: 0.6 // Slightly subtle so it doesn't distract
    });

    const coreMaterial = new THREE.MeshBasicMaterial({
        color: getThemeColorHex(),
        wireframe: true,
        transparent: true,
        opacity: 0.9 // Brighter core
    });

    let mainMesh, innerMesh, ringMesh;

    // --- 1. THE NEURAL LATTICE (About) ---
    // A complex Geodesic Sphere (Icosahedron with detail)
    if (shapeType === 'lattice') {
        // High detail Icosahedron (2 subdivisions)
        const geometry = new THREE.IcosahedronGeometry(13, 1);
        mainMesh = new THREE.Mesh(geometry, material);

        const innerGeo = new THREE.IcosahedronGeometry(6, 0);
        innerMesh = new THREE.Mesh(innerGeo, coreMaterial);

        mainMesh.add(innerMesh); // Group them
        scene.add(mainMesh);
        meshes.push(mainMesh); meshes.push(innerMesh);
    }

    // --- 2. THE ORBITAL ENGINE (Skills) ---
    // Multiple Torus rings spinning on different axes
    else if (shapeType === 'engine') {
        // Ring 1
        mainMesh = new THREE.Mesh(new THREE.TorusGeometry(10, 0.5, 16, 100), coreMaterial);

        // Ring 2 (Larger)
        innerMesh = new THREE.Mesh(new THREE.TorusGeometry(14, 0.2, 16, 100), material);

        // Ring 3 (Largest)
        ringMesh = new THREE.Mesh(new THREE.TorusGeometry(18, 0.2, 16, 100), material);

        scene.add(mainMesh);
        scene.add(innerMesh);
        scene.add(ringMesh);

        meshes.push(mainMesh); meshes.push(innerMesh); meshes.push(ringMesh);
    }

    // --- 3. THE VOID GATEWAY (Contact) ---
    // A dense Torus Knot
    else if (shapeType === 'gateway') {
        const geometry = new THREE.TorusKnotGeometry(9, 3, 150, 20); // High segments for smoothness
        mainMesh = new THREE.Mesh(geometry, material);

        // Inner core
        const innerGeo = new THREE.SphereGeometry(4, 16, 16);
        innerMesh = new THREE.Mesh(innerGeo, coreMaterial);

        scene.add(mainMesh);
        scene.add(innerMesh);
        meshes.push(mainMesh); meshes.push(innerMesh);
    }

    // --- RESPONSIVE ANIMATION LOOP ---
    function animate() {
        requestAnimationFrame(animate);

        // Smooth Mouse Follow Logic
        targetX = mouseX * 0.001;
        targetY = mouseY * 0.001;

        if (shapeType === 'lattice') {
            // Rotates slowly automatically
            mainMesh.rotation.y += 0.002;
            // TILTS towards mouse
            mainMesh.rotation.x += 0.05 * (targetY - mainMesh.rotation.x);
            mainMesh.rotation.z += 0.05 * (targetX - mainMesh.rotation.z);

            // Inner mesh spins opposite
            innerMesh.rotation.y -= 0.01;
        }
        else if (shapeType === 'engine') {
            // Rings spin on different axes
            mainMesh.rotation.x += 0.01;
            mainMesh.rotation.y += 0.05 * (targetX - mainMesh.rotation.y); // Mouse control Y axis

            innerMesh.rotation.y += 0.005;
            innerMesh.rotation.x += 0.05 * (targetY - innerMesh.rotation.x); // Mouse control X axis

            ringMesh.rotation.x -= 0.002;
            ringMesh.rotation.z -= 0.002;
        }
        else if (shapeType === 'gateway') {
            // Complex knot rotation
            mainMesh.rotation.z += 0.005;
            // The knot "looks" at the mouse
            mainMesh.rotation.x += 0.05 * (targetY - mainMesh.rotation.x);
            mainMesh.rotation.y += 0.05 * (targetX - mainMesh.rotation.y);

            // Pulse effect scale
            const time = Date.now() * 0.001;
            innerMesh.scale.setScalar(1 + Math.sin(time) * 0.2);
        }

        renderer.render(scene, camera);
    }
    animate();
}

function initAll3D() {
    create3DScene('about-3d', 'lattice');   // About: Geodesic Sphere
    create3DScene('skills-3d', 'engine');   // Skills: Gyro Engine
    create3DScene('contact-3d', 'gateway'); // Contact: Torus Knot
}

/* =========================================
   3. THEME SWITCHER
   ========================================= */
document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    if (key === 'r') { document.body.classList.remove('green-mode'); document.body.classList.toggle('red-mode'); updateAllThemes(); }
    else if (key === 'g') { document.body.classList.remove('red-mode'); document.body.classList.toggle('green-mode'); updateAllThemes(); }
    else if (key === 'n') { document.body.classList.remove('red-mode'); document.body.classList.remove('green-mode'); updateAllThemes(); }
});
function updateAllThemes() { initParticles(); update3DTheme(); }
function getThemeColor() {
    if (document.body.classList.contains('red-mode')) return '#F42C1D';
    if (document.body.classList.contains('green-mode')) return '#32CD32';
    return '#F1B7EA';
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
    meshes.forEach(mesh => { if (mesh.material && mesh.material.color) mesh.material.color.setHex(color); });
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