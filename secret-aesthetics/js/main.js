/* ============================================================
   SECRET AESTHETICS — MAIN JS
   main.js — Init, header scroll, page fade-in, mobile nav
   ============================================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // ── PAGE FADE IN ──
  requestAnimationFrame(() => {
    document.body.classList.add('loaded');
  });

  // ── HEADER SCROLL BEHAVIOUR ──
  const header = document.querySelector('.site-header');
  const pressBar = document.querySelector('.press-bar');
  const SCROLL_THRESHOLD = 80;

  let ticking = false;

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        if (header) {
          if (scrollY > SCROLL_THRESHOLD) {
            header.classList.add('scrolled');
          } else {
            header.classList.remove('scrolled');
          }
        }

        // Hide press bar on scroll
        if (pressBar) {
          if (scrollY > 20) {
            pressBar.style.transform = 'translateY(-100%)';
            pressBar.style.marginBottom = '-36px';
            if (header) header.style.top = '0';
          } else {
            pressBar.style.transform = '';
            pressBar.style.marginBottom = '';
            if (header) header.style.top = '';
          }
        }

        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // ── MOBILE HAMBURGER ──
  const hamburger = document.querySelector('.hamburger');
  const mobileOverlay = document.querySelector('.mobile-nav-overlay');
  const closeBtn = document.querySelector('.mobile-nav-close');

  function openMobileNav() {
    if (!mobileOverlay) return;
    mobileOverlay.classList.add('open');
    hamburger?.classList.add('open');
    document.body.style.overflow = 'hidden';
    // Move focus
    const firstLink = mobileOverlay.querySelector('.mobile-nav-link');
    firstLink?.focus();
  }

  function closeMobileNav() {
    if (!mobileOverlay) return;
    mobileOverlay.classList.remove('open');
    hamburger?.classList.remove('open');
    document.body.style.overflow = '';
    hamburger?.focus();
  }

  hamburger?.addEventListener('click', () => {
    if (mobileOverlay?.classList.contains('open')) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  });

  closeBtn?.addEventListener('click', closeMobileNav);

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (mobileOverlay?.classList.contains('open')) closeMobileNav();
    }
  });

  // ── MOBILE ACCORDION SUBNAVS ──
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link[data-toggle]');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      const targetId = link.dataset.toggle;
      const subnav = document.getElementById(targetId);
      if (!subnav) return;

      const isOpen = subnav.classList.contains('open');

      // Close all
      document.querySelectorAll('.mobile-subnav.open').forEach(el => el.classList.remove('open'));
      document.querySelectorAll('.mobile-nav-link.open').forEach(el => el.classList.remove('open'));

      if (!isOpen) {
        subnav.classList.add('open');
        link.classList.add('open');
      }
    });
  });

  // ── FOOTER MOBILE ACCORDION ──
  const footerColToggles = document.querySelectorAll('.footer-col-toggle');
  footerColToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const col = toggle.closest('.footer-col');
      col?.classList.toggle('open');
    });
  });

  // ── FLOATING DESKTOP BOOK NOW ──
  const floatingDesk = document.querySelector('.floating-cta-desktop');
  if (floatingDesk) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        floatingDesk.classList.add('visible');
      } else {
        floatingDesk.classList.remove('visible');
      }
    }, { passive: true });
  }

  // ── SMOOTH SCROLL FOR ANCHOR LINKS ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── PAGE TRANSITION ──
  const transition = document.querySelector('.page-transition');

  document.querySelectorAll('a:not([href^="#"]):not([href^="tel:"]):not([href^="mailto:"]):not([target="_blank"])').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('javascript')) return;

      e.preventDefault();
      if (transition) {
        transition.style.left = '-100%';
        transition.style.transition = 'none';
        void transition.offsetWidth;
        transition.style.transition = 'left 0.4s ease';
        transition.style.left = '100%';
      }

      setTimeout(() => {
        window.location.href = href;
      }, 300);
    });
  });

  // ── HERO CHEVRON SCROLL ──
  const chevron = document.querySelector('.hero-chevron');
  chevron?.addEventListener('click', () => {
    const hero = document.querySelector('.hero');
    const nextSection = hero?.nextElementSibling;
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  });

  // ── HERO CONTENT FADE ON SCROLL ──
  const heroContent = document.querySelector('.hero__content');
  if (heroContent) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const opacity = Math.max(0, 1 - scrollY / 400);
      const translateY = scrollY * 0.15;
      heroContent.style.opacity = opacity;
      heroContent.style.transform = `translateY(${translateY}px)`;
    }, { passive: true });
  }

  console.log('Secret Aesthetics — Main JS loaded ✓');
});
