/* REVEAL */
document.querySelectorAll(".reveal").forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add("active");
    }
});
window.addEventListener("scroll", () => {
    document.querySelectorAll(".reveal").forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 100) {
            el.classList.add("active");
        }
    });
});

/* TYPING */
const text = "VISHAL";
let i = 0;
function type() {
    if (i < text.length) {
        document.getElementById("typed-text").innerHTML += text.charAt(i);
        i++;
        setTimeout(type, 150);
    }
}
type();

/* SKILL BARS */
document.querySelectorAll(".progress").forEach(bar => {
    if (bar.getBoundingClientRect().top < window.innerHeight) {
        bar.style.width = bar.dataset.progress + "%";
    }
});

/* PROJECT MODAL */
const modal = document.getElementById("projectModal");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", () => {
        modal.style.display = "flex";
        modalImg.src = card.dataset.img;
    });
});

closeBtn.onclick = () => modal.style.display = "none";
modal.onclick = e => { if (e.target === modal) modal.style.display = "none"; };
