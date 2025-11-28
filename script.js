// Small interactions:
// 1) Toggle mobile nav (if you use it)
// 2) Tiny wave animation placeholder (keeps earlier idea of 'wave' animation)

document.addEventListener('DOMContentLoaded', function () {
    // Mobile nav toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            // simple accessible toggle
            menuBtn.setAttribute('aria-expanded', navLinks.style.display === 'flex');
        });
    }

    // Example: simple subtle pulse on the "name" to attract attention
    const nameSpan = document.querySelector('.intro .name');
    if (nameSpan) {
        let grow = true;
        setInterval(() => {
            nameSpan.style.transform = grow ? 'translateY(-2px) scale(1.02)' : 'translateY(0) scale(1)';
            nameSpan.style.transition = 'transform 420ms ease';
            grow = !grow;
        }, 1500);
    }

    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});
