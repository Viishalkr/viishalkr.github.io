/* =========================================
   1. GLOBAL VARIABLES & SETTINGS
   ========================================= */
const preloader = document.getElementById('preloader');
const bootText = document.getElementById('boot-text');
const ecoBtn = document.getElementById('ecoBtn');
const perfText = document.getElementById('perf-text');
const hudLinks = document.querySelectorAll('.hud-point');
const sections = document.querySelectorAll('section');
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

// State Variables
let isEcoMode = false;
let mouse = { x: null, y: null, radius: 150 };

/* =========================================
   2. CURSOR & INTERACTION LOGIC
   ========================================= */
window.addEventListener('mousemove', (e) => {
    // 1. Update Global Mouse Object (For Particles)
    mouse.x = e.x;
    mouse.y = e.y;

    // 2. Update CSS Variables (For Background Mask)
    document.documentElement.style.setProperty('--cursor-x', e.clientX + 'px');
    document.documentElement.style.setProperty('--cursor-y', e.clientY + 'px');

    // 3. Move Custom Cursor Elements (Visuals)
    if (cursorDot && cursorOutline) {
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top = `${e.clientY}px`;

        // Add a tiny delay to the outline for a "drag" feel
        cursorOutline.style.left = `${e.clientX}px`;
        cursorOutline.style.top = `${e.clientY}px`;
    }
});

// Hover "Lock-on" Effects
const interactiveElements = document.querySelectorAll('a, button, .project-card, .hud-card, .cyber-btn, .scramble-link');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
});

/* =========================================
   3. SIDE HUD & SCROLL TRACKING
   ========================================= */
window.addEventListener('scroll', () => {
    let currentSection = '';

    // Determine which section is currently in view
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        // Trigger when 1/3rd of the section is visible
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            currentSection = section.getAttribute('id');
        }
    });

    // Update Side HUD Classes
    hudLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(currentSection)) {
            link.classList.add('active');
        }
    });

    // Update Top Scroll Progress Bar
    const scrollTotal = document.documentElement.scrollTop;
    const heightTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTotal / heightTotal) * 100;
    const progressBar = document.getElementById('scroll-progress');
    if (progressBar) progressBar.style.width = scrollPercent + "%";
});

/* =========================================
   4. ECO MODE TOGGLE
   ========================================= */
if (ecoBtn) {
    ecoBtn.addEventListener('click', () => {
        isEcoMode = !isEcoMode;
        document.body.classList.toggle('low-power');

        if (isEcoMode) {
            ecoBtn.innerText = "[ ECO MODE: ON ]";
            if (perfText) perfText.innerText = "SAVING PWR";
            if (perfText) perfText.style.color = "#ffff00";
        } else {
            ecoBtn.innerText = "[ TOGGLE ECO MODE ]";
            if (perfText) perfText.innerText = "ONLINE";
            if (perfText) perfText.style.color = "var(--primary-red)";
            // Restart animation loop if it was paused
            animateParticles();
        }
    });
}

/* =========================================
   5. BOOT SEQUENCE & TEXT SCRAMBLE
   ========================================= */
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
    const logs = ["SYSTEM BOOT...", "LOADING ASSETS...", "INITIALIZING HUD...", "ACCESS GRANTED."];
    let i = 0;
    const typeLine = () => {
        if (i < logs.length) {
            const line = document.createElement('div');
            line.className = 'log-line';
            line.innerText = `> ${logs[i]}`;
            bootText.appendChild(line);
            // Auto scroll to bottom
            bootText.scrollTop = bootText.scrollHeight;
            setTimeout(typeLine, 400);
            i++;
        } else {
            setTimeout(() => {
                preloader.classList.add('loaded');
                document.body.classList.remove('no-scroll');
                startTypewriter();
                setTimeout(() => preloader.style.display = 'none', 800);
            }, 600);
        }
    };
    setTimeout(typeLine, 200);
}

/* =========================================
   6. THEME SWITCHER
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
   7. CANVAS PARTICLES SYSTEM
   ========================================= */
const canvas = document.getElementById('neural-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;
let particlesArray;

// Resize canvas correctly
if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Particle {
    constructor(x, y, dx, dy, size) {
        this.x = x; this.y = y;
        this.dx = dx; this.dy = dy;
        this.size = size;
    }
    draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = getThemeColor();
        ctx.fill();
    }
    update() {
        if (this.x > canvas.width || this.x < 0) this.dx = -this.dx;
        if (this.y > canvas.height || this.y < 0) this.dy = -this.dy;

        // Mouse Interaction
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
            const f = (mouse.radius - dist) / mouse.radius;
            // Push particles away from cursor
            this.x -= (dx / dist) * f * 5;
            this.y -= (dy / dist) * f * 5;
        }

        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}

function initParticles() {
    if (!canvas || window.innerWidth < 768) return;
    particlesArray = [];
    let n = (canvas.height * canvas.width) / 9000; // Density
    for (let i = 0; i < n; i++) {
        let size = Math.random() * 2 + 1;
        let x = Math.random() * (innerWidth - size * 2) + size;
        let y = Math.random() * (innerHeight - size * 2) + size;
        let dx = (Math.random() * 1.5) - 0.75;
        let dy = (Math.random() * 1.5) - 0.75;
        particlesArray.push(new Particle(x, y, dx, dy, size));
    }
}

function animateParticles() {
    if (!canvas) return;

    // STOP animation if Eco Mode is ON to save battery
    if (isEcoMode) {
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        return;
    }

    requestAnimationFrame(animateParticles);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }

    // Draw connecting lines
    connectParticles();
}

function connectParticles() {
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distSq = ((particlesArray[a].x - particlesArray[b].x) ** 2) + ((particlesArray[a].y - particlesArray[b].y) ** 2);
            if (distSq < (canvas.width / 7) * (canvas.height / 7)) {
                ctx.strokeStyle = getThemeRGBA(1 - (distSq / 20000));
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

// Init everything
document.addEventListener("DOMContentLoaded", () => {
    // Project Cards Image Loading
    document.querySelectorAll('.project-card').forEach(c => {
        if (c.getAttribute('data-img')) c.style.backgroundImage = `url('${c.getAttribute('data-img')}')`;
    });

    // Tilt Effect
    initTiltCards();

    // Initialize Particles
    if (canvas) {
        initParticles();
        animateParticles();
        window.addEventListener('resize', () => {
            canvas.width = innerWidth;
            canvas.height = innerHeight;
            initParticles();
        });
    }
});

/* =========================================
   8. MISC EFFECTS (TILT)
   ========================================= */
function initTiltCards() {
    document.querySelectorAll('.project-card').forEach(c => {
        c.addEventListener('mousemove', (e) => {
            const r = c.getBoundingClientRect();
            c.style.setProperty('--card-x', `${e.clientX - r.left}px`);
            c.style.setProperty('--card-y', `${e.clientY - r.top}px`);

            // 3D Tilt Math
            const xVal = ((e.clientX - r.left - r.width / 2) / r.width / 2) * 10;
            const yVal = ((e.clientY - r.top - r.height / 2) / r.height / 2) * -10;

            c.style.transform = `perspective(1000px) rotateX(${yVal}deg) rotateY(${xVal}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        c.addEventListener('mouseleave', () => c.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)');
    });
}

// WhatsApp Button
document.getElementById('whatsappBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.open('https://wa.me/916203899720', '_blank');
});