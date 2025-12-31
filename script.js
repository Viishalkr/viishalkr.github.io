// 1. TYPING EFFECT
const textElement = document.getElementById('typed-text');
const word = "DESIGNER";
let charIndex = 0;

function typeEffect() {
    if (charIndex < word.length) {
        textElement.textContent += word.charAt(charIndex);
        charIndex++;
        setTimeout(typeEffect, 200); // Typing speed
    }
}

// 2. SCROLL REVEAL ANIMATION
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

// 3. PROJECT MODAL LOGIC
const modal = document.getElementById("projectModal");
const modalImg = document.getElementById("modalImg");
const projectCards = document.querySelectorAll(".project-card");
const span = document.querySelector(".close");

projectCards.forEach(card => {
    card.addEventListener('click', () => {
        modal.style.display = "block";
        // Use the data-img attribute to set the modal image
        modalImg.src = card.getAttribute('data-img');
    });
});

span.onclick = function () {
    modal.style.display = "none";
}

// Close modal if clicking outside image
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// INITIALIZE
window.onload = () => {
    typeEffect();
    revealOnScroll(); // Check if anything is already visible
};