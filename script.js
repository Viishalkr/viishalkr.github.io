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
   2. THREE.JS MULTIPLE SCENES
   ========================================= */
const meshes = []; // Store meshes to animate them all

function create3DScene(containerId, geometryType) {
    const container = document.getElementById(containerId);
    if (!container || window.innerWidth < 900) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 25;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const material = new THREE.MeshBasicMaterial({
        color: getThemeColorHex(),
        wireframe: true,
        transparent: true,
        opacity: 0.8
    });

    let geometry;
    if (geometryType === 'knot') geometry = new THREE.TorusKnotGeometry(7, 2, 100, 16);
    else if (geometryType === 'sphere') geometry = new THREE.IcosahedronGeometry(9, 1);
    else if (geometryType === 'ring') geometry = new THREE.TorusGeometry(8, 2, 16, 100);

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    meshes.push(mesh);

    const mat2 = new THREE.MeshBasicMaterial({ color: getThemeColorHex(), wireframe: true, transparent: true, opacity: 0.3 });
    const geo2 = new THREE.IcosahedronGeometry(4, 0);
    const mesh2 = new THREE.Mesh(geo2, mat2);
    scene.add(mesh2);
    meshes.push(mesh2);

    function animate() {
        requestAnimationFrame(animate);
        mesh.rotation.x += 0.005; mesh.rotation.y += 0.005;
        mesh2.rotation.x -= 0.01; mesh2.rotation.y -= 0.01;
        renderer.render(scene, camera);
    }
    animate();
}

function initAll3D() {
    create3DScene('about-3d', 'knot');
    create3DScene('skills-3d', 'sphere');
    create3DScene('contact-3d', 'ring');
}

/* =========================================
   3. THEME SWITCHER (DEFAULT = PURPLE)
   ========================================= */
document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();

    // Press 'R' for RED Mode
    if (key === 'r') {
        document.body.classList.remove('green-mode');
        document.body.classList.toggle('red-mode');
        initParticles(); update3DTheme();
    }
    // Press 'G' for GREEN Mode
    else if (key === 'g') {
        document.body.classList.remove('red-mode');
        document.body.classList.toggle('green-mode');
        initParticles(); update3DTheme();
    }
    // Press 'N' (Optional Reset to Default Purple if you want)
    else if (key === 'n') {
        document.body.classList.remove('red-mode');
        document.body.classList.remove('green-mode');
        initParticles(); update3DTheme();
    }
});

function getThemeColor() {
    if (document.body.classList.contains('red-mode')) return '#F42C1D'; // Crimson
    if (document.body.classList.contains('green-mode')) return '#32CD32'; // Green
    return '#F1B7EA'; // Default Purple
}

function getThemeRGBA(opacity) {
    if (document.body.classList.contains('red-mode')) return `rgba(244, 44, 29, ${opacity})`;
    if (document.body.classList.contains('green-mode')) return `rgba(50, 205, 50, ${opacity})`;
    return `rgba(241, 183, 234, ${opacity})`; // Default Purple
}

function getThemeColorHex() {
    if (document.body.classList.contains('red-mode')) return 0xF42C1D;
    if (document.body.classList.contains('green-mode')) return 0x32CD32;
    return 0xF1B7EA; // Default Purple
}

function update3DTheme() {
    const color = getThemeColorHex();
    meshes.forEach(mesh => mesh.material.color.setHex(color));
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
    if (!canvas) return; requestAnimationFrame(animateParticles); ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < particlesArray.length; i++) particlesArray[i].update();
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