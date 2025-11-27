

(() => {
    'use strict';

    document.addEventListener('DOMContentLoaded', () => {

        // 1) Wave animation (safe, single interval)
        (function setupWaveAnimation() {
            const waveEl = document.querySelector('.wave');
            if (!waveEl) return;
            if (!waveEl.dataset.waveInterval) {
                const id = setInterval(() => {
                    waveEl.classList.toggle('wave-animate');
                }, 1000);
                waveEl.dataset.waveInterval = String(id);
            }
        })();

        // 2) Smooth scrolling for internal anchors
        (function enableSmoothScroll() {
            document.addEventListener('click', (ev) => {
                const a = ev.target.closest('a[href^="#"]');
                if (!a) return;
                const href = a.getAttribute('href');
                if (!href || href === '#') return;
                const target = document.querySelector(href);
                if (!target) return;
                ev.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                history.replaceState(null, '', href);
            });
        })();

        // 3) Header class toggle on scroll
        (function headerOnScroll() {
            const header = document.querySelector('header');
            if (!header) return;
            const THRESH = 50;
            const onScroll = () => {
                header.classList.toggle('is-scrolled', window.scrollY > THRESH);
            };
            onScroll();
            window.addEventListener('scroll', onScroll, { passive: true });
        })();

        // 4) Reveal-on-scroll (use .reveal and CSS .reveal.revealed)
        (function revealOnScroll() {
            const items = document.querySelectorAll('.reveal');
            if (!items.length || !window.IntersectionObserver) return;
            const io = new IntersectionObserver((entries, obs) => {
                entries.forEach(e => {
                    if (e.isIntersecting) {
                        e.target.classList.add('revealed');
                        obs.unobserve(e.target);
                    }
                });
            }, { threshold: 0.15 });
            items.forEach(el => io.observe(el));
        })();

        // 5) Optional: mobile nav toggle (requires .nav-toggle and .nav-menu)
        (function mobileNavToggle() {
            const toggle = document.querySelector('.nav-toggle');
            const menu = document.querySelector('.nav-menu');
            if (!toggle || !menu) return;
            toggle.addEventListener('click', () => {
                menu.classList.toggle('open');
                toggle.classList.toggle('open');
            });
            menu.addEventListener('click', (ev) => {
                const a = ev.target.closest('a[href^="#"]');
                if (!a) return;
                menu.classList.remove('open');
                toggle.classList.remove('open');
            });
        })();

    }); // DOMContentLoaded
})();
