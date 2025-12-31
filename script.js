// Typing Effect
const textElement = document.getElementById('typed-text');
const word = "DESIGNER";
let index = 0;

function type() {
    if (index < word.length) {
        textElement.textContent += word.charAt(index);
        index++;
        setTimeout(type, 150);
    }
}

// Scroll Reveal
function reveal() {
    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach((element) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add("active");
        }
    });
}

// Modal Logic
const modal = document.getElementById("projectModal");
const modalImg = document.getElementById("modalImg");
const cards = document.querySelectorAll(".project-card");
const closeBtn = document.querySelector(".close");

cards.forEach(card => {
    card.onclick = function () {
        modal.style.display = "block";
        modalImg.src = this.getAttribute("data-img");
    }
});

closeBtn.onclick = () => modal.style.display = "none";
window.onclick = (event) => { if (event.target == modal) modal.style.display = "none"; }

// Initialize
window.addEventListener("scroll", reveal);
window.onload = () => {
    type();
    reveal();
};