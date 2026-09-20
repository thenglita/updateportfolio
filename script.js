/* ==================================================
   TYPING EFFECT
================================================== */
const typingElement = document.getElementById("typing");

const words = [
    "Computer Science Student",
    "Web Developer",
    "Designer",
    "Digital Marketer"
];

let wordIndex = 0;
let characterIndex = 0;
let deleting = false;

function typingEffect() {
    const currentWord = words[wordIndex];

    /* =========================
       TYPE
    ========================= */
    if (!deleting) {
        typingElement.textContent = currentWord.substring(
            0,
            characterIndex + 1
        );

        characterIndex++;

        /* Finished */
        if (characterIndex === currentWord.length) {
            deleting = true;

            setTimeout(typingEffect, 1800);
            return;
        }
    } 
    /* =========================
       DELETE
    ========================= */
    else {
        typingElement.textContent = currentWord.substring(
            0,
            characterIndex - 1
        );

        characterIndex--;

        /* Finished */
        if (characterIndex === 0) {
            deleting = false;

            wordIndex++;

            if (wordIndex >= words.length) {
                wordIndex = 0;
            }
        }
    }

    const speed = deleting ? 45 : 85;

    setTimeout(typingEffect, speed);
}

/* START TYPING */
typingEffect();


/* ==================================================
   NAVIGATION ACTIVE
================================================== */
const navLinks = document.querySelectorAll(".nav a");
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});


/* ==================================================
   GLOWING PARTICLES ON MOUSE MOVE
================================================== */
const colors = ["#8b6cff", "#c4b5ff", "#ffffff", "#795cff", "#00f0ff"];
let lastX = 0, lastY = 0;

window.addEventListener("mousemove", (e) => {
    const distance = Math.hypot(e.clientX - lastX, e.clientY - lastY);
    if (distance > 6) {
        createParticle(e.clientX, e.clientY);
        lastX = e.clientX;
        lastY = e.clientY;
    }
});

function createParticle(x, y) {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    
    // ចៃដន្យទំហំ
    const size = Math.random() * 8 + 4;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // ចៃដន្យពណ៌ភ្លឺៗ
    const color = colors[Math.floor(Math.random() * colors.length)];
    particle.style.background = color;
    particle.style.boxShadow = `0 0 10px ${color}, 0 0 20px ${color}`;
    
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 800);
}


/* ==================================================
   SKILL CARD ANIMATION ON SCROLL
================================================== */
const skillCards = document.querySelectorAll(".skill-card");

const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add slight delay for staggered entry effect
            setTimeout(() => {
                entry.target.classList.add("show");
            }, index * 90);
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

skillCards.forEach((card) => {
    skillObserver.observe(card);
});