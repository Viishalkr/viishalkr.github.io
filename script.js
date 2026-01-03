// --- 1. SYSTEM PRELOADER ---
const preloader = document.getElementById('preloader');
const progressBar = document.querySelector('.progress-bar-fill');
const percentText = document.querySelector('.percent');
const body = document.body;

if (preloader) {
    let load = 0;
    const interval = setInterval(() => {
        load += 1;
        if (load > 100) {
            clearInterval(interval);
            preloader.classList.add('loaded');
            body.classList.remove('no-scroll');
            setTimeout(() => { preloader.style.display = 'none'; }, 800);
        } else {
            progressBar.style.width = `${load}%`;
            percentText.innerText = `${load}%`;
        }
    }, 20);
}

// --- 2. LASER SCROLL PROGRESS ---
window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scrollTop / scrollHeight) * 100;
    const pBar = document.getElementById("scroll-progress");
    if (pBar) pBar.style.width = `${scrolled}%`;
});

// --- 3. MAGNETIC BUTTONS ---
const magnets = document.querySelectorAll('.magnet-btn');
magnets.forEach((magnet) => {
    magnet.addEventListener('mousemove', (e) => {
        const rect = magnet.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        magnet.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    magnet.addEventListener('mouseleave', () => {
        magnet.style.transform = 'translate(0, 0)';
    });
});

// --- 4. HACKER TEXT SCRAMBLE (REUSABLE) ---
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*";

function hackText(element) {
    // Only hack if not already hacking (prevents loop)
    if (element.getAttribute('data-hacking') === 'true') return;
    element.setAttribute('data-hacking', 'true');

    // Store original text if not stored
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

// Hover trigger
document.querySelectorAll("nav a, h2").forEach(element => {
    element.dataset.value = element.innerText; // Pre-store
    element.onmouseover = () => hackText(element);
});

// --- 5. CLICK SHOCKWAVE EFFECT ---
window.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    ripple.classList.add('ripple');
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    document.body.appendChild(ripple);

    // Remove after animation
    setTimeout(() => { ripple.remove(); }, 600);
});

// --- 6. CUSTOM CURSOR ---
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
    const interactables = document.querySelectorAll('a, .project-card, .skill-card, .edu-card, h2');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => cursorOutline.classList.add("hovered"));
        el.addEventListener('mouseleave', () => cursorOutline.classList.remove("hovered"));
    });
}

// --- 7. 3D TILT EFFECT ---
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

// --- 8. SET IMAGES ---
document.querySelectorAll('.project-card').forEach(card => {
    const imgPath = card.getAttribute('data-img');
    if (imgPath) card.style.backgroundImage = `url('${imgPath}')`;
});

// --- 9. SCROLL REVEAL & AUTO-DECRYPTION ---
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((reveal) => {
        if (reveal.getBoundingClientRect().top < window.innerHeight - 100) {
            reveal.classList.add('active');

            // Check if there is an h2 inside to hack
            const heading = reveal.querySelector('h2');
            if (heading) {
                // Small delay so it happens as it slides up
                setTimeout(() => hackText(heading), 200);
            }
        }
    });
}
window.addEventListener('scroll', revealOnScroll);
window.onload = () => { revealOnScroll(); };

const modal = document.getElementById("projectModal");
if (modal) {
    const modalImg = document.getElementById("modalImg");
    const projectCards = document.querySelectorAll(".project-card");
    const span = document.querySelector(".close");
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const imgPath = card.getAttribute('data-img');
            if (imgPath) { modal.style.display = "block"; modalImg.src = imgPath; }
        });
    });
    if (span) span.onclick = () => modal.style.display = "none";
    window.onclick = (event) => { if (event.target == modal) modal.style.display = "none"; }
}