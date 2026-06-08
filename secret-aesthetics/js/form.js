/* ============================================================
   SECRET AESTHETICS — FORM VALIDATION
   form.js — Contact/booking form validation + submit states
   ============================================================ */

'use strict';

(function() {

  function validateField(field) {
    const group = field.closest('.form-group');
    if (!group) return true;

    const value = field.value.trim();
    const required = field.hasAttribute('required');
    const type = field.type;

    let valid = true;
    let errorMsg = '';

    if (required && !value) {
      valid = false;
      errorMsg = 'This field is required.';
    } else if (value) {
      if (type === 'email') {
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRe.test(value)) {
          valid = false;
          errorMsg = 'Please enter a valid email address.';
        }
      } else if (type === 'tel') {
        const telRe = /^[\d\s\+\-\(\)]{7,20}$/;
        if (!telRe.test(value)) {
          valid = false;
          errorMsg = 'Please enter a valid phone number.';
        }
      }
    }

    // Update UI
    group.classList.toggle('has-error', !valid);
    field.setAttribute('aria-invalid', !valid ? 'true' : 'false');

    let errorEl = group.querySelector('.form-error');
    if (!errorEl && !valid) {
      errorEl = document.createElement('p');
      errorEl.className = 'form-error';
      errorEl.setAttribute('aria-live', 'polite');
      const errId = `err-${Math.random().toString(36).slice(2)}`;
      errorEl.id = errId;
      field.setAttribute('aria-describedby', errId);
      group.appendChild(errorEl);
    }
    if (errorEl) {
      errorEl.textContent = errorMsg;
      errorEl.style.display = valid ? 'none' : 'block';
    }

    return valid;
  }

  function setupForm(form) {
    const submitBtn = form.querySelector('[type="submit"]');
    const successEl = form.querySelector('.form-success');

    // Live validation on blur
    form.querySelectorAll('.form-field').forEach(field => {
      field.addEventListener('blur', () => validateField(field));
      field.addEventListener('input', () => {
        if (field.closest('.form-group')?.classList.contains('has-error')) {
          validateField(field);
        }
      });
    });

    // Checkbox validation
    const consentCheckbox = form.querySelector('.consent-checkbox');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Validate all fields
      let allValid = true;
      form.querySelectorAll('.form-field[required]').forEach(field => {
        if (!validateField(field)) allValid = false;
      });

      if (consentCheckbox && !consentCheckbox.checked) {
        allValid = false;
        const group = consentCheckbox.closest('.form-group');
        if (group) {
          group.classList.add('has-error');
          let err = group.querySelector('.form-error');
          if (!err) {
            err = document.createElement('p');
            err.className = 'form-error';
            group.appendChild(err);
          }
          err.textContent = 'Please consent to be contacted before submitting.';
          err.style.display = 'block';
        }
      }

      if (!allValid) {
        // Scroll to first error
        const firstError = form.querySelector('.has-error .form-field');
        firstError?.focus();
        return;
      }

      // Loading state
      const originalText = submitBtn?.textContent;
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        submitBtn.style.opacity = '0.7';
      }

      try {
        // Simulate form submission (replace with actual fetch/endpoint)
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Success state
        if (submitBtn) {
          submitBtn.textContent = '✓ Message Sent';
          submitBtn.style.background = 'var(--color-success)';
          submitBtn.style.opacity = '1';
        }

        if (successEl) {
          successEl.style.display = 'block';
          successEl.style.animation = 'fadeInUp 0.5s ease-out';
        }

        // Redirect after success if configured
        const redirect = form.dataset.successRedirect;
        if (redirect) {
          setTimeout(() => { window.location.href = redirect; }, 2000);
        }

        // Reset after delay
        setTimeout(() => {
          form.reset();
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            submitBtn.style.opacity = '';
          }
          if (successEl) successEl.style.display = 'none';
        }, 4000);

      } catch (err) {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Error — Try Again';
          submitBtn.style.background = 'var(--color-error)';
          submitBtn.style.opacity = '1';
        }
        setTimeout(() => {
          if (submitBtn) {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            submitBtn.style.opacity = '';
          }
        }, 3000);
      }
    });
  }

  // Init all forms
  document.querySelectorAll('.sa-form').forEach(setupForm);

})();
