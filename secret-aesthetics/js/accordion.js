/* ============================================================
   SECRET AESTHETICS — ACCORDION
   accordion.js — FAQ accordion with smooth animation
   ============================================================ */

'use strict';

(function() {
  document.querySelectorAll('.accordion').forEach(accordion => {
    const items = accordion.querySelectorAll('.accordion-item');

    items.forEach(item => {
      const header = item.querySelector('.accordion-header');
      const body = item.querySelector('.accordion-body');

      if (!header || !body) return;

      // Set up ARIA
      const id = Math.random().toString(36).slice(2);
      header.setAttribute('aria-expanded', 'false');
      header.setAttribute('aria-controls', `accordion-body-${id}`);
      header.setAttribute('id', `accordion-header-${id}`);
      body.setAttribute('id', `accordion-body-${id}`);
      body.setAttribute('role', 'region');
      body.setAttribute('aria-labelledby', `accordion-header-${id}`);

      header.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // Close all others (optional — set to false for multiple open)
        const closeOthers = true;
        if (closeOthers) {
          items.forEach(other => {
            if (other !== item && other.classList.contains('open')) {
              other.classList.remove('open');
              other.querySelector('.accordion-header')?.setAttribute('aria-expanded', 'false');
            }
          });
        }

        item.classList.toggle('open', !isOpen);
        header.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
      });

      // Keyboard support
      header.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          header.click();
        }
      });
    });
  });
})();
