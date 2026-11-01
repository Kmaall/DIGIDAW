/**
 * DIGIDAW // Digital Directory of Arts and Words
 * 1. Theme Toggle (Light / Dark Mode)
 * 2. Portal Access Email Verification
 * 3. Author Matrix Search & Filtering
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initPortalVerification();
  initMatrixFilters();
});

/* ================= 1. THEME TOGGLE (LIGHT / DARK) ================= */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  const htmlEl = document.documentElement;
  const themeIcon = toggleBtn.querySelector('.theme-icon');
  const themeLabel = toggleBtn.querySelector('.theme-label');

  // Load saved preference from localStorage
  const savedTheme = localStorage.getItem('digidaw-theme') || 'light';
  applyTheme(savedTheme);

  toggleBtn.addEventListener('click', () => {
    const currentTheme = htmlEl.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
    localStorage.setItem('digidaw-theme', newTheme);
  });

  function applyTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    if (themeIcon && themeLabel) {
      if (theme === 'dark') {
        themeIcon.className = 'bi bi-sun-fill theme-icon';
        themeLabel.textContent = 'LIGHT MODE';
      } else {
        themeIcon.className = 'bi bi-moon-stars-fill theme-icon';
        themeLabel.textContent = 'DARK MODE';
      }
    }
  }
}

/* ================= 2. PORTAL EMAIL VERIFICATION ================= */
function initPortalVerification() {
  const form = document.getElementById('access-form');
  const emailInput = document.getElementById('portal-email');
  const keyInput = document.getElementById('portal-key');
  const tierSelect = document.getElementById('portal-tier');
  const consentCheck = document.getElementById('portal-consent');
  const alertBox = document.getElementById('portal-alert');
  const feedback = document.getElementById('email-feedback');
  const emailHint = document.getElementById('email-hint');

  if (!form || !emailInput) return;

  // Strict email regex format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

  function validateEmail() {
    const emailVal = emailInput.value.trim();
    const isValid = emailRegex.test(emailVal);

    if (!emailVal) {
      emailInput.classList.remove('is-valid', 'is-invalid');
      if (feedback) feedback.classList.add('d-none');
      if (emailHint) emailHint.textContent = 'MUST BE VALID EMAIL';
      return false;
    }

    if (isValid) {
      emailInput.classList.remove('is-invalid');
      emailInput.classList.add('is-valid');
      if (feedback) feedback.classList.add('d-none');
      if (emailHint) {
        emailHint.textContent = '✓ VALID FORMAT';
        emailHint.classList.add('text-success');
        emailHint.classList.remove('text-danger');
      }
      return true;
    } else {
      emailInput.classList.remove('is-valid');
      emailInput.classList.add('is-invalid');
      if (feedback) feedback.classList.remove('d-none');
      if (emailHint) {
        emailHint.textContent = '✗ INVALID EMAIL';
        emailHint.classList.add('text-danger');
        emailHint.classList.remove('text-success');
      }
      return false;
    }
  }

  emailInput.addEventListener('input', validateEmail);
  emailInput.addEventListener('blur', validateEmail);

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isEmailValid = validateEmail();
    const isKeyValid = keyInput && keyInput.value.trim().length >= 6;
    const isConsent = consentCheck && consentCheck.checked;

    if (!isEmailValid) {
      emailInput.focus();
      showAlert('danger', 'AUTHENTICATION REJECTED', 'Please enter a valid email format (e.g. reader@digidaw.org).');
      return;
    }

    if (!isKeyValid) {
      keyInput.focus();
      showAlert('danger', 'AUTHENTICATION REJECTED', 'The access key must contain at least 6 characters.');
      return;
    }

    if (!isConsent) {
      consentCheck.focus();
      showAlert('danger', 'PROTOCOL REQUIRED', 'You must agree to archive protocols before entering the vault.');
      return;
    }

    const tierName = tierSelect ? tierSelect.options[tierSelect.selectedIndex].text : 'STANDARD';
    const emailVal = emailInput.value.trim();
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> VERIFYING...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;

      showAlert('success', 'ACCESS GRANTED // IDENTITY VERIFIED', 
        `Welcome, <strong>${emailVal}</strong>. Security Clearance: <strong>${tierName}</strong>. You now have unrestricted access to the DIGIDAW archive.`
      );

      form.reset();
      emailInput.classList.remove('is-valid', 'is-invalid');
      if (emailHint) {
        emailHint.textContent = 'MUST BE VALID EMAIL';
        emailHint.className = 'text-ink-muted';
      }
    }, 600);
  });

  function showAlert(type, title, message) {
    if (!alertBox) return;

    alertBox.classList.remove('d-none');
    
    if (type === 'danger') {
      alertBox.style.backgroundColor = 'var(--accent-red)';
      alertBox.style.color = '#ffffff';
      alertBox.innerHTML = `
        <div class="d-flex align-items-center gap-3">
          <i class="bi bi-x-circle-fill fs-2"></i>
          <div>
            <h4 class="font-headline h5 mb-1 text-white">${title}</h4>
            <p class="mb-0 text-white font-mono small">${message}</p>
          </div>
        </div>
      `;
    } else {
      alertBox.style.backgroundColor = 'var(--accent-yellow)';
      alertBox.style.color = '#000000';
      alertBox.innerHTML = `
        <div class="d-flex align-items-center gap-3">
          <i class="bi bi-check-circle-fill fs-2 text-dark"></i>
          <div>
            <h4 class="font-headline h5 mb-1 text-dark">${title}</h4>
            <p class="mb-0 text-dark font-mono small">${message}</p>
          </div>
        </div>
      `;
    }

    alertBox.scrollIntoView({ behavior: 'smooth' });
  }
}

/* ================= 3. MATRIX LIVE SEARCH & FILTERING ================= */
function initMatrixFilters() {
  const searchInput = document.getElementById('matrix-search');
  const filterBtns = document.querySelectorAll('.matrix-filter-btn');
  const matrixRows = document.querySelectorAll('.matrix-row');

  if (!matrixRows.length) return;

  let activeCategory = 'all';
  let searchQuery = '';

  function applyMatrixFilters() {
    matrixRows.forEach(row => {
      const rowCategory = row.getAttribute('data-category') || '';
      const rowText = row.textContent.toLowerCase();

      const matchesCategory = (activeCategory === 'all' || rowCategory.includes(activeCategory));
      const matchesSearch = (!searchQuery || rowText.includes(searchQuery));

      row.style.display = (matchesCategory && matchesSearch) ? '' : 'none';
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      applyMatrixFilters();
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('btn-dark', 'active');
        b.classList.add('btn-outline-dark');
      });
      btn.classList.remove('btn-outline-dark');
      btn.classList.add('btn-dark', 'active');

      activeCategory = btn.getAttribute('data-filter') || 'all';
      applyMatrixFilters();
    });
  });
}
