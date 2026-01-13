# ⚡ Vishal | Creative Portfolio

![Portfolio Preview](https://img.shields.io/badge/Status-Online-brightgreen) ![Tech](https://img.shields.io/badge/Built%20With-HTML%20%7C%20CSS%20%7C%20JS%20%7C%20Three.js-blueviolet)

A futuristic, interactive personal portfolio website designed with a **Cyberpunk / Tactical** aesthetic. This project showcases creative work (Photography, Design, Video) using immersive web technologies like **Three.js 3D models**, **interactive particle systems**, and a custom-built **media lightbox**.

🔗 **Live Demo:** [https://viishalkr.github.io](https://viishalkr.github.io)

## 🚀 Key Features

* **🎨 Cyber Glass UI**: A modern, glass-morphism navigation bar with blur effects and neon glows.
* **🧊 3D Integration**: Interactive 3D models (Wizard, Ninja, etc.) powered by **Three.js** that track mouse movement.
* **✨ Neural Particle System**: A custom HTML5 Canvas background where particles connect and react to the cursor.
* **💻 System Boot Preloader**: A cinematic "Terminal Boot" animation sequence on load.
* **📸 Tactical Lightbox**:
    * Supports **High-Res Images** (Raw view without overlays).
    * Supports **Local Video Files** (MP4/WebM).
    * **Instagram Reel Support**: Automatically detects Instagram links and provides a "Watch on App" integration to bypass connection errors.
    * **Keyboard Navigation**: Use Left/Right arrows to browse the gallery.
* **📱 Fully Responsive**: Optimized for mobile, tablet, and desktop with touch-friendly interactions.

## 🛠️ Tech Stack

* **Core**: HTML5, CSS3 (Custom Variables & Animations), Vanilla JavaScript (ES6+).
* **Libraries**:
    * [Three.js](https://threejs.org/) (for 3D rendering).
    * [GLTFLoader](https://threejs.org/docs/#examples/en/loaders/GLTFLoader) (for loading 3D assets).
* **Fonts**: Orbitron (Headers), Rajdhani (Body), Share Tech Mono (UI Elements).

## 📂 Folder Structure

```text
/viishalkr.github.io
│
├── index.html       # Main HTML structure
├── style.css        # All visual styles, animations, and responsive rules
├── script.js        # Logic for Particles, 3D Models, Lightbox, and Data
├── README.md        # Documentation
└── assets/
    ├── resume.pdf   # CV File (Must be named exactly this)
    └── work/        # Folder containing project images/videos