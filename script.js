/* =========================================
   1. TERMINAL BOOT SEQUENCE (Simplified)
   ========================================= */
const preloader = document.getElementById('preloader');
const bootText = document.getElementById('boot-text');
const body = document.body;

function startTypewriter() {
    const greeting = document.querySelector('.greeting');
    if (greeting) {
        // Simple fade in or direct set, no typing loop if you want it super clean.
        // But typing "Hii i'm VISHAL" is fine, just no random scrambling.
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
    // Faster, cleaner boot logs
    const logs = [
        "SYSTEM READY...",
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
            setTimeout(typeLine, 300);
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
   2. NEURAL NETWORK BACKGROUND
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
    draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false); ctx.fillStyle = '#F42C1D'; ctx.fill(); }
    update() {
        if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
        this.x += this.directionX; this.y += this.directionY;
        this.draw();
    }
}

function initParticles() {
    if (!canvas || window.innerWidth < 768) return;
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 15000; // Less particles for cleaner look
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = Math.random() * innerWidth;
        let y = Math.random() * innerHeight;
        let directionX = (Math.random() * 0.4) - 0.2;
        let directionY = (Math.random() * 0.4) - 0.2;
        particlesArray.push(new Particle(x, y, directionX, directionY, size, '#F42C1D'));
    }
}

function connectParticles() {
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) ** 2) + ((particlesArray[a].y - particlesArray[b].y) ** 2);
            if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                let opacityValue = 1 - (distance / 20000);
                ctx.strokeStyle = 'rgba(174, 25, 24,' + opacityValue + ')';
                ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(particlesArray[a].x, particlesArray[a].y); ctx.lineTo(particlesArray[b].x, particlesArray[b].y); ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    if (!canvas) return;
    requestAnimationFrame(animateParticles); ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < particlesArray.length; i++) { particlesArray[i].update(); }
    connectParticles();
}

window.addEventListener('resize', () => { if (canvas && window.innerWidth > 768) { canvas.width = innerWidth; canvas.height = innerHeight; initParticles(); } });
if (canvas) { initParticles(); animateParticles(); }

/* =========================================
   3. NAVIGATION & SCROLL
   ========================================= */
const navLinks = document.querySelectorAll('nav a, .hud-point, .back-to-top');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        if (targetId === '#') return;
        const targetSection = document.querySelector(targetId);
        if (!targetSection) return;
        window.scrollTo({ top: targetSection.offsetTop, behavior: 'smooth' });
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
   4. MODAL LOGIC (Unchanged)
   ========================================= */
const galleryData = {
    "PHOTOGRAPHY": ["assets/work/photo.jpg"],
    "GRAPHIC DESIGN": ["assets/work/design.jpg"],
    "VIDEO EDITING": ["assets/work/video.jpg"]
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
        if (slideCounter) slideCounter.innerText = `${currentIndex + 1} / ${currentImages.length}`;
        modalImg.style.opacity = 1;
    }, 200);
}
if (nextBtn) { nextBtn.onclick = () => { currentIndex = (currentIndex + 1) % currentImages.length; updateSlider(); }; }
if (prevBtn) { prevBtn.onclick = () => { currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length; updateSlider(); }; }

const closeModal = () => { modal.style.display = "none"; document.body.style.overflow = "auto"; };
if (closeBtn) closeBtn.onclick = closeModal;
window.onclick = (event) => { if (event.target == modal) closeModal(); };

/* =========================================
   5. SIMPLE REVEAL ANIMATION (No Text Shuffle)
   ========================================= */
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((reveal) => {
        if (reveal.getBoundingClientRect().top < window.innerHeight - 100) {
            reveal.classList.add('active');
        }
    });
    // Scroll Progress Bar
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scrollTop / scrollHeight) * 100;
    const pBar = document.getElementById("scroll-progress");
    if (pBar) pBar.style.width = `${scrolled}%`;
}
window.addEventListener('scroll', revealOnScroll);
window.onload = () => { revealOnScroll(); };

// Cycle Hero Title (Clean, no glitch)
const heroTitle = document.getElementById('hero-title');
if (heroTitle) {
    const roles = ["DESIGNER", "DEVELOPER", "CREATOR", "ARCHITECT"];
    let roleIndex = 0;
    heroTitle.addEventListener('mouseover', () => {
        roleIndex = (roleIndex + 1) % roles.length;
        heroTitle.innerText = roles[roleIndex];
    });
}

// Reveal Decrypt text immediately (No shuffling)
const decryptNodes = document.querySelectorAll('.decrypt');
decryptNodes.forEach(node => {
    node.innerText = node.getAttribute('data-value');
    node.classList.add('revealed');
});

// Magnetic Buttons
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

/* CURSOR & 3D TILT */
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");
if (cursorDot && cursorOutline) {
    window.addEventListener("mousemove", (e) => {
        const posX = e.clientX; const posY = e.clientY;
        cursorDot.style.left = `${posX}px`; cursorDot.style.top = `${posY}px`;
        cursorOutline.style.left = `${posX}px`; cursorOutline.style.top = `${posY}px`;
    });
    const interactables = document.querySelectorAll('a, .project-card, .hex-item, button');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => cursorOutline.classList.add("hovered"));
        el.addEventListener('mouseleave', () => cursorOutline.classList.remove("hovered"));
    });
}