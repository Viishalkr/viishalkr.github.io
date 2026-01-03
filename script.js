// --- SYSTEM PRELOADER LOGIC ---
const preloader = document.getElementById('preloader');
const progressBar = document.querySelector('.progress-bar-fill');
const percentText = document.querySelector('.percent');
const body = document.body;

if (preloader) {
    let load = 0;
    // Simulate loading time (2.5 seconds total)
    const interval = setInterval(() => {
        load += 1;

        if (load > 100) {
            clearInterval(interval);
            // Hide preloader
            preloader.classList.add('loaded');
            // Re-enable scrolling
            body.classList.remove('no-scroll');
            // Remove preloader from DOM after fade out
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 800);
        } else {
            // Update UI
            progressBar.style.width = `${load}%`;
            percentText.innerText = `${load}%`;
        }
    }, 20); // Speed of loading (lower = faster)
}

// CUSTOM CURSOR LOGIC
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

if (cursorDot && cursorOutline) {
    window.addEventListener("mousemove", (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Dot moves instantly
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Outline moves with delay
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Add hover effect to links, cards, buttons
    const interactables = document.querySelectorAll('a, .project-card, .skill-card, .edu-card');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => cursorOutline.classList.add("hovered"));
        el.addEventListener('mouseleave', () => cursorOutline.classList.remove("hovered"));
    });
}

// --- 3D TILT EFFECT LOGIC ---
const cards = document.querySelectorAll('.project-card, .skill-card, .edu-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calculate center
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Rotate math (Max 10 degrees)
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        // Remove transition for instant follow
        card.style.transition = 'none';
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        // Add transition back for smooth reset
        card.style.transition = 'transform 0.5s ease';
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

// SCROLL REVEAL
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;
    const elementVisible = 100;

    reveals.forEach((reveal) => {
        const elementTop = reveal.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');
        }
    });
}
window.addEventListener('scroll', revealOnScroll);

// MODAL LOGIC
const modal = document.getElementById("projectModal");
if (modal) {
    const modalImg = document.getElementById("modalImg");
    const projectCards = document.querySelectorAll(".project-card");
    const span = document.querySelector(".close");

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const imgPath = card.getAttribute('data-img');
            if (imgPath) {
                modal.style.display = "block";
                modalImg.src = imgPath;
            }
        });
    });

    if (span) { span.onclick = () => modal.style.display = "none"; }
    window.onclick = (event) => { if (event.target == modal) modal.style.display = "none"; }
}

window.onload = () => { revealOnScroll(); };