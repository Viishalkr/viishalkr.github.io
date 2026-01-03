// --- SYSTEM PRELOADER LOGIC ---
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
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 800);
        } else {
            progressBar.style.width = `${load}%`;
            percentText.innerText = `${load}%`;
        }
    }, 20);
}

// --- HACKER TEXT SCRAMBLE EFFECT (NEW) ---
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*";

// Select targets: Nav links and Section Headings (h2)
document.querySelectorAll("nav a, h2").forEach(element => {
    // Save the original text so we can revert to it
    element.dataset.value = element.innerText;

    element.onmouseover = event => {
        let iterations = 0;

        const interval = setInterval(() => {
            // Map over the text and replace with random chars
            event.target.innerText = event.target.innerText.split("")
                .map((letter, index) => {
                    // If we have passed this index, show the real letter
                    if (index < iterations) {
                        return event.target.dataset.value[index];
                    }
                    // Otherwise show a random hacker character
                    return letters[Math.floor(Math.random() * letters.length)];
                })
                .join("");

            // Stop when all letters are revealed
            if (iterations >= event.target.dataset.value.length) {
                clearInterval(interval);
            }

            // Speed of decryption
            iterations += 1 / 3;
        }, 30); // Speed of frame update
    }
});

// CUSTOM CURSOR LOGIC
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

if (cursorDot && cursorOutline) {
    window.addEventListener("mousemove", (e) => {
        const posX = e.clientX;
        const posY = e.clientY;
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    const interactables = document.querySelectorAll('a, .project-card, .skill-card, .edu-card, h2');
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
// --- LASER SCROLL BAR LOGIC ---
window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scrollTop / scrollHeight) * 100;

    const progressBar = document.getElementById("scroll-progress");
    if (progressBar) {
        progressBar.style.width = `${scrolled}%`;
    }
});