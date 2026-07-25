document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // ==========================================
  // 1. GSAP-STYLE GIANT HEADLINE ENTRANCE
  // ==========================================
  const heroTl = gsap.timeline();

  heroTl
    .from("nav", { y: -30, opacity: 0, duration: 0.8, ease: "power3.out" })
    .from(".hero-title", { 
      y: 80, 
      opacity: 0, 
      duration: 1.2, 
      ease: "power4.out" 
    }, "-=0.4")
    .from(".shape", { 
      scale: 0, 
      rotation: -180, 
      stagger: 0.15, 
      duration: 0.8, 
      ease: "back.out(2)" 
    }, "-=0.6")
    .from(".hero-footer", { 
      y: 30, 
      opacity: 0, 
      duration: 0.8 
    }, "-=0.4");

  // Continuous Gentle Floating Physics for Accent Shapes
  gsap.to(".shape.star", { y: -15, rotation: 45, duration: 2.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
  gsap.to(".shape.flower", { scale: 1.25, rotation: -30, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut" });
  gsap.to(".shape.squiggle", { x: 15, duration: 2.2, repeat: -1, yoyo: true, ease: "sine.inOut" });

  // ==========================================
  // 2. HORIZONTAL SCROLL FOR PROJECTS
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

  // Project Cards
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card, { scale: 1.05, y: -8, duration: 0.4, ease: "back.out(2)" });
    });
    card.addEventListener("mouseleave", () => {
      gsap.to(card, { scale: 1, y: 0, duration: 0.3, ease: "power2.out" });
    });
  });

  // Certificate Thumbnails
  document.querySelectorAll(".certificate-thumb").forEach((thumb) => {
    thumb.addEventListener("mouseenter", () => {
      gsap.to(thumb, { scale: 1.03, duration: 0.4, ease: "back.out(1.7)" });
    });
    thumb.addEventListener("mouseleave", () => {
      gsap.to(thumb, { scale: 1, duration: 0.3, ease: "power2.out" });
    });
  });

  // Social Icons
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

// Back to Top
const backToTop = document.querySelector(".back-to-top");
if (backToTop) {
  backToTop.addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("top").scrollIntoView({ behavior: "smooth" });
  });
}