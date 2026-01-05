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
   2. THREE.JS ADVANCED KINETIC SHAPES
   ========================================= */
const meshes = [];

function create3DScene(containerId, shapeType) {
    const container = document.getElementById(containerId);
    if (!container || window.innerWidth < 900) return;

    const width = container.clientWidth;
    const height = container.clientHeight;
    const scene = new THREE.Scene();

    // Camera adjustments for specific shapes
    let camZ = 40;
    if (shapeType === 'lorenz') camZ = 60;
    if (shapeType === 'tunnel') camZ = 10;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 2000);
    camera.position.z = camZ;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const particleMaterial = new THREE.PointsMaterial({
        color: getThemeColorHex(),
        size: shapeType === 'lorenz' ? 0.4 : 0.25,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    const points = [];
    let geometry, particles;

    // --- 1. THE LIVING SPHERE (NOISE) ---
    if (shapeType === 'noiseSphere') {
        for (let i = 0; i < 4000; i++) {
            // Base Sphere
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);
            const r = 10;

            // Store original coordinates for animation
            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);
            points.push(new THREE.Vector3(x, y, z));
        }
    }

    // --- 2. THE CHAOS ENGINE (LORENZ ATTRACTOR) ---
    else if (shapeType === 'lorenz') {
        let x = 0.1, y = 0, z = 0;
        const sigma = 10, rho = 28, beta = 8 / 3;
        const dt = 0.01;

        for (let i = 0; i < 5000; i++) {
            const dx = sigma * (y - x) * dt;
            const dy = (x * (rho - z) - y) * dt;
            const dz = (x * y - beta * z) * dt;
            x += dx; y += dy; z += dz;
            points.push(new THREE.Vector3(x, y, z - 25)); // Center it
        }
    }

    // --- 3. THE HYPERSPACE TUNNEL ---
    else if (shapeType === 'tunnel') {
        for (let i = 0; i < 2000; i++) {
            const theta = Math.random() * Math.PI * 2;
            const r = 5 + Math.random() * 10; // Tunnel width
            const z = (Math.random() * 100) - 50; // Deep tunnel
            points.push(new THREE.Vector3(r * Math.cos(theta), r * Math.sin(theta), z));
        }
    }

    geometry = new THREE.BufferGeometry().setFromPoints(points);

    // Store original positions for Noise Sphere animation
    if (shapeType === 'noiseSphere') {
        geometry.userData = { originalPositions: JSON.parse(JSON.stringify(points)) };
    }

    particles = new THREE.Points(geometry, particleMaterial);
    scene.add(particles);
    meshes.push(particles);

    // --- ANIMATION LOOP ---
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;

        if (shapeType === 'noiseSphere') {
            // Ripple Effect Math
            const positions = particles.geometry.attributes.position.array;
            const originals = particles.geometry.userData.originalPositions;

            for (let i = 0; i < originals.length; i++) {
                const orig = originals[i];
                // Sine wave ripple based on Y position and Time
                const pulse = Math.sin((orig.y * 0.5) + (time * 2)) * 1.5;
                const scale = 1 + (pulse * 0.1);

                positions[i * 3] = orig.x * scale;
                positions[i * 3 + 1] = orig.y * scale;
                positions[i * 3 + 2] = orig.z * scale;
            }
            particles.geometry.attributes.position.needsUpdate = true;
            particles.rotation.y += 0.002;
        }

        else if (shapeType === 'lorenz') {
            particles.rotation.z += 0.005; // Slow spin to show complexity
            particles.rotation.y += 0.005;
        }

        else if (shapeType === 'tunnel') {
            const positions = particles.geometry.attributes.position.array;
            for (let i = 2; i < positions.length; i += 3) {
                positions[i] += 0.5; // Move towards camera
                if (positions[i] > 30) positions[i] = -50; // Reset to back
            }
            particles.geometry.attributes.position.needsUpdate = true;
            particles.rotation.z -= 0.002; // Slight spiral
        }

        renderer.render(scene, camera);
    }
    animate();
}

function initAll3D() {
    create3DScene('about-3d', 'noiseSphere'); // About: Living Sphere
    create3DScene('skills-3d', 'lorenz');     // Skills: Chaos Theory
    create3DScene('contact-3d', 'tunnel');    // Contact: Warp Drive
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

function updateAllThemes() {
    initParticles();
    update3DTheme();
}

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