/* ============================================================
   SECRET AESTHETICS — CAROUSEL
   carousel.js — Testimonials auto-rotate + gallery scroll
   ============================================================ */

'use strict';

(function() {

  // ── TESTIMONIALS CAROUSEL ──
  function initTestimonialsCarousel(wrapper) {
    const slides = wrapper.querySelectorAll('.testimonial-slide');
    const dotsContainer = wrapper.querySelector('.carousel-dots');
    const prevBtn = wrapper.querySelector('.carousel-arrow--prev');
    const nextBtn = wrapper.querySelector('.carousel-arrow--next');

    if (!slides.length) return;

    let current = 0;
    let autoTimer = null;

    // Create dots
    if (dotsContainer) {
      slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
        dot.addEventListener('click', () => goto(i));
        dotsContainer.appendChild(dot);
      });
    }

    function goto(index) {
      slides[current].classList.remove('active');
      slides[current].setAttribute('aria-hidden', 'true');
      dotsContainer?.querySelectorAll('.carousel-dot')[current]?.classList.remove('active');

      current = (index + slides.length) % slides.length;

      slides[current].classList.add('active');
      slides[current].setAttribute('aria-hidden', 'false');
      dotsContainer?.querySelectorAll('.carousel-dot')[current]?.classList.add('active');
    }

    function next() { goto(current + 1); }
    function prev() { goto(current - 1); }

    function startAuto() {
      stopAuto();
      autoTimer = setInterval(next, 5000);
    }
    function stopAuto() {
      clearInterval(autoTimer);
    }

    // Init first slide
    slides.forEach((s, i) => {
      s.classList.toggle('active', i === 0);
      s.setAttribute('aria-hidden', i !== 0 ? 'true' : 'false');
    });

    prevBtn?.addEventListener('click', () => { prev(); stopAuto(); startAuto(); });
    nextBtn?.addEventListener('click', () => { next(); stopAuto(); startAuto(); });

    // Pause on hover
    wrapper.addEventListener('mouseenter', stopAuto);
    wrapper.addEventListener('mouseleave', startAuto);
    wrapper.addEventListener('focusin', stopAuto);
    wrapper.addEventListener('focusout', startAuto);

    startAuto();

    // Keyboard
    wrapper.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { prev(); stopAuto(); startAuto(); }
      if (e.key === 'ArrowRight') { next(); stopAuto(); startAuto(); }
    });
  }

  document.querySelectorAll('.testimonials-carousel').forEach(initTestimonialsCarousel);

  // ── GALLERY HORIZONTAL SCROLL CAROUSEL ──
  function initScrollCarousel(wrapper) {
    const track = wrapper.querySelector('.carousel-track');
    const prevBtn = wrapper.querySelector('.carousel-arrow--prev');
    const nextBtn = wrapper.querySelector('.carousel-arrow--next');

    if (!track) return;

    const scrollAmount = track.offsetWidth * 0.8;

    prevBtn?.addEventListener('click', () => {
      track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    nextBtn?.addEventListener('click', () => {
      track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    // Drag to scroll
    let isDragging = false;
    let startX;
    let scrollLeft;

    track.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
      track.style.cursor = 'grabbing';
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
      track.style.cursor = '';
    });

    track.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 2;
      track.scrollLeft = scrollLeft - walk;
    });
  }

  document.querySelectorAll('.scroll-carousel').forEach(initScrollCarousel);

})();
