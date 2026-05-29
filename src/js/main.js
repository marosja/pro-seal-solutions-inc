/* Pro Seal Solutions Inc. — Main JavaScript */

(function () {
  'use strict';

  // ── Mobile navigation ────────────────────────────────
  const header = document.getElementById('site-header');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelectorAll('.nav-list a');

  function closeNav() {
    header.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  if (navToggle) {
    navToggle.addEventListener('click', function () {
      const isOpen = header.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', closeNav);
  });

  document.addEventListener('click', function (e) {
    if (header.classList.contains('nav-open') && !header.contains(e.target)) {
      closeNav();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && header.classList.contains('nav-open')) {
      closeNav();
      navToggle.focus();
    }
  });

  // ── Footer year ──────────────────────────────────────
  var yrEl = document.getElementById('footer-year');
  if (yrEl) yrEl.textContent = new Date().getFullYear();

  // ── File upload validation ───────────────────────────
  const MAX_FILES = 5;
  const MAX_FILE_MB = 5;
  const MAX_TOTAL_MB = 15;
  const ALLOWED_EXT = ['jpg', 'jpeg', 'png', 'webp', 'heic', 'pdf'];
  const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif', 'application/pdf'];

  var fileInput = document.getElementById('photos');
  var fileListEl = document.getElementById('file-list');
  var fileUploadArea = document.getElementById('file-upload-area');

  function getFileExt(name) {
    return name.split('.').pop().toLowerCase();
  }

  function formatMB(bytes) {
    return (bytes / 1024 / 1024).toFixed(1);
  }

  function validateFiles(files) {
    var errors = [];
    var arr = Array.from(files);

    if (arr.length > MAX_FILES) {
      errors.push('Maximum ' + MAX_FILES + ' files allowed.');
      return errors;
    }

    var totalBytes = 0;
    arr.forEach(function (file) {
      totalBytes += file.size;
      var ext = getFileExt(file.name);
      var mimeOk = ALLOWED_MIME.indexOf(file.type) !== -1;
      var extOk = ALLOWED_EXT.indexOf(ext) !== -1;
      if (!mimeOk && !extOk) {
        errors.push('"' + file.name + '" is not an accepted file type.');
      }
      if (file.size > MAX_FILE_MB * 1024 * 1024) {
        errors.push('"' + file.name + '" exceeds ' + MAX_FILE_MB + ' MB.');
      }
    });

    if (totalBytes > MAX_TOTAL_MB * 1024 * 1024) {
      errors.push('Total upload size exceeds ' + MAX_TOTAL_MB + ' MB.');
    }
    return errors;
  }

  function renderFileList(files, errors) {
    fileListEl.innerHTML = '';
    if (errors.length) {
      errors.forEach(function (err) {
        var li = document.createElement('li');
        li.className = 'file-error';
        li.textContent = '⚠ ' + err;
        fileListEl.appendChild(li);
      });
    } else {
      Array.from(files).forEach(function (file) {
        var li = document.createElement('li');
        li.textContent = '✓ ' + file.name + ' (' + formatMB(file.size) + ' MB)';
        fileListEl.appendChild(li);
      });
    }
  }

  if (fileInput) {
    fileInput.addEventListener('change', function () {
      var errors = validateFiles(this.files);
      renderFileList(this.files, errors);
      if (errors.length) this.value = '';
    });

    // Drag-and-drop visual feedback
    if (fileUploadArea) {
      fileUploadArea.addEventListener('dragover', function (e) {
        e.preventDefault();
        fileUploadArea.style.borderColor = 'var(--accent)';
      });
      fileUploadArea.addEventListener('dragleave', function () {
        fileUploadArea.style.borderColor = '';
      });
      fileUploadArea.addEventListener('drop', function (e) {
        e.preventDefault();
        fileUploadArea.style.borderColor = '';
        if (e.dataTransfer.files.length) {
          fileInput.files = e.dataTransfer.files;
          var errors = validateFiles(fileInput.files);
          renderFileList(fileInput.files, errors);
          if (errors.length) fileInput.value = '';
        }
      });
    }
  }

  // ── Quote form ───────────────────────────────────────
  var form = document.getElementById('quote-form');
  var submitBtn = document.getElementById('submit-btn');
  var successMsg = document.getElementById('form-success');
  var errorMsg = document.getElementById('form-error');
  var errorMsgText = document.getElementById('form-error-text');

  function setGroupError(groupId, errorId, message) {
    var group = document.getElementById(groupId);
    var errEl = document.getElementById(errorId);
    if (group) group.classList.add('has-error');
    if (errEl) errEl.textContent = message;
  }

  function clearFormErrors() {
    form.querySelectorAll('.has-error').forEach(function (el) {
      el.classList.remove('has-error');
    });
    form.querySelectorAll('.field-error').forEach(function (el) {
      el.textContent = '';
    });
  }

  function validateForm() {
    clearFormErrors();
    var valid = true;
    var firstInvalid = null;

    function fail(groupId, errorId, msg, field) {
      setGroupError(groupId, errorId, msg);
      if (!firstInvalid) firstInvalid = field || document.getElementById(groupId);
      valid = false;
    }

    var name = form.elements['name'];
    if (!name || !name.value.trim() || name.value.trim().length < 2) {
      fail('name-group', 'name-error', 'Please enter your name (at least 2 characters).', name);
    }

    var phone = form.elements['phone'];
    var phoneDigits = phone ? phone.value.replace(/\D/g, '') : '';
    if (!phone || phoneDigits.length < 10 || phoneDigits.length > 15) {
      fail('phone-group', 'phone-error', 'Please enter a valid phone number.', phone);
    }

    var email = form.elements['email'];
    var emailVal = email ? email.value.trim() : '';
    if (!email || !emailVal || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(emailVal)) {
      fail('email-group', 'email-error', 'Please enter a valid email address.', email);
    }

    var loc = form.elements['project_location'];
    if (!loc || !loc.value.trim() || loc.value.trim().length < 2) {
      fail('location-group', 'location-error', 'Please enter the project location.', loc);
    }

    var service = form.elements['service_type'];
    if (!service || !service.value) {
      fail('service-group', 'service-error', 'Please select the type of work.', service);
    }

    var msg = form.elements['message'];
    if (!msg || msg.value.trim().length < 10) {
      fail('message-group', 'message-error', 'Please describe your project (at least 10 characters).', msg);
    }

    var consent = form.elements['contact_consent'];
    if (!consent || !consent.checked) {
      fail('consent-group', 'consent-error', 'Please agree to be contacted before submitting.');
    }

    if (firstInvalid && firstInvalid.focus) {
      firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
      firstInvalid.focus({ preventScroll: true });
    }

    return valid;
  }

  function setSubmitting(isSubmitting) {
    if (submitBtn) {
      submitBtn.disabled = isSubmitting;
      submitBtn.textContent = isSubmitting ? 'Sending…' : 'Request a Free Quote';
    }
  }

  function showSuccess() {
    if (successMsg) {
      successMsg.hidden = false;
      successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  function showError(message) {
    if (errorMsg && errorMsgText) {
      errorMsgText.textContent = message || 'Something went wrong and your request was not sent. Please try again or contact us directly by phone or email.';
      errorMsg.hidden = false;
      errorMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      // Honeypot check (client-side gate)
      var hp = form.elements['website'];
      if (hp && hp.value) return;

      if (!validateForm()) return;

      if (successMsg) successMsg.hidden = true;
      if (errorMsg) errorMsg.hidden = true;

      setSubmitting(true);

      try {
        var data = new FormData(form);
        var response = await fetch('/api/quote', {
          method: 'POST',
          body: data,
        });

        var result;
        try {
          result = await response.json();
        } catch (_) {
          result = { success: false };
        }

        if (result && result.success) {
          showSuccess();
          form.reset();
          if (fileListEl) fileListEl.innerHTML = '';
          // Reset Turnstile if available
          if (window.turnstile) window.turnstile.reset();
        } else {
          showError(result && result.message);
        }
      } catch (err) {
        showError();
      } finally {
        setSubmitting(false);
      }
    });

    // Real-time validation on blur for better UX
    form.querySelectorAll('.form-control').forEach(function (field) {
      field.addEventListener('blur', function () {
        var group = field.closest('.form-group');
        if (group && group.classList.contains('has-error')) {
          // Re-validate field on blur after error shown
          group.classList.remove('has-error');
          var errEl = group.querySelector('.field-error');
          if (errEl) errEl.textContent = '';
        }
      });
    });
  }
})();
