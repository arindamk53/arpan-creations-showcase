/* ============================================================
   SECRET AESTHETICS — LIGHTBOX
   lightbox.js — Gallery fullscreen lightbox
   ============================================================ */

'use strict';

(function() {
  let lightbox = null;
  let currentIndex = 0;
  let items = [];

  function createLightbox() {
  // Determine relative path back to project root
  let rootPath = './';
  const path = window.location.pathname;
  if (path.includes('/treatment/endolift/')) {
    rootPath = '../../';
  } else if (path.includes('/blog/') || path.includes('/book-online/') || path.includes('/contact/') || path.includes('/faq/') || path.includes('/gallery/') || path.includes('/prices/') || path.includes('/the-clinic/') || path.includes('/treatments/')) {
    rootPath = '../';
  }

    const lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', 'Before and after result');
    lb.innerHTML = `
      <button class="lightbox__close" aria-label="Close lightbox">✕</button>
      <button class="carousel-arrow carousel-arrow--prev lightbox-prev" aria-label="Previous result">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="15,18 9,12 15,6"/>
        </svg>
      </button>
      <button class="carousel-arrow carousel-arrow--next lightbox-next" aria-label="Next result">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9,6 15,12 9,18"/>
        </svg>
      </button>
      <div class="lightbox__content" style="width:min(800px, 90vw); max-height:80vh; display:flex; flex-direction:column; gap:24px;">
        <div class="lightbox__slider" style="flex:1; position:relative; border-radius:8px; overflow:hidden;"></div>
        <div class="lightbox__info" style="background:var(--color-bg-card); border-radius:8px; padding:24px; display:flex; align-items:center; justify-content:space-between; gap:16px;">
          <div>
            <p class="lightbox__treatment" style="font-family:var(--font-feature); font-size:20px; color:var(--color-text); margin-bottom:4px;"></p>
            <p class="lightbox__doctor" style="font-size:12px; color:var(--color-gold); text-transform:uppercase; letter-spacing:0.15em;"></p>
          </div>
          <a href="${rootPath}book-online/index.html" class="btn btn-primary" style="white-space:nowrap;">Book This →</a>
        </div>
      </div>
    `;
    document.body.appendChild(lb);

    // Close handlers
    lb.querySelector('.lightbox__close').addEventListener('click', close);
    lb.querySelector('.lightbox-prev').addEventListener('click', () => show(currentIndex - 1));
    lb.querySelector('.lightbox-next').addEventListener('click', () => show(currentIndex + 1));
    lb.addEventListener('click', (e) => { if (e.target === lb) close(); });

    document.addEventListener('keydown', (e) => {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(currentIndex - 1);
      if (e.key === 'ArrowRight') show(currentIndex + 1);
    });

    return lb;
  }

  function open(index) {
    if (!lightbox) lightbox = createLightbox();
    document.body.style.overflow = 'hidden';
    lightbox.classList.add('open');
    show(index);
    // Focus close btn
    setTimeout(() => lightbox.querySelector('.lightbox__close')?.focus(), 100);
  }

  function close() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    // Restore focus to trigger element
    items[currentIndex]?.trigger?.focus();
  }

  function show(index) {
    currentIndex = (index + items.length) % items.length;
    const item = items[currentIndex];
    if (!item || !lightbox) return;

    // Build before/after slider in lightbox
    const sliderEl = lightbox.querySelector('.lightbox__slider');
    sliderEl.style.aspectRatio = '4/3';
    sliderEl.innerHTML = `
      <div class="ba-slider" style="width:100%; height:100%; position:relative;">
        <div class="ba-slider__before" style="position:absolute; inset:0;">
          <img src="${item.before}" alt="Before" style="width:100%;height:100%;object-fit:cover;">
        </div>
        <div class="ba-slider__after" style="position:absolute; inset:0; clip-path:inset(0 50% 0 0);">
          <img src="${item.after}" alt="After" style="width:100%;height:100%;object-fit:cover;">
        </div>
        <div class="ba-slider__divider" style="position:absolute; top:0; bottom:0; left:50%; width:2px; background:var(--color-gold); transform:translateX(-50%); z-index:3;"></div>
        <div class="ba-slider__handle" style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:44px; height:44px; background:var(--color-gold); border-radius:50%; display:flex; align-items:center; justify-content:center; z-index:4; color:var(--color-bg); font-size:12px; font-weight:700;">◀▶</div>
        <span class="ba-label ba-label--before">BEFORE</span>
        <span class="ba-label ba-label--after">AFTER</span>
      </div>
    `;

    // Re-init slider
    const script = document.querySelector('script[src*="before-after"]');
    if (window.__baInit) window.__baInit(sliderEl.querySelector('.ba-slider'));

    // Update info
    lightbox.querySelector('.lightbox__treatment').textContent = item.treatment || '';
    lightbox.querySelector('.lightbox__doctor').textContent = item.doctor ? `Dr ${item.doctor}` : '';
  }

  // ── EXPOSE INIT ──
  window.initGalleryLightbox = function(galleryItems) {
    items = galleryItems;
    document.querySelectorAll('.gallery-item[data-lightbox]').forEach((el, i) => {
      el.addEventListener('click', () => open(i));
      el.setAttribute('tabindex', '0');
      el.setAttribute('role', 'button');
      el.setAttribute('aria-label', `View ${galleryItems[i]?.treatment || 'result'} before and after`);
      items[i] = { ...items[i], trigger: el };

      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); }
      });
    });
  };

  // Init BA slider in lightbox
  window.__baInit = function(slider) {
    const divider = slider.querySelector('.ba-slider__divider');
    const afterEl = slider.querySelector('.ba-slider__after');
    const handle  = slider.querySelector('.ba-slider__handle');
    let isDragging = false;
    let pct = 50;

    function setPos(p) {
      pct = Math.max(2, Math.min(98, p));
      if (afterEl) afterEl.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
      if (divider) divider.style.left = `${pct}%`;
      if (handle) handle.style.left = `${pct}%`;
    }

    function getPct(e) {
      const rect = slider.getBoundingClientRect();
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      return ((x - rect.left) / rect.width) * 100;
    }

    slider.addEventListener('mousedown', (e) => { isDragging = true; setPos(getPct(e)); e.preventDefault(); });
    window.addEventListener('mousemove', (e) => { if (isDragging) setPos(getPct(e)); });
    window.addEventListener('mouseup', () => { isDragging = false; });
    slider.addEventListener('touchstart', (e) => { isDragging = true; setPos(getPct(e)); }, { passive: true });
    window.addEventListener('touchmove', (e) => { if (isDragging) setPos(getPct(e)); }, { passive: true });
    window.addEventListener('touchend', () => { isDragging = false; });
    setPos(50);
  };

})();
