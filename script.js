// --- PRELOADER ---
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

// --- LASER SCROLL BAR ---
window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scrollTop / scrollHeight) * 100;
    const pBar = document.getElementById("scroll-progress");
    if (pBar) pBar.style.width = `${scrolled}%`;
});

// --- 3. NEW: MAGNETIC BUTTONS ---
const magnets = document.querySelectorAll('.magnet-btn');
magnets.forEach((magnet) => {
    magnet.addEventListener('mousemove', (e) => {
        const rect = magnet.getBoundingClientRect();
        // Calculate distance from center
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        // Move button slightly (Magnet effect)
        magnet.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    magnet.addEventListener('mouseleave', () => {
        // Snap back
        magnet.style.transform = 'translate(0, 0)';
    });
});

// --- HACKER TEXT ---
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*";
document.querySelectorAll("nav a, h2").forEach(element => {
    element.dataset.value = element.innerText;
    element.onmouseover = event => {
        let iterations = 0;
        const interval = setInterval(() => {
            event.target.innerText = event.target.innerText.split("").map((letter, index) => {
                if (index < iterations) return event.target.dataset.value[index];
                return letters[Math.floor(Math.random() * letters.length)];
            }).join("");
            if (iterations >= event.target.dataset.value.length) clearInterval(interval);
            iterations += 1 / 3;
        }, 30);
    }
});

// --- CUSTOM CURSOR ---
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

// --- 3D TILT ---
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

// SCROLL REVEAL & MODAL
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((reveal) => {
        if (reveal.getBoundingClientRect().top < window.innerHeight - 100) reveal.classList.add('active');
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