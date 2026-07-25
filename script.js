document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // ==========================================
  // PREP: SPLIT LINES INTO CHARACTER SPANS
  // ==========================================
  const lineEls = document.querySelectorAll(".hero-title .line");
  lineEls.forEach((line) => {
    // Preserve any existing shape spans (star, flower, squiggle)
    const shapes = Array.from(line.querySelectorAll(".shape"));
    const textNodes = Array.from(line.childNodes).filter(node => node.nodeType === Node.TEXT_NODE);
    
    // Get raw text content excluding shapes
    let lineText = textNodes.map(node => node.textContent).join("");
    
    // Clear line content to rebuild with wrapped character spans
    line.innerHTML = "";
    
    lineText.split("").forEach((char) => {
      const span = document.createElement("span");
      span.classList.add("char");
      span.textContent = char === " " ? "\u00A0" : char;
      line.appendChild(span);
    });

    // Re-append the accent shape at the end of the line
    shapes.forEach(shape => line.appendChild(shape));
  });

  // ==========================================
  // 1. CINEMATIC 3-PHASE HERO TIMELINE
  // ==========================================
  const heroTl = gsap.timeline();

  // Hide accent shapes initially so name appears plain white first
  gsap.set(".shape", { scale: 0, opacity: 0 });

  heroTl
    // Phase 1: Nav slides down
    .from("nav", { y: -30, opacity: 0, duration: 0.8, ease: "power3.out" })

    // Simultaneous Letter-by-Letter reveal across Line 1, Line 2, & Line 3
    .from(".hero-title .line .char", { 
      y: 50, 
      opacity: 0, 
      rotationX: -90,
      stagger: {
        each: 0.05,
        from: "start" // Animates character index 0 of all lines together, then index 1, etc.
      }, 
      duration: 0.7, 
      ease: "back.out(1.7)" 
    }, "-=0.2")

    // Phase 2: Smooth glide from center offset to left margin
    .to(".landing-content", {
      x: 0,
      duration: 1.1,
      ease: "power3.inOut"
    }, "+=0.3")

    // Phase 3: Pop the colorful shapes & reveal tagline/footer
    .to(".shape", { 
      scale: 1, 
      opacity: 1, 
      rotation: 0, 
      stagger: 0.18, 
      duration: 0.7, 
      ease: "back.out(2.5)" 
    }, "-=0.2")
    .from(".hero-footer", { 
      y: 20, 
      opacity: 0, 
      duration: 0.8 
    }, "-=0.3");

  // Continuous Floating Motion for the Accent Shapes
  gsap.to(".shape.star", { 
    y: -15, 
    rotation: 45, 
    duration: 2.2, 
    repeat: -1, 
    yoyo: true, 
    ease: "sine.inOut",
    delay: 3.5
  });
  
  gsap.to(".shape.flower", { 
    scale: 1.3, 
    rotation: -30, 
    duration: 2.8, 
    repeat: -1, 
    yoyo: true, 
    ease: "sine.inOut",
    delay: 3.5 
  });
  
  gsap.to(".shape.squiggle", { 
    x: 18, 
    duration: 2.0, 
    repeat: -1, 
    yoyo: true, 
    ease: "sine.inOut",
    delay: 3.5 
  });

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

// Back to Top Link
const backToTop = document.querySelector(".back-to-top");
if (backToTop) {
  backToTop.addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("top").scrollIntoView({ behavior: "smooth" });
  });
}