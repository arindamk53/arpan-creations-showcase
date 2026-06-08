/* ============================================================
   SECRET AESTHETICS — COOKIE CONSENT MANAGER
   cookies.js — GDPR/UK PECR compliant consent layer
   ============================================================ */

'use strict';

(function() {

  const STORAGE_KEY = 'sa_consent';
  const STORAGE_VERSION = '1';
  const EXPIRY_DAYS = 365;

  // ── READ STORED CONSENT ──
  function getConsent() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      // Check version and expiry
      if (data.version !== STORAGE_VERSION) return null;
      if (data.expires && Date.now() > data.expires) return null;
      return data;
    } catch {
      return null;
    }
  }

  // ── STORE CONSENT ──
  function setConsent(level, prefs = {}) {
    const expires = Date.now() + (EXPIRY_DAYS * 24 * 60 * 60 * 1000);
    const data = {
      version: STORAGE_VERSION,
      level,      // 'all' | 'necessary'
      prefs,      // { analytics: bool, marketing: bool, functional: bool }
      expires,
      timestamp: new Date().toISOString()
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {}
  }

  // ── INJECT ANALYTICS (only after consent) ──
  function injectGA4() {
    // Replace with actual GA4 ID before launch
    const GA4_ID = 'G-XXXXXXXXXX';
    if (document.querySelector(`script[src*="${GA4_ID}"]`)) return;

    const s1 = document.createElement('script');
    s1.async = true;
    s1.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
    document.head.appendChild(s1);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function() { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA4_ID, { anonymize_ip: true });
  }

  // ── APPLY CONSENT ──
  function applyConsent(consent) {
    if (!consent) return;

    if (consent.level === 'all' || consent.prefs?.analytics) {
      injectGA4();
    }

    // Unblock Vimeo cookies if analytics accepted
    if (consent.level === 'all' || consent.prefs?.functional) {
      document.querySelectorAll('[data-vimeo-deferred]').forEach(el => {
        const src = el.dataset.vimeoDeferred;
        if (src) {
          el.setAttribute('src', src);
          el.removeAttribute('data-vimeo-deferred');
        }
      });
    }
  }

  // ── CREATE BANNER HTML ──
  function createBanner() {
    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-modal', 'true');
    banner.setAttribute('aria-label', 'Cookie consent');
    banner.innerHTML = `
      <div class="cookie-banner__inner">
        <div class="cookie-banner__text">
          <p class="cookie-banner__title">We value your privacy</p>
          <p class="cookie-banner__body">
            We use cookies to enhance your experience, analyse site traffic, and personalise content.
            By accepting, you consent to our use of cookies. Learn more in our
            <a href="${rootPath}cookies/index.html">Cookie Policy</a> and <a href="${rootPath}privacy/index.html">Privacy Policy</a>.
          </p>
        </div>
        <div class="cookie-banner__actions">
          <button class="cookie-btn cookie-btn--accept" id="cookie-accept-all">Accept All</button>
          <button class="cookie-btn cookie-btn--necessary" id="cookie-necessary">Necessary Only</button>
          <button class="cookie-btn cookie-btn--manage" id="cookie-manage">Manage Preferences</button>
        </div>
      </div>
    `;
    return banner;
  }

  // ── CREATE PREFERENCES MODAL HTML ──
  function createModal() {
    const modal = document.createElement('div');
    modal.className = 'cookie-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'cookie-modal-title');
    modal.innerHTML = `
      <div class="cookie-modal__box">
        <h2 class="cookie-modal__title" id="cookie-modal-title">Cookie Preferences</h2>
        <p style="font-size:13px;color:var(--color-text-60);margin-bottom:24px;line-height:1.6;">
          Choose which cookies you allow. Necessary cookies are always active as they are required for the website to function properly.
        </p>

        <div class="cookie-pref">
          <div class="cookie-pref__info">
            <p class="cookie-pref__name">Necessary Cookies</p>
            <p class="cookie-pref__desc">Essential for the website to function. Cannot be disabled.</p>
          </div>
          <label class="toggle" aria-label="Necessary cookies">
            <input type="checkbox" checked disabled>
            <span class="toggle-slider"></span>
          </label>
        </div>

        <div class="cookie-pref">
          <div class="cookie-pref__info">
            <p class="cookie-pref__name">Analytics Cookies</p>
            <p class="cookie-pref__desc">Help us understand how visitors interact with our website via Google Analytics.</p>
          </div>
          <label class="toggle" aria-label="Analytics cookies">
            <input type="checkbox" id="pref-analytics">
            <span class="toggle-slider"></span>
          </label>
        </div>

        <div class="cookie-pref">
          <div class="cookie-pref__info">
            <p class="cookie-pref__name">Functional Cookies</p>
            <p class="cookie-pref__desc">Enable enhanced features including video playback and booking tools.</p>
          </div>
          <label class="toggle" aria-label="Functional cookies">
            <input type="checkbox" id="pref-functional">
            <span class="toggle-slider"></span>
          </label>
        </div>

        <div class="cookie-pref" style="border-bottom:none;padding-bottom:0;">
          <div class="cookie-pref__info">
            <p class="cookie-pref__name">Marketing Cookies</p>
            <p class="cookie-pref__desc">Used to deliver relevant advertisements and track campaign effectiveness.</p>
          </div>
          <label class="toggle" aria-label="Marketing cookies">
            <input type="checkbox" id="pref-marketing">
            <span class="toggle-slider"></span>
          </label>
        </div>

        <div style="display:flex;gap:12px;margin-top:32px;flex-wrap:wrap;">
          <button class="cookie-btn cookie-btn--accept" id="cookie-save-prefs" style="flex:1;">Save Preferences</button>
          <button class="cookie-btn cookie-btn--necessary" id="cookie-modal-close" style="flex:1;">Cancel</button>
        </div>
      </div>
    `;
    return modal;
  }

  // ── INIT ──
  function init() {
  // Determine relative path back to project root
  let rootPath = './';
  const path = window.location.pathname;
  if (path.includes('/treatment/endolift/')) {
    rootPath = '../../';
  } else if (path.includes('/blog/') || path.includes('/book-online/') || path.includes('/contact/') || path.includes('/faq/') || path.includes('/gallery/') || path.includes('/prices/') || path.includes('/the-clinic/') || path.includes('/treatments/')) {
    rootPath = '../';
  }

    const existing = getConsent();

    if (existing) {
      // Consent already given — apply immediately
      applyConsent(existing);
      return;
    }

    // Show banner after short delay
    const banner = createBanner();
    const modal = createModal();
    document.body.appendChild(banner);
    document.body.appendChild(modal);

    // Show banner
    requestAnimationFrame(() => {
      setTimeout(() => banner.classList.add('visible'), 800);
    });

    // Accept all
    document.getElementById('cookie-accept-all')?.addEventListener('click', () => {
      setConsent('all', { analytics: true, functional: true, marketing: true });
      applyConsent({ level: 'all', prefs: { analytics: true, functional: true, marketing: true } });
      banner.classList.remove('visible');
      setTimeout(() => banner.remove(), 400);
    });

    // Necessary only
    document.getElementById('cookie-necessary')?.addEventListener('click', () => {
      setConsent('necessary', { analytics: false, functional: false, marketing: false });
      banner.classList.remove('visible');
      setTimeout(() => banner.remove(), 400);
    });

    // Open manage modal
    document.getElementById('cookie-manage')?.addEventListener('click', () => {
      modal.classList.add('open');
      document.getElementById('pref-analytics')?.focus();
    });

    // Close modal
    document.getElementById('cookie-modal-close')?.addEventListener('click', () => {
      modal.classList.remove('open');
    });

    // Close modal on backdrop click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('open');
    });

    // Save preferences
    document.getElementById('cookie-save-prefs')?.addEventListener('click', () => {
      const prefs = {
        analytics: document.getElementById('pref-analytics')?.checked || false,
        functional: document.getElementById('pref-functional')?.checked || false,
        marketing: document.getElementById('pref-marketing')?.checked || false,
      };
      const level = (prefs.analytics && prefs.functional && prefs.marketing) ? 'all' : 'custom';
      setConsent(level, prefs);
      applyConsent({ level, prefs });
      modal.classList.remove('open');
      banner.classList.remove('visible');
      setTimeout(() => banner.remove(), 400);
    });

    // Keyboard trap in modal
    modal.addEventListener('keydown', (e) => {
      if (!modal.classList.contains('open')) return;
      if (e.key === 'Escape') {
        modal.classList.remove('open');
      }
      if (e.key === 'Tab') {
        const focusable = modal.querySelectorAll('button, input, a');
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) { last.focus(); e.preventDefault(); }
        } else {
          if (document.activeElement === last) { first.focus(); e.preventDefault(); }
        }
      }
    });
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
