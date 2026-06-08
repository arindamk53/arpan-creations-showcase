/* ============================================================
   SECRET AESTHETICS — BEFORE/AFTER SLIDER
   before-after.js — Drag-reveal comparison slider
   ============================================================ */

'use strict';

(function() {
  function initSlider(slider) {
    const divider = slider.querySelector('.ba-slider__divider');
    const afterEl = slider.querySelector('.ba-slider__after');
    const handle  = slider.querySelector('.ba-slider__handle');

    if (!divider || !afterEl || !handle) return;

    let isDragging = false;
    let currentPct = 50;

    function setPosition(pct) {
      pct = Math.max(2, Math.min(98, pct));
      currentPct = pct;
      afterEl.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
      divider.style.left = `${pct}%`;
      handle.style.left = `${pct}%`;
      // ARIA
      slider.setAttribute('aria-valuenow', Math.round(pct));
    }

    function getPercent(e) {
      const rect = slider.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      return ((clientX - rect.left) / rect.width) * 100;
    }

    // Mouse events
    slider.addEventListener('mousedown', (e) => {
      isDragging = true;
      setPosition(getPercent(e));
      e.preventDefault();
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      setPosition(getPercent(e));
    });

    window.addEventListener('mouseup', () => { isDragging = false; });

    // Touch events
    slider.addEventListener('touchstart', (e) => {
      isDragging = true;
      setPosition(getPercent(e));
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      setPosition(getPercent(e));
    }, { passive: true });

    window.addEventListener('touchend', () => { isDragging = false; });

    // Keyboard accessibility
    slider.setAttribute('role', 'slider');
    slider.setAttribute('aria-valuemin', '0');
    slider.setAttribute('aria-valuemax', '100');
    slider.setAttribute('aria-valuenow', '50');
    slider.setAttribute('tabindex', '0');

    slider.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') setPosition(currentPct - 5);
      if (e.key === 'ArrowRight') setPosition(currentPct + 5);
      if (e.key === 'Home') setPosition(2);
      if (e.key === 'End') setPosition(98);
    });

    // Init at 50%
    setPosition(50);
  }

  // Init all sliders on page
  document.querySelectorAll('.ba-slider').forEach(initSlider);
})();
