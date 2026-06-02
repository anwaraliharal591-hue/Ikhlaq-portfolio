// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', function () {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', function () {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', function () {
    navLinks.classList.remove('open');
  });
});

// ===== HERO ROLE TYPER =====
const roles = ['Video Editor', 'Web Developer', 'Web Designer', 'Graphic Designer'];
const roleEl = document.getElementById('hero-role');
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeRole() {
  var current = roles[roleIndex];

  if (isDeleting) {
    roleEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    roleEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  var speed = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === current.length) {
    speed = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 400;
  }

  setTimeout(typeRole, speed);
}

typeRole();

// ===== PORTFOLIO FILTER =====
var filterBtns = document.querySelectorAll('.filter-btn');
var portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    filterBtns.forEach(function (b) { b.classList.remove('active'); });
    btn.classList.add('active');

    var filter = btn.getAttribute('data-filter');

    portfolioItems.forEach(function (item) {
      if (filter === 'all' || item.getAttribute('data-category') === filter) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

// ===== SKILL BARS (Intersection Observer) =====
var skillFills = document.querySelectorAll('.skill-fill');
var skillsSection = document.getElementById('skills');

var skillsObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      skillFills.forEach(function (fill) {
        var width = fill.getAttribute('data-width');
        fill.style.width = width + '%';
      });
      skillsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

if (skillsSection) {
  skillsObserver.observe(skillsSection);
}

// ===== SCROLL REVEAL =====
var revealElements = document.querySelectorAll(
  '.service-card, .portfolio-item, .testimonial-card, .about-grid, .skill-group, .contact-grid'
);

var revealObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealElements.forEach(function (el) {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  revealObserver.observe(el);
});

// ===== CONTACT FORM =====
var contactForm = document.getElementById('contact-form');
var formSuccess = document.getElementById('form-success');

contactForm.addEventListener('submit', function (e) {
  e.preventDefault();
  var btn = contactForm.querySelector('button[type="submit"]');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  setTimeout(function () {
    formSuccess.style.display = 'block';
    contactForm.reset();
    btn.textContent = 'Send Message';
    btn.disabled = false;
  }, 1200);
});
