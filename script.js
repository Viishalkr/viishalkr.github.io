/* =========================================
   1. BOOT SEQUENCE & ONE-TIME SHUFFLE
   ========================================= */
const preloader = document.getElementById('preloader');
const bootText = document.getElementById('boot-text');
const body = document.body;

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// 1. SCRAMBLE TEXT FUNCTION
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

// 2. NAV HOVER SCRAMBLE
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
            if (i < text.length) {
                greeting.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, 100);
            }
        }
        setTimeout(type, 500);
    }
    const mainTitle = document.querySelector('.main-title');
    scrambleText(mainTitle);
}

// 3. FAST BOOT
if (preloader && bootText) {
    const logs = ["SYSTEM BOOT...", "ACCESS GRANTED."];
    let i = 0;
    const typeLine = () => {
        if (i < logs.length) {
            const line = document.createElement('div');
            line.classList.add('log-line');
            line.innerText = `> ${logs[i]}`;
            bootText.appendChild(line);
            setTimeout(typeLine, 400);
            i++;
        } else {
            setTimeout(() => {
                preloader.classList.add('loaded');
                body.classList.remove('no-scroll');
                startTypewriter();
                setTimeout(() => preloader.style.display = 'none', 800);
            }, 600);
        }
    };
    setTimeout(typeLine, 200);
}

/* =========================================
   2. THEME SWITCHER (PRESS 'N')
   ========================================= */
document.addEventListener('keydown', (e) => {
    if (e.key === 'n' || e.key === 'N') {
        document.body.classList.toggle('purple-mode');

        // Force particle color update immediately
        // We do this by clearing the array so they redraw with new colors
        initParticles();
    }
});

function getThemeColor() {
    // Returns Neon Pink if purple mode is on, otherwise Crimson Red
    return document.body.classList.contains('purple-mode') ? '#F1B7EA' : '#F42C1D';
}

function getThemeRGBA(opacity) {
    return document.body.classList.contains('purple-mode')
        ? `rgba(241, 183, 234, ${opacity})` // Pink RGBA
        : `rgba(244, 44, 29, ${opacity})`;  // Red RGBA
}

/* =========================================
   3. IMAGE LOADER
   ========================================= */
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        const imgPath = card.getAttribute('data-img');
        if (imgPath) {
            card.style.backgroundImage = `url('${imgPath}')`;
        }
    });
});

/* =========================================
   4. PARTICLES (Reactive & Themed)
   ========================================= */
const canvas = document.getElementById('neural-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;
let particlesArray;

if (canvas) { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }

let mouse = { x: null, y: null, radius: 150 };

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

class Particle {
    constructor(x, y, directionX, directionY, size) {
        this.x = x; this.y = y;
        this.directionX = directionX; this.directionY = directionY;
        this.size = size;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = getThemeColor(); // Dynamic Color
        ctx.fill();
    }
    update() {
        if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;

        // Mouse Repulsion
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouse.radius - distance) / mouse.radius;
            const directionX = forceDirectionX * force * 5;
            const directionY = forceDirectionY * force * 5;
            this.x -= directionX;
            this.y -= directionY;
        }

        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

function initParticles() {
    if (!canvas || window.innerWidth < 768) return;
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = Math.random() * innerWidth;
        let y = Math.random() * innerHeight;
        let directionX = (Math.random() * 1.5) - 0.75;
        let directionY = (Math.random() * 1.5) - 0.75;
        particlesArray.push(new Particle(x, y, directionX, directionY, size));
    }
}

function connectParticles() {
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) ** 2) +
                ((particlesArray[a].y - particlesArray[b].y) ** 2);
            if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                let opacityValue = 1 - (distance / 20000);
                // Dynamic Line Color
                ctx.strokeStyle = getThemeRGBA(opacityValue);
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    if (!canvas) return;
    if (document.body.classList.contains('low-power')) {
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        requestAnimationFrame(animateParticles);
        return;
    }
    requestAnimationFrame(animateParticles);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connectParticles();
}

if (canvas) {
    initParticles();
    animateParticles();
    window.addEventListener('resize', () => {
        canvas.width = innerWidth; canvas.height = innerHeight;
        initParticles();
    });
}

/* =========================================
   5. RIGHT CLICK SECURITY
   ========================================= */
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    const securityScreen = document.getElementById('security-screen');
    if (securityScreen) {
        securityScreen.classList.add('active');
        setTimeout(() => {
            securityScreen.classList.remove('active');
        }, 2000);
    }
});

/* =========================================
   6. ECO MODE TOGGLE
   ========================================= */
document.getElementById('ecoBtn').addEventListener('click', function () {
    document.body.classList.toggle('low-power');
    const statusText = document.getElementById('perf-text');
    if (document.body.classList.contains('low-power')) {
        statusText.innerText = "ECO MODE";
        statusText.style.color = "yellow";
    } else {
        statusText.innerText = "ONLINE";
        statusText.style.color = getThemeColor(); // Dynamic text color
    }
});

/* =========================================
   7. SCROLL REVEAL
   ========================================= */
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((reveal) => {
        if (reveal.getBoundingClientRect().top < window.innerHeight - 100) {
            reveal.classList.add('active');
        }
    });
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scrollTop / scrollHeight) * 100;
    const pBar = document.getElementById("scroll-progress");
    if (pBar) pBar.style.width = `${scrolled}%`;
}
window.addEventListener('scroll', revealOnScroll);

// HUD & Nav
document.querySelectorAll('nav a, .hud-point').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) window.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
    });
});

/* =========================================
   8. MODAL LOGIC
   ========================================= */
const modal = document.getElementById("projectModal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalTools = document.getElementById("modalTools");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener('click', () => {
        modalTitle.innerText = card.getAttribute('data-title');
        modalDesc.innerText = card.getAttribute('data-desc');
        modalTools.innerText = card.getAttribute('data-tools');
        modalImg.src = card.getAttribute('data-img');
        modal.style.display = "block";
    });
});
if (closeBtn) closeBtn.onclick = () => modal.style.display = "none";
window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; };