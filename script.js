document.addEventListener("DOMContentLoaded", () => {
  // Register GSAP ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // ==========================================
  // 1. HERO TITLE: GSAP.COM STYLE 3D CHARACTER ENTRANCE
  // ==========================================
  // Interactive Parallax Floating Card on Mouse Move
const heroHeader = document.querySelector("header");
const landingCard = document.querySelector(".landing-content");

if (heroHeader && landingCard) {
  heroHeader.addEventListener("mousemove", (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    // Calculate movement offset relative to center
    const x = (clientX / innerWidth - 0.5) * 20; // 20px max shift
    const y = (clientY / innerHeight - 0.5) * 20;

    gsap.to(landingCard, {
      x: x,
      y: y,
      rotationY: x * 0.5,
      rotationX: -y * 0.5,
      duration: 0.8,
      ease: "power2.out"
    });
  });

  heroHeader.addEventListener("mouseleave", () => {
    gsap.to(landingCard, {
      x: 0,
      y: 0,
      rotationY: 0,
      rotationX: 0,
      duration: 1,
      ease: "power2.out"
    });
  });
}
  const titleEl = document.getElementById("hero-name");
  if (titleEl) {
    const text = titleEl.textContent;
    titleEl.textContent = "";

    // Split headline text into individual character spans
    text.split("").forEach((char) => {
      const span = document.createElement("span");
      span.classList.add("char");
      span.textContent = char === " " ? "\u00A0" : char;
      titleEl.appendChild(span);
    });

    // 3D Staggered entrance wave for every single letter
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
  // 2. HORIZONTAL SCROLL FOR PROJECTS SECTION
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
  // 3. VERTICAL CARD REVEALS ON SCROLL
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

  // Stagger Skills List Items
  gsap.from("#skills ul li", {
    scrollTrigger: {
      trigger: "#skills",
      start: "top 80%"
    },
    x: -20,
    opacity: 0,
    stagger: 0.08,
    duration: 0.5,
    ease: "power1.out"
  });

  // ==========================================
  // 4. GSAP PURE HOVER MICRO-INTERACTIONS
  // ==========================================

  // Project Cards Spring Bounce
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card, { scale: 1.05, y: -8, duration: 0.4, ease: "back.out(2)" });
    });
    card.addEventListener("mouseleave", () => {
      gsap.to(card, { scale: 1, y: 0, duration: 0.3, ease: "power2.out" });
    });
  });

  // Certificate Thumbnails Spring Hover
  document.querySelectorAll(".certificate-thumb").forEach((thumb) => {
    thumb.addEventListener("mouseenter", () => {
      gsap.to(thumb, { scale: 1.03, duration: 0.4, ease: "back.out(1.7)" });
    });
    thumb.addEventListener("mouseleave", () => {
      gsap.to(thumb, { scale: 1, duration: 0.3, ease: "power2.out" });
    });
  });

  // Social Icons Magnetic Pop
  document.querySelectorAll(".social-icon").forEach((icon) => {
    icon.addEventListener("mouseenter", () => {
      gsap.to(icon, { scale: 1.25, duration: 0.4, ease: "back.out(2.5)" });
    });
    icon.addEventListener("mouseleave", () => {
      gsap.to(icon, { scale: 1, duration: 0.3, ease: "power2.out" });
    });
  });
});

// Smooth Navigation Links
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

// Back To Top
const backToTop = document.querySelector(".back-to-top");
if (backToTop) {
  backToTop.addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("top").scrollIntoView({ behavior: "smooth" });
  });
}