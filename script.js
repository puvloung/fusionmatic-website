document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const data = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      business_type: document.getElementById('business-type').value,
      message: document.getElementById('message').value
    };

   fetch('https://fusionmatic-backend-production.up.railway.app/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(() => {
      window.location.href = 'confirmation.html';
    })
    .catch(err => console.error('Error:', err));
  });
});

(function () {
  'use strict';

  // ——— Header scroll: shrink + background ———
  var header = document.getElementById('header');
  if (header) {
    var scrollThreshold = 80;
    function updateHeader() {
      if (window.scrollY > scrollThreshold) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', function () {
      requestAnimationFrame(updateHeader);
    }, { passive: true });
    updateHeader();
  }

  // ——— Smooth scroll for anchor links ———
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var id = this.getAttribute('href');
      if (id === '#') return;
      var target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        closeMobileNav();
      }
    });
  });

  // ——— Mobile nav (hamburger) ———
  var hamburger = document.getElementById('hamburger');
  var nav = document.querySelector('.nav');
  var navOverlay = document.getElementById('nav-overlay');

  function openMobileNav() {
    if (!nav || !navOverlay) return;
    nav.classList.add('open');
    navOverlay.classList.add('visible');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    if (!nav || !navOverlay) return;
    nav.classList.remove('open');
    navOverlay.classList.remove('visible');
    if (hamburger) {
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      if (nav.classList.contains('open')) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  if (navOverlay) {
    navOverlay.addEventListener('click', closeMobileNav);
  }

  // ——— Fade-in on scroll (Intersection Observer) ———
  var fadeElements = document.querySelectorAll('.fade-in');
  if (fadeElements.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { rootMargin: '0px 0px -60px 0px', threshold: 0.1 }
    );
    fadeElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    fadeElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ——— Counter animation for stats ———
  var statNumbers = document.querySelectorAll('.stat-number[data-target]');
  var counterObserver = null;

  function animateValue(el, start, end, duration) {
    var startTime = null;
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var easeOut = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(start + (end - start) * easeOut);
      el.textContent = current;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = end;
      }
    }
    window.requestAnimationFrame(step);
  }

  if (statNumbers.length && 'IntersectionObserver' in window) {
    counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var target = parseInt(el.getAttribute('data-target'), 10);
          if (isNaN(target)) return;
          animateValue(el, 0, target, 1400);
          counterObserver.unobserve(el);
        });
      },
      { rootMargin: '0px 0px -80px 0px', threshold: 0.5 }
    );
    statNumbers.forEach(function (el) {
      counterObserver.observe(el);
    });
  }

  // ——— Footer year ———
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
