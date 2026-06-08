/* ============================================================
   SECRET AESTHETICS — MICRO INTERACTIONS
   micro.js — Cursor, magnetic buttons, shimmer, page-transition
   ============================================================ */

'use strict';

(function() {

  // ── CUSTOM CURSOR (desktop pointer only) ──
  const isPointerFine = window.matchMedia('(pointer: fine)').matches;

  if (isPointerFine) {
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    cursor.setAttribute('aria-hidden', 'true');

    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    cursorDot.setAttribute('aria-hidden', 'true');

    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);

    let cx = -100, cy = -100;
    let dx = -100, dy = -100;
    let raf;

    function updateDot() {
      dx += (cx - dx) * 0.12;
      dy += (cy - dy) * 0.12;
      cursor.style.transform = `translate(${dx}px, ${dy}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(updateDot);
    }

    document.addEventListener('mousemove', (e) => {
      cx = e.clientX;
      cy = e.clientY;
      cursorDot.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
    });

    raf = requestAnimationFrame(updateDot);

    // Hover states
    document.querySelectorAll('a, button, [role="button"], .treatment-card, .doctor-card, .ba-slider').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('cursor--hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('cursor--hover'));
    });

    // Click state
    document.addEventListener('mousedown', () => cursor.classList.add('cursor--click'));
    document.addEventListener('mouseup', () => cursor.classList.remove('cursor--click'));

    // Hide on leave
    document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; cursorDot.style.opacity = '0'; });
    document.addEventListener('mouseenter', () => { cursor.style.opacity = '1'; cursorDot.style.opacity = '1'; });
  }

  // ── MAGNETIC BUTTON EFFECT ──
  const magneticBtns = document.querySelectorAll('.btn-primary, .btn-secondary, .header-book');

  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
      btn.style.transform = `translate(${x}px, ${y}px) scale(1.03)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  // ── GOLD GLOW on Primary CTAs ──
  document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.style.boxShadow = '0 0 22px rgba(200,169,110,0.35)';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.boxShadow = '';
    });
  });

  // ── NOISE TEXTURE (already in CSS via body::after) ──
  // This is handled purely via CSS for performance

  // ── LINK HOVER UNDERLINE SLIDE ──
  // Applied via CSS — no JS needed

  // ── CTA BUTTON RIPPLE ──
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const ripple = document.createElement('span');
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
        position: absolute;
        width: ${size}px; height: ${size}px;
        left: ${x}px; top: ${y}px;
        background: rgba(255,255,255,0.15);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.5s ease-out;
        pointer-events: none;
      `;

      btn.style.position = 'relative';
      btn.style.overflow = 'hidden';
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Add ripple keyframe
  if (!document.querySelector('#ripple-style')) {
    const style = document.createElement('style');
    style.id = 'ripple-style';
    style.textContent = `
      @keyframes ripple {
        to { transform: scale(2.5); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  // ── IMAGE CARD TILT EFFECT ──
  document.querySelectorAll('.treatment-card, .blog-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateX(${-y * 3}deg) rotateY(${x * 3}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

})();
