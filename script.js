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

    if (span) {
        span.onclick = () => modal.style.display = "none";
    }
    window.onclick = (event) => { if (event.target == modal) modal.style.display = "none"; }
}

window.onload = () => { revealOnScroll(); };