/* =========================================
   1. TERMINAL BOOT SEQUENCE & TYPEWRITER
   ========================================= */
const preloader = document.getElementById('preloader');
const bootText = document.getElementById('boot-text');
const body = document.body;

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
}

if (preloader && bootText) {
    const logs = [
        "INITIALIZING CORE...",
        "LOADING VISHAL_OS...",
        "DECRYPTING SECURE ASSETS...",
        "MOUNTING FILE SYSTEM...",
        "ESTABLISHING NEURAL LINK...",
        "ACCESS GRANTED.",
        "WELCOME, USER."
    ];
    let i = 0;
    const typeLine = () => {
        if (i < logs.length) {
            const line = document.createElement('div');
            line.classList.add('log-line');
            if (i === logs.length - 1) line.classList.add('success');
            line.innerText = `> ${logs[i]}`;
            bootText.appendChild(line);
            bootText.scrollTop = bootText.scrollHeight;
            setTimeout(typeLine, Math.random() * 300 + 100);
            i++;
        } else {
            setTimeout(() => {
                preloader.classList.add('loaded');
                body.classList.remove('no-scroll');
                startTypewriter();
                setTimeout(() => preloader.style.display = 'none', 800);
            }, 800);
        }
    };
    setTimeout(typeLine, 500);
}

/* =========================================
   2. PERFORMANCE MODE (ECO)
   ========================================= */
function togglePerformance() {
    const body = document.body;
    const statusText = document.getElementById('perf-text');
    body.classList.toggle('low-power');
    if (body.classList.contains('low-power')) {
        if (statusText) { statusText.innerText = "ECO MODE"; statusText.style.color = "yellow"; statusText.style.textShadow = "none"; }
        localStorage.setItem('perfMode', 'low');
    } else {
        if (statusText) { statusText.innerText = "HIGH PERF"; statusText.style.color = "#0f0"; statusText.style.textShadow = "0 0 5px #0f0"; }
        localStorage.setItem('perfMode', 'high');
    }
}
window.addEventListener('DOMContentLoaded', () => {
    const savedMode = localStorage.getItem('perfMode');
    if (savedMode === 'low') togglePerformance();
});

/* =========================================
   3. NEURAL NETWORK BACKGROUND (CANVAS)
   ========================================= */
const canvas = document.getElementById('neural-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;
let particlesArray;

if (canvas) { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }

let mouse = { x: null, y: null, radius: 150 };
window.addEventListener('mousemove', (event) => { mouse.x = event.x; mouse.y = event.y; });

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x; this.y = y; this.directionX = directionX; this.directionY = directionY; this.size = size; this.color = color;
    }
    draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false); ctx.fillStyle = '#d00000'; ctx.fill(); }
    update() {
        if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
        this.x += this.directionX; this.y += this.directionY;
        let dx = mouse.x - this.x; let dy = mouse.y - this.y; let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < canvas.width - 10) this.x += 2;
            if (mouse.x > this.x && this.x > 10) this.x -= 2;
            if (mouse.y < this.y && this.y < canvas.height - 10) this.y += 2;
            if (mouse.y > this.y && this.y > 10) this.y -= 2;
        }
        this.draw();
    }
}

function initParticles() {
    if (!canvas || window.innerWidth < 768) return;
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 0.5) - 0.25;
        let directionY = (Math.random() * 0.5) - 0.25;
        let color = '#d00000';
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
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
                ctx.strokeStyle = 'rgba(208, 0, 0,' + opacityValue + ')';
                ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(particlesArray[a].x, particlesArray[a].y); ctx.lineTo(particlesArray[b].x, particlesArray[b].y); ctx.stroke();
            }
        }
        let mouseDist = ((particlesArray[a].x - mouse.x) * (particlesArray[a].x - mouse.x)) + ((particlesArray[a].y - mouse.y) * (particlesArray[a].y - mouse.y));
        if (mouseDist < 20000) {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(particlesArray[a].x, particlesArray[a].y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
    }
}

function animateParticles() {
    if (!canvas || document.body.classList.contains('low-power') || window.innerWidth < 768) { requestAnimationFrame(animateParticles); return; }
    requestAnimationFrame(animateParticles); ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < particlesArray.length; i++) { particlesArray[i].update(); }
    connectParticles();
}

window.addEventListener('resize', () => { if (canvas && window.innerWidth > 768) { canvas.width = innerWidth; canvas.height = innerHeight; initParticles(); } });
if (canvas) { initParticles(); animateParticles(); }

/* =========================================
   4. NAVIGATION & SCROLL SPY
   ========================================= */
const navLinks = document.querySelectorAll('nav a, .hud-point, .back-to-top');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        if (targetId === '#') return;
        const targetSection = document.querySelector(targetId);
        if (!targetSection) return;
        document.body.classList.add('glitching');
        setTimeout(() => {
            window.scrollTo({ top: targetSection.offsetTop, behavior: 'auto' });
            setTimeout(() => { document.body.classList.remove('glitching'); }, 200);
        }, 300);
    });
});

const sections = document.querySelectorAll('section');
const hudPoints = document.querySelectorAll('.hud-point');
const observerOptions = { threshold: 0.3 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            hudPoints.forEach(point => point.classList.remove('active'));
            const id = entry.target.getAttribute('id');
            const activeLink = document.querySelector(`.hud-point[href="#${id}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });
}, observerOptions);
sections.forEach(section => observer.observe(section));

/* =========================================
   5. SECURITY BREACH PROTOCOL
   ========================================= */
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    const securityScreen = document.getElementById('security-screen');
    const body = document.body;
    if (securityScreen) {
        securityScreen.classList.add('active'); body.classList.add('glitching');
        setTimeout(() => { securityScreen.classList.remove('active'); body.classList.remove('glitching'); }, 2000);
    }
});

/* =========================================
   6. GALLERY SLIDER LOGIC
   ========================================= */
// DEFINE YOUR IMAGES HERE (Ensure files exist in /assets/work/)
const galleryData = {
    "PHOTOGRAPHY": ["assets/work/photo.jpg", "assets/work/photo2.jpg", "assets/work/photo3.jpg"],
    "GRAPHIC DESIGN": ["assets/work/design.jpg", "assets/work/design2.jpg", "assets/work/design3.jpg"],
    "VIDEO EDITING": ["assets/work/video.jpg", "assets/work/video2.jpg", "assets/work/video3.jpg"]
};

let currentImages = [];
let currentIndex = 0;
const modal = document.getElementById("projectModal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalTools = document.getElementById("modalTools");
const slideCounter = document.getElementById("slideCounter");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener('click', () => {
        const title = card.getAttribute('data-title');
        const desc = card.getAttribute('data-desc');
        const tools = card.getAttribute('data-tools');
        modalTitle.innerText = title;
        modalDesc.innerText = desc;
        modalTools.innerText = tools;
        if (galleryData[title]) { currentImages = galleryData[title]; } else { currentImages = [card.getAttribute('data-img')]; }
        currentIndex = 0;
        updateSlider();
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
    });
});

function updateSlider() {
    modalImg.style.opacity = 0;
    setTimeout(() => {
        modalImg.src = currentImages[currentIndex];
        slideCounter.innerText = `${currentIndex + 1} / ${currentImages.length}`;
        modalImg.style.opacity = 1;
    }, 200);
}
if (nextBtn) { nextBtn.onclick = () => { currentIndex = (currentIndex + 1) % currentImages.length; updateSlider(); }; }
if (prevBtn) { prevBtn.onclick = () => { currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length; updateSlider(); }; }

const closeModal = () => { modal.style.display = "none"; document.body.style.overflow = "auto"; };
if (closeBtn) closeBtn.onclick = closeModal;
window.onclick = (event) => { if (event.target == modal) closeModal(); };

/* =========================================
   7. INTERACTIVE EFFECTS (Grid, Text, Scroll)
   ========================================= */
document.addEventListener('mousemove', (e) => {
    if (document.body.classList.contains('low-power') || window.innerWidth < 768) return;
    const layers = document.querySelectorAll('.parallax-layer');
    layers.forEach(layer => {
        const speed = layer.getAttribute('data-speed');
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;
        layer.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
});

/* GRID SEARCHLIGHT TRACKER */
const bgGrid = document.querySelector('.bg-grid');
if (bgGrid) {
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX; const y = e.clientY;
        bgGrid.style.setProperty('--mouse-x', `${x}px`);
        bgGrid.style.setProperty('--mouse-y', `${y}px`);
    });
}

/* DECRYPTION TEXT OBSERVER */
const decryptNodes = document.querySelectorAll('.decrypt');
const decryptLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
function runDecryption(element) {
    if (element.classList.contains('revealed')) return;
    const finalValue = element.getAttribute('data-value');
    let iterations = 0;
    element.classList.add('revealed');
    element.innerText = finalValue;
    const interval = setInterval(() => {
        element.innerText = finalValue.split("").map((letter, index) => {
            if (index < iterations) return finalValue[index];
            return decryptLetters[Math.floor(Math.random() * decryptLetters.length)];
        }).join("");
        if (iterations >= finalValue.length) { clearInterval(interval); element.innerText = finalValue; }
        iterations += 1 / 2;
    }, 30);
}
const decryptObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(() => { runDecryption(entry.target); }, Math.random() * 500);
            decryptObserver.unobserve(entry.target);
        }
    });
}, { threshold: 1.0 });
decryptNodes.forEach(node => { node.innerText = "██████"; decryptObserver.observe(node); });

/* SCRAMBLE HEADINGS */
function hackText(element) {
    if (element.getAttribute('data-hacking') === 'true') return;
    element.setAttribute('data-hacking', 'true');
    if (!element.dataset.value) element.dataset.value = element.innerText;
    let iterations = 0;
    const interval = setInterval(() => {
        element.innerText = element.innerText.split("").map((letter, index) => {
            if (index < iterations) return element.dataset.value[index];
            return letters[Math.floor(Math.random() * letters.length)];
        }).join("");
        if (iterations >= element.dataset.value.length) { clearInterval(interval); element.setAttribute('data-hacking', 'false'); }
        iterations += 1 / 3;
    }, 30);
}
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((reveal) => {
        if (reveal.getBoundingClientRect().top < window.innerHeight - 100) {
            reveal.classList.add('active');
            const heading = reveal.querySelector('h2');
            if (heading) setTimeout(() => hackText(heading), 200);
        }
    });
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scrollTop / scrollHeight) * 100;
    const pBar = document.getElementById("scroll-progress");
    if (pBar) pBar.style.width = `${scrolled}%`;
}
window.addEventListener('scroll', revealOnScroll);
window.onload = () => { revealOnScroll(); };

// Cycle Hero Title Roles
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*"; // Defined globally here for simplicity
const heroTitle = document.getElementById('hero-title');
if (heroTitle) {
    const roles = ["DESIGNER", "DEVELOPER", "CREATOR", "ARCHITECT"];
    let roleIndex = 0;
    heroTitle.addEventListener('mouseover', () => {
        roleIndex = (roleIndex + 1) % roles.length;
        heroTitle.innerText = roles[roleIndex];
        heroTitle.dataset.value = roles[roleIndex];
        hackText(heroTitle);
    });
}

/* MAGNETIC BUTTONS */
const magnets = document.querySelectorAll('.magnet-btn');
magnets.forEach((magnet) => {
    magnet.addEventListener('mousemove', (e) => {
        const rect = magnet.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        magnet.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    magnet.addEventListener('mouseleave', () => { magnet.style.transform = 'translate(0, 0)'; });
});

/* CURSOR & CARDS 3D */
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");
if (cursorDot && cursorOutline) {
    window.addEventListener("mousemove", (e) => {
        if (window.innerWidth < 768) return;
        const posX = e.clientX; const posY = e.clientY;
        cursorDot.style.left = `${posX}px`; cursorDot.style.top = `${posY}px`;
        cursorOutline.animate({ left: `${posX}px`, top: `${posY}px` }, { duration: 500, fill: "forwards" });
    });
    const interactables = document.querySelectorAll('a, .project-card, .skill-card, .edu-card, h2, .cyber-btn, .return-btn, .holo-card, .hex-item');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => cursorOutline.classList.add("hovered"));
        el.addEventListener('mouseleave', () => cursorOutline.classList.remove("hovered"));
    });
}

const cards = document.querySelectorAll('.project-card, .skill-card, .edu-card, .holo-card');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        if (document.body.classList.contains('low-power') || window.innerWidth < 768) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; const y = e.clientY - rect.top;
        const centerX = rect.width / 2; const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -10; const rotateY = ((x - centerX) / centerX) * 10;
        card.style.transition = 'none'; card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.5s ease'; card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

document.querySelectorAll('.project-card').forEach(card => {
    const imgPath = card.getAttribute('data-img');
    if (imgPath) card.style.backgroundImage = `url('${imgPath}')`;
});

document.addEventListener('keydown', (e) => { if (e.key.toLowerCase() === 'm') { document.body.classList.toggle('matrix-mode'); } });