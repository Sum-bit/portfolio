// -------- Smooth Scrolling for Nav Links --------
const navLinks = document.querySelectorAll('nav ul li a');

navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault(); // Prevent default jump

    const targetId = this.getAttribute('href').slice(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// -------- Smooth Scroll for Back-to-Top Link --------
const backToTop = document.querySelector('.back-to-top');

backToTop.addEventListener('click', function(e) {
  e.preventDefault(); // Prevent default jump

  document.getElementById('top').scrollIntoView({ behavior: 'smooth' });
});

// -------- Optional: Highlight Active Section in Nav (Minimal) --------
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
  let scrollPos = window.scrollY || window.pageYOffset;

  sections.forEach(section => {
    const top = section.offsetTop - 100; // offset for sticky nav
    const bottom = top + section.offsetHeight;
    const navLink = document.querySelector(`nav ul li a[href="#${section.id}"]`);

    if (scrollPos >= top && scrollPos < bottom) {
      navLinks.forEach(link => link.classList.remove('active'));
      if (navLink) navLink.classList.add('active');
    }
  });
});
