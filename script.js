document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // ==========================================
  // 1. GSAP: CHARACTER-BY-CHARACTER TITLE SPLIT (gsap.com style)
  // ==========================================
  const titleEl = document.getElementById("hero-name");
  if (titleEl) {
    const text = titleEl.textContent;
    titleEl.textContent = "";

    // Split text into wrapped character spans
    text.split("").forEach((char) => {
      const span = document.createElement("span");
      span.classList.add("char");
      span.textContent = char === " " ? "\u00A0" : char; // Handle spaces
      titleEl.appendChild(span);
    });

    // 3D Staggered Entrance for every character
    gsap.from("#hero-name .char", {
      duration: 1,
      y: 80,
      rotationX: -90,
      opacity: 0,
      stagger: 0.04,
      ease: "back.out(1.7)",
      delay: 0.2
    });
  }

  // Hero Tagline & Subtitle Sequence
  gsap.from(".landing-content .tagline", { y: 20, opacity: 0, duration: 0.8, delay: 0.8 });
  gsap.from(".landing-content .intro", { y: 20, opacity: 0, duration: 0.8, delay: 1.0 });

  // ==========================================
  // 2. GSAP: HORIZONTAL SCROLL FOR PROJECTS (Option 2)
  // ==========================================
  const projectsSection = document.querySelector(".projects-horizontal-section");
  const horizontalWrapper = document.querySelector(".horizontal-wrapper");

  if (projectsSection && horizontalWrapper) {
    let scrollAmount = horizontalWrapper.scrollWidth - window.innerWidth + 100;

    gsap.to(horizontalWrapper, {
      x: () => -scrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: projectsSection,
        pin: true,
        scrub: 1,
        end: () => "+=" + scrollAmount,
        invalidateOnRefresh: true
      }
    });
  }

  // ==========================================
  // 3. GSAP: VERTICAL CARD REVEALS
  // ==========================================
  gsap.utils.toArray(".card").forEach((card) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none reverse"
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    });
  });

  // ==========================================
  // 4. ANIME.JS: ELASTIC HOVER INTERACTIONS
  // ==========================================
  // Project Cards
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      anime({ targets: card, scale: 1.05, translateY: -8, duration: 800, easing: "easeOutElastic(1, .6)" });
    });
    card.addEventListener("mouseleave", () => {
      anime({ targets: card, scale: 1, translateY: 0, duration: 400, easing: "easeOutQuad" });
    });
  });

  // Certificate Thumbnails
  document.querySelectorAll(".certificate-thumb").forEach((thumb) => {
    thumb.addEventListener("mouseenter", () => {
      anime({ targets: thumb, scale: 1.03, duration: 600, easing: "easeOutElastic(1, .5)" });
    });
    thumb.addEventListener("mouseleave", () => {
      anime({ targets: thumb, scale: 1, duration: 400, easing: "easeOutQuad" });
    });
  });

  // Social Icons
  document.querySelectorAll(".social-icon").forEach((icon) => {
    icon.addEventListener("mouseenter", () => {
      anime({ targets: icon, scale: 1.25, duration: 600, easing: "easeOutElastic(1, .4)" });
    });
    icon.addEventListener("mouseleave", () => {
      anime({ targets: icon, scale: 1, duration: 300, easing: "easeOutQuad" });
    });
  });
});

// Smooth Navigation Scrolling
const navLinks = document.querySelectorAll("nav ul li a");
navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href && href.startsWith("#")) {
      e.preventDefault();
      const targetSection = document.getElementById(href.slice(1));
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  });
});