// --- 1. TERMINAL BOOT SEQUENCE ---
const preloader = document.getElementById('preloader');
const bootText = document.getElementById('boot-text');
const body = document.body;

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
                setTimeout(() => preloader.style.display = 'none', 800);
            }, 800);
        }
    };
    setTimeout(typeLine, 500);
}

// --- 2. PARALLAX BACKGROUND ---
document.addEventListener('mousemove', (e) => {
    const layers = document.querySelectorAll('.parallax-layer');
    layers.forEach(layer => {
        const speed = layer.getAttribute('data-speed');
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;
        layer.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
});

// --- 3. SIDE HUD SCROLL SPY ---
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

// --- 4. FLOATING DATA PARTICLES ---
const particleContainer = document.getElementById('particles');
const particleChars = ['0', '1', 'A', 'B', 'X', 'Y', '99', 'FF', '00'];
function createParticle() {
    if (!particleContainer) return;
    const particle = document.createElement('div');
    particle.classList.add('particle');
    const randomChar = particleChars[Math.floor(Math.random() * particleChars.length)];
    particle.innerText = randomChar;
    particle.style.left = Math.random() * 100 + 'vw';
    const duration = Math.random() * 5 + 5;
    const size = Math.random() * 10 + 8;
    particle.style.fontSize = `${size}px`;
    particle.style.animationDuration = `${duration}s`;
    particleContainer.appendChild(particle);
    setTimeout(() => { particle.remove(); }, duration * 1000);
}
setInterval(createParticle, 200);

// --- 5. MISSION REPORT MODAL LOGIC ---
const modal = document.getElementById("projectModal");
if (modal) {
    const modalImg = document.getElementById("modalImg");
    const modalTitle = document.getElementById("modalTitle");
    const modalDesc = document.getElementById("modalDesc");
    const modalTools = document.getElementById("modalTools");
    const span = document.querySelector(".close");

    document.querySelectorAll(".project-card").forEach(card => {
        card.addEventListener('click', () => {
            const imgPath = card.getAttribute('data-img');
            const title = card.getAttribute('data-title');
            const desc = card.getAttribute('data-desc');
            const tools = card.getAttribute('data-tools');
            modalImg.src = imgPath;
            modalTitle.innerText = title;
            modalDesc.innerText = desc;
            modalTools.innerText = tools;
            modal.style.display = "block";
            document.body.style.overflow = "hidden";
        });
    });
    const closeModal = () => { modal.style.display = "none"; document.body.style.overflow = "auto"; };
    if (span) span.onclick = closeModal;
    window.onclick = (event) => { if (event.target == modal) closeModal(); }
}

// --- 6. LEGACY INTERACTIONS (MAGNET, HACKER TEXT, CURSOR, TILT) ---
window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scrollTop / scrollHeight) * 100;
    const pBar = document.getElementById("scroll-progress");
    if (pBar) pBar.style.width = `${scrolled}%`;
});

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

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*";
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
        if (iterations >= element.dataset.value.length) {
            clearInterval(interval);
            element.setAttribute('data-hacking', 'false');
        }
        iterations += 1 / 3;
    }, 30);
}
document.querySelectorAll("nav a, h2").forEach(element => {
    element.dataset.value = element.innerText;
    element.onmouseover = () => hackText(element);
});

window.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    ripple.classList.add('ripple');
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    document.body.appendChild(ripple);
    setTimeout(() => { ripple.remove(); }, 600);
});

const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");
if (cursorDot && cursorOutline) {
    window.addEventListener("mousemove", (e) => {
        const posX = e.clientX;
        const posY = e.clientY;
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
        cursorOutline.animate({ left: `${posX}px`, top: `${posY}px` }, { duration: 500, fill: "forwards" });
    });
    const interactables = document.querySelectorAll('a, .project-card, .skill-card, .edu-card, h2, .cyber-btn, .return-btn');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => cursorOutline.classList.add("hovered"));
        el.addEventListener('mouseleave', () => cursorOutline.classList.remove("hovered"));
    });
}

const cards = document.querySelectorAll('.project-card, .skill-card, .edu-card');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;
        card.style.transition = 'none';
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.5s ease';
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

document.querySelectorAll('.project-card').forEach(card => {
    const imgPath = card.getAttribute('data-img');
    if (imgPath) card.style.backgroundImage = `url('${imgPath}')`;
});

document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'm') {
        document.body.classList.toggle('matrix-mode');
    }
});

function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((reveal) => {
        if (reveal.getBoundingClientRect().top < window.innerHeight - 100) {
            reveal.classList.add('active');
            const heading = reveal.querySelector('h2');
            if (heading) setTimeout(() => hackText(heading), 200);
        }
    });
}
window.addEventListener('scroll', revealOnScroll);
window.onload = () => { revealOnScroll(); };