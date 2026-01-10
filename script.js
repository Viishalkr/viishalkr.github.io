/* =========================================
   1. GLOBAL VARIABLES & SETTINGS
   ========================================= */
const preloader = document.getElementById('preloader');
const bootText = document.getElementById('boot-text');
const ecoBtn = document.getElementById('ecoBtn');
const perfText = document.getElementById('perf-text');
const hudLinks = document.querySelectorAll('.hud-point');
const sections = document.querySelectorAll('section');
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

let isEcoMode = false;
let mouse = { x: null, y: null, radius: 150 };

/* =========================================
   2. CURSOR & CLICK LOGIC
   ========================================= */
if (window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
        document.documentElement.style.setProperty('--cursor-x', e.clientX + 'px');
        document.documentElement.style.setProperty('--cursor-y', e.clientY + 'px');
        if (cursorDot && cursorOutline) {
            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;
            cursorOutline.style.left = `${e.clientX}px`;
            cursorOutline.style.top = `${e.clientY}px`;
        }
    });

    const interactiveElements = document.querySelectorAll('a, button, .project-card, .hud-card, .cyber-btn, .scramble-link');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
    });
}

// DOUBLE RIPPLE
window.addEventListener('click', (e) => {
    const createRipple = (delay) => {
        setTimeout(() => {
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            ripple.style.left = `${e.clientX}px`;
            ripple.style.top = `${e.clientY}px`;
            document.body.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        }, delay);
    };
    createRipple(0);
    createRipple(150);
});

// RIGHT CLICK SECURITY
window.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    const msg = document.createElement('div');
    msg.className = 'security-popup';
    msg.innerText = "⚠️ SYSTEM SECURE // ACCESS DENIED";
    msg.style.left = `${e.clientX}px`;
    msg.style.top = `${e.clientY}px`;
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 1500);
});

/* =========================================
   3. SIDE HUD & SCROLL REVEAL
   ========================================= */
window.addEventListener('scroll', () => {
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            currentSection = section.getAttribute('id');
        }
    });
    hudLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(currentSection)) {
            link.classList.add('active');
        }
    });
    const scrollTotal = document.documentElement.scrollTop;
    const heightTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTotal / heightTotal) * 100;
    const progressBar = document.getElementById('scroll-progress');
    if (progressBar) progressBar.style.width = scrollPercent + "%";
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* =========================================
   4. ECO MODE & BOOT
   ========================================= */
if (ecoBtn) {
    ecoBtn.addEventListener('click', () => {
        isEcoMode = !isEcoMode;
        document.body.classList.toggle('low-power');
        if (isEcoMode) {
            ecoBtn.innerText = "[ ECO MODE: ON ]";
            if (perfText) perfText.innerText = "SAVING PWR";
            if (perfText) perfText.style.color = "#ffff00";
        } else {
            ecoBtn.innerText = "[ TOGGLE ECO MODE ]";
            if (perfText) perfText.innerText = "ONLINE";
            if (perfText) perfText.style.color = "var(--primary-red)";
            animateParticles();
        }
    });
}

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
function scrambleText(element) {
    if (!element) return;
    const originalText = element.dataset.value || element.innerText;
    if (!element.dataset.value) element.dataset.value = originalText;
    let iterations = 0;
    const interval = setInterval(() => {
        element.innerText = originalText.split("").map((letter, index) => {
            if (index < iterations) return originalText[index];
            return letters[Math.floor(Math.random() * 26)];
        }).join("");
        if (iterations >= originalText.length) clearInterval(interval);
        iterations += 1 / 3;
    }, 30);
}
document.querySelectorAll('.scramble-link').forEach(link => link.addEventListener('mouseover', () => scrambleText(link)));

function startTypewriter() {
    const greeting = document.querySelector('.greeting');
    if (greeting) {
        const text = "hii i'm VISHAL";
        greeting.innerHTML = "";
        let i = 0;
        function type() { if (i < text.length) { greeting.innerHTML += text.charAt(i); i++; setTimeout(type, 100); } }
        setTimeout(type, 500);
    }
    scrambleText(document.querySelector('.main-title'));
}

if (preloader && bootText) {
    const logs = ["SYSTEM BOOT...", "LOADING ASSETS...", "INITIALIZING HUD...", "ACCESS GRANTED."];
    let i = 0;
    const typeLine = () => {
        if (i < logs.length) {
            const line = document.createElement('div'); line.className = 'log-line'; line.innerText = `> ${logs[i]}`;
            bootText.appendChild(line); bootText.scrollTop = bootText.scrollHeight; setTimeout(typeLine, 400); i++;
        } else {
            setTimeout(() => { preloader.classList.add('loaded'); document.body.classList.remove('no-scroll'); startTypewriter(); setTimeout(() => preloader.style.display = 'none', 800); }, 600);
        }
    };
    setTimeout(typeLine, 200);
}

document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    if (key === 'r') { document.body.classList.remove('green-mode'); document.body.classList.toggle('red-mode'); initParticles(); }
    else if (key === 'g') { document.body.classList.remove('red-mode'); document.body.classList.toggle('green-mode'); initParticles(); }
    else if (key === 'n') { document.body.classList.remove('red-mode'); document.body.classList.remove('green-mode'); initParticles(); }
});

function getThemeColor() {
    if (document.body.classList.contains('red-mode')) return '#F42C1D';
    if (document.body.classList.contains('green-mode')) return '#32CD32';
    return '#F1B7EA';
}
function getThemeRGBA(opacity) {
    if (document.body.classList.contains('red-mode')) return `rgba(244, 44, 29, ${opacity})`;
    if (document.body.classList.contains('green-mode')) return `rgba(50, 205, 50, ${opacity})`;
    return `rgba(241, 183, 234, ${opacity})`;
}

/* =========================================
   5. PARTICLES & 3D MODELS
   ========================================= */
const canvas = document.getElementById('neural-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;
let particlesArray;

if (canvas) { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }

class Particle {
    constructor(x, y, dx, dy, size) { this.x = x; this.y = y; this.dx = dx; this.dy = dy; this.size = size; }
    draw() { if (!ctx) return; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false); ctx.fillStyle = getThemeColor(); ctx.fill(); }
    update() {
        if (this.x > canvas.width || this.x < 0) this.dx = -this.dx; if (this.y > canvas.height || this.y < 0) this.dy = -this.dy;
        let dx = mouse.x - this.x; let dy = mouse.y - this.y; let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) { const f = (mouse.radius - dist) / mouse.radius; this.x -= (dx / dist) * f * 5; this.y -= (dy / dist) * f * 5; }
        this.x += this.dx; this.y += this.dy; this.draw();
    }
}
function initParticles() {
    if (!canvas || window.innerWidth < 768) return;
    particlesArray = [];
    let n = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < n; i++) {
        let size = Math.random() * 2 + 1;
        let x = Math.random() * (innerWidth - size * 2) + size;
        let y = Math.random() * (innerHeight - size * 2) + size;
        let dx = (Math.random() * 1.5) - 0.75;
        let dy = (Math.random() * 1.5) - 0.75;
        particlesArray.push(new Particle(x, y, dx, dy, size));
    }
}
function animateParticles() {
    if (!canvas) return;
    if (isEcoMode) { ctx.clearRect(0, 0, innerWidth, innerHeight); return; }
    requestAnimationFrame(animateParticles); ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < particlesArray.length; i++) { particlesArray[i].update(); }
    connectParticles();
}
function connectParticles() {
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distSq = ((particlesArray[a].x - particlesArray[b].x) ** 2) + ((particlesArray[a].y - particlesArray[b].y) ** 2);
            if (distSq < (canvas.width / 7) * (canvas.height / 7)) {
                ctx.strokeStyle = getThemeRGBA(1 - (distSq / 20000)); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(particlesArray[a].x, particlesArray[a].y); ctx.lineTo(particlesArray[b].x, particlesArray[b].y); ctx.stroke();
            }
        }
    }
}

const clock = new THREE.Clock();
const mixers = [];

let mouseX = 0, mouseY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', (event) => { mouseX = (event.clientX - windowHalfX); mouseY = (event.clientY - windowHalfY); });

function load3DModel(containerId, modelUrl, scale, posY) {
    const container = document.getElementById(containerId);
    if (!container || window.innerWidth < 900) return;
    const width = container.clientWidth;
    const height = container.clientHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 20;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(renderer.domElement);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xF1B7EA, 2.5); dirLight.position.set(5, 10, 7.5); dirLight.castShadow = true; scene.add(dirLight);
    const loader = new THREE.GLTFLoader();
    let model;
    loader.load(modelUrl, (gltf) => {
        model = gltf.scene;
        model.scale.set(scale, scale, scale);
        model.position.y = posY;
        scene.add(model);
        if (gltf.animations && gltf.animations.length) {
            const mixer = new THREE.AnimationMixer(model);
            mixer.clipAction(gltf.animations[0]).play();
            mixers.push(mixer);
        }
    }, undefined, (error) => { console.error('Error loading model:', error); });
    function animate() {
        requestAnimationFrame(animate);
        const delta = clock.getDelta();
        mixers.forEach(mixer => mixer.update(delta));
        if (model) { model.rotation.y = mouseX * 0.0005; model.rotation.x = mouseY * 0.0005; }
        renderer.render(scene, camera);
    }
    animate();
}

function initAll3D() {
    if (window.innerWidth >= 900) {
        load3DModel('about-3d', 'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/wizard/model.gltf', 3.5, -3);
        load3DModel('skills-3d', 'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/ninja/model.gltf', 4, -3.5);
        load3DModel('contact-3d', 'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/demon/model.gltf', 3.5, -3);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.project-card').forEach(c => {
        if (c.getAttribute('data-img')) c.style.backgroundImage = `url('${c.getAttribute('data-img')}')`;
    });
    initTiltCards();
    initAll3D();
    if (canvas) { initParticles(); animateParticles(); window.addEventListener('resize', () => { canvas.width = innerWidth; canvas.height = innerHeight; initParticles(); }); }
});

function initTiltCards() {
    document.querySelectorAll('.project-card').forEach(c => {
        c.addEventListener('mousemove', (e) => {
            const r = c.getBoundingClientRect();
            c.style.setProperty('--card-x', `${e.clientX - r.left}px`); c.style.setProperty('--card-y', `${e.clientY - r.top}px`);
            const xVal = ((e.clientX - r.left - r.width / 2) / r.width / 2) * 10;
            const yVal = ((e.clientY - r.top - r.height / 2) / r.height / 2) * -10;
            c.style.transform = `perspective(1000px) rotateX(${yVal}deg) rotateY(${xVal}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        c.addEventListener('mouseleave', () => c.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)');
    });
}
document.getElementById('whatsappBtn')?.addEventListener('click', (e) => { e.preventDefault(); window.open('https://wa.me/916203899720', '_blank'); });

/* =========================================
   6. PROJECT GALLERY DATA (UPDATED)
   ========================================= */
const projectData = {
    'PHOTOGRAPHY': {
        desc: "A collection of cinematic shots capturing raw reality.",
        tech: "SHOT ON: SONY ZV-E10 // LENS: 35MM",
        images: [
            "assets/work/photography/1 (1).jpg",
            "assets/work/photography/1 (2).jpg",
            "assets/work/photography/1 (3).jpg",
            "assets/work/photography/1 (4).jpg",
            "assets/work/photography/1 (5).jpg",
            "assets/work/photography/1 (6).jpg",
            "assets/work/photography/1 (7).jpg",
            "assets/work/photography/1 (8).jpg",
            "assets/work/photography/1 (9).jpg",
            "assets/work/photography/1 (10).jpg"
        ]
    },
    'DESIGNS': {
        desc: "Digital architecture and visual hierarchy explorations.",
        tech: "TOOLS: ADOBE PHOTOSHOP & ILLUSTRATOR",
        images: [
            "assets/work/designs/1 (1).jpg",
            "assets/work/designs/1 (2).jpg",
            "assets/work/designs/1 (3).jpg",
            "assets/work/designs/1 (4).jpg",
            "assets/work/designs/1 (5).jpg",
            "assets/work/designs/1 (6).jpg",
            "assets/work/designs/1 (7).jpg",
            "assets/work/designs/1 (8).jpg",
            "assets/work/designs/1 (9).jpg",
            "assets/work/designs/1 (10).jpg"
        ]
    },
    'VIDEO EDITING': {
        desc: "Temporal manipulation and motion graphics.",
        tech: "SOFTWARE: PREMIERE PRO & AFTER EFFECTS",
        // PASTE YOUR INSTAGRAM REEL LINKS HERE
        images: [
            "https://www.instagram.com/reel/DJjMygkvyjO/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
            "https://www.instagram.com/reel/DLPp77CNrtT/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
            "https://www.instagram.com/reel/DP9c6YPEaQL/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
            "https://www.instagram.com/reel/C_-jg_LJDxe/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
            "https://www.instagram.com/reel/DPergVdAebH/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
            "https://www.instagram.com/reel/DPk9ubfgToZ/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",

            // Add more links separated by commas...
        ]
    }
};

/* =========================================
   7. MODAL & LIGHTBOX LOGIC
   ========================================= */
const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalGallery = document.getElementById("modalGallery");
const closeBtn = document.querySelector(".close");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxContainer = document.getElementById("lightbox-container");
const lightboxCaption = document.getElementById("lightbox-caption");
const lightboxClose = document.querySelector(".lightbox-close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentGallery = [];
let currentIndex = 0;
let currentTechSpecs = "";

function openLightbox(index) {
    currentIndex = index;
    updateLightboxContent();
    lightbox.classList.add('active');
}

function updateLightboxContent() {
    let itemUrl = currentGallery[currentIndex];

    lightboxImg.style.display = "none";
    lightboxContainer.style.display = "none";
    lightboxContainer.innerHTML = "";

    // DETECT MEDIA TYPE
    if (itemUrl.includes('youtube') || itemUrl.includes('vimeo')) {
        // YouTube/Vimeo
        lightboxContainer.style.display = "flex";
        const iframe = document.createElement('iframe');
        iframe.src = itemUrl;
        iframe.allow = "autoplay; encrypted-media; fullscreen";
        lightboxContainer.appendChild(iframe);

    } else if (itemUrl.includes('instagram.com')) {
        // Instagram Reel
        lightboxContainer.style.display = "flex";
        const iframe = document.createElement('iframe');
        if (!itemUrl.endsWith('/embed') && !itemUrl.endsWith('/embed/')) {
            itemUrl = itemUrl.replace(/\/$/, "") + "/embed";
        }
        iframe.src = itemUrl;
        iframe.style.background = "white";
        lightboxContainer.appendChild(iframe);

    } else if (itemUrl.endsWith('.mp4') || itemUrl.endsWith('.webm')) {
        // Local Video
        lightboxContainer.style.display = "flex";
        const video = document.createElement('video');
        video.src = itemUrl;
        video.controls = true;
        video.autoplay = true;
        video.style.maxWidth = "100%";
        video.style.maxHeight = "100%";
        lightboxContainer.appendChild(video);

    } else {
        // Image
        lightboxImg.style.display = "block";
        lightboxImg.src = itemUrl;
    }

    lightboxCaption.innerText = `${currentIndex + 1} / ${currentGallery.length} | [ ${currentTechSpecs} ]`;
}

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        const category = card.querySelector('.card-content').innerText.trim();
        const data = projectData[category];
        if (data) {
            modalTitle.innerText = category;
            modalDesc.innerText = data.desc;
            modalGallery.innerHTML = '';

            currentGallery = data.images;
            currentTechSpecs = data.tech;

            data.images.forEach((itemUrl, index) => {
                let element;
                // Create Thumbnail based on type
                if (itemUrl.includes('instagram') || itemUrl.includes('youtube') || itemUrl.endsWith('.mp4')) {
                    element = document.createElement('div');
                    element.className = 'gallery-item';
                    element.style.background = '#111';
                    element.style.display = 'flex';
                    element.style.alignItems = 'center';
                    element.style.justifyContent = 'center';
                    element.style.border = "1px solid #333";

                    let label = "▶ PLAY VIDEO";
                    if (itemUrl.includes('instagram')) label = "📸 INSTAGRAM";

                    element.innerHTML = `<span style="color:var(--primary-red); font-family:var(--font-tech); letter-spacing:2px;">${label}</span>`;
                } else {
                    element = document.createElement('img');
                    element.src = itemUrl;
                    element.className = 'gallery-item';
                }

                element.onclick = () => openLightbox(index);
                modalGallery.appendChild(element);
            });
            modal.style.display = "block";
            document.body.style.overflow = "hidden";
        }
    });
});

function showNext() { currentIndex = (currentIndex + 1) % currentGallery.length; updateLightboxContent(); }
function showPrev() { currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length; updateLightboxContent(); }

nextBtn.onclick = (e) => { e.stopPropagation(); showNext(); };
prevBtn.onclick = (e) => { e.stopPropagation(); showPrev(); };

document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
    if (e.key === "Escape") lightbox.classList.remove('active');
});

closeBtn.onclick = function () { modal.style.display = "none"; document.body.style.overflow = "auto"; }
window.onclick = function (event) { if (event.target == modal) { modal.style.display = "none"; document.body.style.overflow = "auto"; } }
lightboxClose.onclick = () => lightbox.classList.remove('active');
lightbox.onclick = (e) => { if (e.target === lightbox) lightbox.classList.remove('active'); };