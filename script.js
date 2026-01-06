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
   2. TACTICAL CURSOR LOGIC
   ========================================= */
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    // Update CSS Variables for Grid Mask
    document.documentElement.style.setProperty('--cursor-x', e.clientX + 'px');
    document.documentElement.style.setProperty('--cursor-y', e.clientY + 'px');

    // Move Cursor Elements
    cursorDot.style.left = `${e.clientX}px`;
    cursorDot.style.top = `${e.clientY}px`;
    cursorOutline.style.left = `${e.clientX}px`;
    cursorOutline.style.top = `${e.clientY}px`;
});

// Add Hover Effect (Lock-on)
const interactiveElements = document.querySelectorAll('a, button, .project-card, .hud-card, .cyber-btn');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => { document.body.classList.add('hovering'); });
    el.addEventListener('mouseleave', () => { document.body.classList.remove('hovering'); });
});

/* =========================================
   3. THEME SWITCHER
   ========================================= */
document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    if (key === 'r') { document.body.classList.remove('green-mode'); document.body.classList.toggle('red-mode'); initParticles(); }
    else if (key === 'g') { document.body.classList.remove('red-mode'); document.body.classList.toggle('green-mode'); initParticles(); }
    else if (key === 'n') { document.body.classList.remove('red-mode'); document.body.classList.remove('green-mode'); initParticles(); }
});

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

/* =========================================
   4. INIT & PARTICLES
   ========================================= */
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.project-card').forEach(c => {
        if (c.getAttribute('data-img')) c.style.backgroundImage = `url('${c.getAttribute('data-img')}')`;
    });
    initTiltCards();
});
const canvas = document.getElementById('neural-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;
let particlesArray;
if (canvas) { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
let mouse = { x: null, y: null, radius: 150 };

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