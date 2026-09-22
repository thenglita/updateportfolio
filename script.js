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

    // Check if typing element exists
    if (!typingElement) return;

    const currentWord = words[wordIndex];

    /* =========================
       TYPE
    ========================= */

    if (!deleting) {

        typingElement.textContent =
            currentWord.substring(
                0,
                characterIndex + 1
            );

        characterIndex++;

        /* Finished typing */

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

        typingElement.textContent =
            currentWord.substring(
                0,
                characterIndex - 1
            );

        characterIndex--;

        /* Finished deleting */

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

        const sectionTop =
            section.offsetTop - 200;

        if (window.scrollY >= sectionTop) {

            current =
                section.getAttribute("id");
        }
    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + current
        ) {

            link.classList.add("active");
        }

    });

});



/* ==================================================
   PARTICLE COLORS
================================================== */

const colors = [
    "#8b6cff",
    "#c4b5ff",
    "#ffffff",
    "#795cff",
    "#00f0ff"
];



/* ==================================================
   MOUSE PARTICLES
================================================== */

let lastX = 0;
let lastY = 0;

window.addEventListener("mousemove", (e) => {

    const distance = Math.hypot(
        e.clientX - lastX,
        e.clientY - lastY
    );

    if (distance > 6) {

        createParticle(
            e.clientX,
            e.clientY
        );

        lastX = e.clientX;
        lastY = e.clientY;
    }

});



/* ==================================================
   CREATE PARTICLE
================================================== */

function createParticle(x, y) {

    const particle =
        document.createElement("div");

    particle.classList.add("particle");


    /* Random size */

    const size =
        Math.random() * 8 + 4;

    particle.style.width =
        `${size}px`;

    particle.style.height =
        `${size}px`;


    /* Random color */

    const color =
        colors[
            Math.floor(
                Math.random() * colors.length
            )
        ];

    particle.style.background =
        color;

    particle.style.boxShadow =
        `0 0 10px ${color},
         0 0 20px ${color}`;


    /* Position */

    particle.style.left =
        `${x}px`;

    particle.style.top =
        `${y}px`;


    /* Random movement */

    particle.style.setProperty(
        "--moveX",
        `${(Math.random() - 0.5) * 100}px`
    );

    particle.style.setProperty(
        "--moveY",
        `${(Math.random() - 0.5) * 100}px`
    );


    document.body.appendChild(
        particle
    );


    /* Remove particle */

    setTimeout(() => {

        particle.remove();

    }, 800);

}



/* ==================================================
   AUTO FLOATING BACKGROUND PARTICLES
================================================== */

function createAutoParticle() {

    const particle =
        document.createElement("div");

    particle.classList.add(
        "particle"
    );


    /* Random size */

    const size =
        Math.random() * 6 + 3;

    particle.style.width =
        `${size}px`;

    particle.style.height =
        `${size}px`;


    /* Random color */

    const color =
        colors[
            Math.floor(
                Math.random() * colors.length
            )
        ];

    particle.style.background =
        color;

    particle.style.boxShadow =
        `0 0 10px ${color},
         0 0 20px ${color}`;


    /* Random screen position */

    particle.style.left =
        `${Math.random() * window.innerWidth}px`;

    particle.style.top =
        `${Math.random() * window.innerHeight}px`;


    /* Random movement */

    particle.style.setProperty(
        "--moveX",
        `${(Math.random() - 0.5) * 120}px`
    );

    particle.style.setProperty(
        "--moveY",
        `${(Math.random() - 0.5) * 120}px`
    );


    document.body.appendChild(
        particle
    );


    /* Remove */

    setTimeout(() => {

        particle.remove();

    }, 1200);

}



/* ==================================================
   START AUTO PARTICLES
================================================== */

setInterval(() => {

    createAutoParticle();

}, 700);



/* ==================================================
   PARTICLES WHILE SCROLLING
================================================== */

let scrollTimer;

window.addEventListener("scroll", () => {

    /* Create particle */

    createAutoParticle();


    clearTimeout(
        scrollTimer
    );


    scrollTimer =
        setTimeout(() => {

            createAutoParticle();

        }, 100);

});



/* ==================================================
   TOUCH PARTICLES FOR MOBILE
================================================== */

let lastTouchX = 0;
let lastTouchY = 0;

window.addEventListener(
    "touchmove",
    (e) => {

        const touch =
            e.touches[0];

        const x =
            touch.clientX;

        const y =
            touch.clientY;


        const distance =
            Math.hypot(
                x - lastTouchX,
                y - lastTouchY
            );


        if (distance > 10) {

            createParticle(
                x,
                y
            );

            lastTouchX = x;
            lastTouchY = y;
        }

    },
    {
        passive: true
    }
);



/* ==================================================
   SKILL CARD ANIMATION ON SCROLL
================================================== */

const skillCards =
    document.querySelectorAll(
        ".skill-card"
    );


const observerOptions = {

    threshold: 0.15,

    rootMargin:
        "0px 0px -50px 0px"
};


const skillObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(
                (entry, index) => {

                    if (
                        entry.isIntersecting
                    ) {

                        setTimeout(
                            () => {

                                entry.target
                                    .classList
                                    .add("show");

                            },
                            index * 90
                        );


                        observer.unobserve(
                            entry.target
                        );
                    }

                }
            );

        },
        observerOptions
    );


skillCards.forEach(card => {

    skillObserver.observe(card);

});



/* ==================================================
   MOBILE SKILL CARD FLOATING
================================================== */

function addFloatingAnimation() {

    skillCards.forEach(
        (card, index) => {

            card.style.animationDelay =
                `${index * 0.4}s`;

        }
    );

}


/* Start */

addFloatingAnimation();



/* ==================================================
   REDUCE ANIMATION IF USER PREFERS REDUCED MOTION
================================================== */

const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


if (prefersReducedMotion) {

    document
        .querySelectorAll(".skill-card")
        .forEach(card => {

            card.style.animation =
                "none";

        });

}
