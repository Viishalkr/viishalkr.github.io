/* =========================================
   1. BOOT SEQUENCE & ONE-TIME SHUFFLE
   ========================================= */
const preloader = document.getElementById('preloader');
const bootText = document.getElementById('boot-text');
const body = document.body;

// 1. Text Shuffle Logic
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
function hackTextOnce(element) {
    if (!element) return;
    const originalText = element.innerText;
    let iterations = 0;
    const interval = setInterval(() => {
        element.innerText = originalText.split("").map((letter, index) => {
            if (index < iterations) return originalText[index];
            return letters[Math.floor(Math.random() * 26)];
        }).join("");
        if (iterations >= originalText.length) clearInterval(interval);
        iterations += 1 / 3; // Speed
    }, 30);
}

// 2. Typewriter Logic
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
    // TRIGGER SHUFFLE ONLY ONCE
    const mainTitle = document.querySelector('.main-title');
    hackTextOnce(mainTitle);
}

// 3. Fast Boot
if (preloader && bootText) {
    const logs = ["SYSTEM BOOT...", "ACCESS GRANTED."];
    let i = 0;
    const typeLine = () => {
        if (i < logs.length) {
            const line = document.createElement('div');
            line.classList.add('log-line');
            line.innerText = `> ${logs[i]}`;
            bootText.appendChild(line);
            setTimeout(typeLine, 400); // Fast log speed
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
   2. IMAGE LOADER (Fixes Thumbnails)
   ========================================= */
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.project-card').forEach(card => {
        const imgPath = card.getAttribute('data-img');
        if (imgPath) {
            card.style.backgroundImage = `url('${imgPath}')`;
        }
    });
});

/* =========================================
   3. PARTICLES (Fast & Snappy)
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
        ctx.fillStyle = '#F42C1D';
        ctx.fill();
    }
    update() {
        if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;

        // Mouse Interaction
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
            if (mouse.x < this.x && this.x < canvas.width - 10) this.x += 3;
            if (mouse.x > this.x && this.x > 10) this.x -= 3;
            if (mouse.y < this.y && this.y < canvas.height - 10) this.y += 3;
            if (mouse.y > this.y && this.y > 10) this.y -= 3;
        }

        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

function initParticles() {
    if (!canvas || window.innerWidth < 768) return;
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 10000; // Increased density
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = Math.random() * innerWidth;
        let y = Math.random() * innerHeight;
        let directionX = (Math.random() * 2) - 1; // Faster speed
        let directionY = (Math.random() * 2) - 1;
        particlesArray.push(new Particle(x, y, directionX, directionY, size));
    }
}

function connectParticles() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
            if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                opacityValue = 1 - (distance / 20000);
                ctx.strokeStyle = 'rgba(244, 44, 29,' + opacityValue + ')';
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
        ctx.clearRect(0, 0, innerWidth, innerHeight); // Clear canvas in eco mode
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
    window.addEventListener('resize', () => {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        initParticles();
    });
    initParticles();
    animateParticles();
}

/* =========================================
   4. RIGHT CLICK SECURITY
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
   5. ECO MODE TOGGLE
   ========================================= */
window.togglePerformance = function () {
    document.body.classList.toggle('low-power');
    const statusText = document.getElementById('perf-text');
    if (document.body.classList.contains('low-power')) {
        statusText.innerText = "ECO MODE";
        statusText.style.color = "yellow";
    } else {
        statusText.innerText = "ONLINE";
        statusText.style.color = "#F42C1D";
    }
};

/* =========================================
   6. SCROLL & NAV
   ========================================= */
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((reveal) => {
        if (reveal.getBoundingClientRect().top < window.innerHeight - 100) {
            reveal.classList.add('active');
        }
    });
    // Progress Bar
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scrollTop / scrollHeight) * 100;
    document.getElementById("scroll-progress").style.width = `${scrolled}%`;
}
window.addEventListener('scroll', revealOnScroll);

// HUD & Nav Click
document.querySelectorAll('nav a, .hud-point').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) window.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
    });
});

/* =========================================
   7. MODAL (GALLERY)
   ========================================= */
// Use simple single image logic for now
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