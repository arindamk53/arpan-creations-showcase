/* ============================================================
   SECRET AESTHETICS — ANIMATIONS JS
   animations.js — IntersectionObserver, count-up, parallax
   ============================================================ */

'use strict';

(function() {

  // ── INTERSECTION OBSERVER — SCROLL ANIMATIONS ──
  const fadeElements = document.querySelectorAll(
    '.fade-up, .fade-in, .slide-in-left, .slide-in-right, .scale-in, .reveal'
  );

  if (fadeElements.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger children automatically
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    fadeElements.forEach(el => observer.observe(el));
  } else {
    // Fallback: show everything immediately
    fadeElements.forEach(el => el.classList.add('in-view'));
  }

  // ── STAGGER GRID CHILDREN ──
  function setupStaggeredChildren(containerSelector, childSelector) {
    document.querySelectorAll(containerSelector).forEach(container => {
      const children = container.querySelectorAll(childSelector);
      children.forEach((child, i) => {
        child.style.transitionDelay = `${i * 0.1}s`;
        child.classList.add('fade-up');
      });
    });
  }

  setupStaggeredChildren('.treatments-grid', '.treatment-card');
  setupStaggeredChildren('.blog-grid', '.blog-card');
  setupStaggeredChildren('.doctors-grid', '.doctor-card');
  setupStaggeredChildren('.pillars-grid', '.pillar-card');
  setupStaggeredChildren('.step-list', '.step-item');

  // Observe all newly marked elements
  document.querySelectorAll('.fade-up:not(.in-view)').forEach(el => {
    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      obs.observe(el);
    } else {
      el.classList.add('in-view');
    }
  });

  // ── COUNT-UP ANIMATION ──
  function animateCountUp(el) {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const duration = parseInt(el.dataset.duration || '2000', 10);
    const start = performance.now();

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      el.textContent = current.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  const countEls = document.querySelectorAll('[data-count]');
  if (countEls.length && 'IntersectionObserver' in window) {
    const countObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCountUp(entry.target);
          countObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    countEls.forEach(el => countObs.observe(el));
  } else {
    countEls.forEach(el => {
      el.textContent = parseInt(el.dataset.count, 10).toLocaleString() + (el.dataset.suffix || '');
    });
  }

  // ── TEXT REVEAL ANIMATION (heading word-by-word) ──
  function setupTextReveals() {
    document.querySelectorAll('.reveal-text').forEach(el => {
      const text = el.innerHTML;
      // Wrap each word in a span
      el.innerHTML = text.replace(/(\S+)/g, '<span class="word">$1</span>&ZeroWidthSpace;');

      // Stagger each word
      el.querySelectorAll('.word').forEach((word, i) => {
        word.style.transitionDelay = `${i * 0.05}s`;
      });
    });

    if ('IntersectionObserver' in window) {
      const textObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            textObs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });

      document.querySelectorAll('.reveal-text').forEach(el => textObs.observe(el));
    }
  }
  setupTextReveals();

  // ── PARALLAX ──
  const parallaxEls = document.querySelectorAll('[data-parallax]');

  if (parallaxEls.length) {
    let rafId = null;

    function updateParallax() {
      const scrollY = window.scrollY;
      parallaxEls.forEach(el => {
        const speed = parseFloat(el.dataset.parallax) || 0.3;
        const rect = el.getBoundingClientRect();
        const elCenter = rect.top + rect.height / 2;
        const viewCenter = window.innerHeight / 2;
        const offset = (elCenter - viewCenter) * speed;
        el.style.transform = `translateY(${offset}px)`;
      });
      rafId = null;
    }

    window.addEventListener('scroll', () => {
      if (!rafId) {
        rafId = requestAnimationFrame(updateParallax);
      }
    }, { passive: true });

    // Initial call
    updateParallax();
  }

  // ── HERO VIDEO PARALLAX ──
  const heroVideo = document.querySelector('.hero__video');
  if (heroVideo) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      heroVideo.style.transform = `translateY(${scrollY * 0.3}px)`;
    }, { passive: true });
  }

})();
