/* ============================================================
   SECRET AESTHETICS — TABS
   tabs.js — Pricing tabs, treatment filter pills
   ============================================================ */

'use strict';

(function() {

  // ── PRICING TABS ──
  document.querySelectorAll('.tab-nav').forEach(nav => {
    const container = nav.closest('.tabs-component');
    const panels = container?.querySelectorAll('.tab-panel');

    nav.querySelectorAll('.tab-btn').forEach(btn => {
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', btn.classList.contains('active') ? 'true' : 'false');

      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;

        // Update buttons
        nav.querySelectorAll('.tab-btn').forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        // Update panels
        panels?.forEach(panel => {
          const isActive = panel.dataset.tab === target;
          panel.classList.toggle('active', isActive);
          panel.setAttribute('aria-hidden', !isActive ? 'true' : 'false');

          if (isActive) {
            panel.style.opacity = '0';
            panel.style.transform = 'translateY(8px)';
            requestAnimationFrame(() => {
              panel.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
              panel.style.opacity = '1';
              panel.style.transform = 'translateY(0)';
            });
          }
        });
      });
    });
  });

  // ── TREATMENT FILTER PILLS ──
  document.querySelectorAll('.filter-bar').forEach(bar => {
    const grid = document.querySelector('.treatments-filter-grid');
    const cards = grid?.querySelectorAll('[data-category]');

    bar.querySelectorAll('.filter-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        // Update active pill
        bar.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        const filter = pill.dataset.filter;

        // Filter cards
        cards?.forEach(card => {
          const cats = (card.dataset.category || '').toLowerCase();
          const show = filter === 'all' || cats.includes(filter.toLowerCase());

          card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          if (show) {
            card.style.display = '';
            requestAnimationFrame(() => {
              card.style.opacity = '1';
              card.style.transform = '';
            });
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
              if (!show) card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  });

  // ── GALLERY FILTER (same pattern) ──
  document.querySelectorAll('.gallery-filter-bar').forEach(bar => {
    const grid = document.querySelector('.gallery-grid');
    const items = grid?.querySelectorAll('[data-filter-cat]');

    bar.querySelectorAll('.filter-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        bar.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        const filter = pill.dataset.filter;

        items?.forEach(item => {
          const cats = (item.dataset.filterCat || '').toLowerCase();
          const show = filter === 'all' || cats.includes(filter.toLowerCase());
          item.style.display = show ? '' : 'none';
        });
      });
    });
  });

})();
