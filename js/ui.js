const UI = {
  toast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'polite');
    toast.innerHTML = `
      <span class="toast__message">${message}</span>
      <button class="toast__close" aria-label="Dismiss">&times;</button>
    `;
    container.appendChild(toast);

    toast.querySelector('.toast__close').addEventListener('click', () => this.dismissToast(toast));
    setTimeout(() => this.dismissToast(toast), 4000);
  },

  dismissToast(toast) {
    toast.style.animation = 'slideUp var(--transition-base) reverse forwards';
    setTimeout(() => toast.remove(), 250);
  },

  updateCartBadge(count) {
    const badge = document.querySelector('.cart-toggle__badge');
    if (badge) {
      badge.textContent = count > 99 ? '99+' : count;
      badge.style.transform = 'scale(1.2)';
      setTimeout(() => { badge.style.transform = 'scale(1)'; }, 150);
    }
  },

  updateProductCount(count) {
    const countEl = document.getElementById('product-count');
    if (countEl) countEl.textContent = count;
  },

  toggleMobileMenu(open) {
    const nav = document.querySelector('.nav');
    const toggle = document.getElementById('mobile-menu-toggle');
    if (open === undefined) open = !nav.classList.contains('is-open');
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  },

  toggleFilters(open) {
    const filters = document.getElementById('filters');
    const toggle = document.getElementById('filters-toggle');
    if (open === undefined) open = !filters.classList.contains('is-open');
    filters.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open);
    if (open) {
      document.body.style.overflow = 'hidden';
      const firstFocusable = filters.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (firstFocusable) firstFocusable.focus();
    } else {
      document.body.style.overflow = '';
    }
  },

  toggleCart(open) {
    import('./cart.js').then(({ Cart }) => {
      if (open === undefined) open = !Cart.state?.ui?.isCartOpen;
      if (open) Cart.open();
      else Cart.close();
    });
  },

  formatCurrency(amount) {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  },

  debounce(fn, delay) {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
  },

  trapFocus(element) {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    function handleTab(e) {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }

    element.addEventListener('keydown', handleTab);
    return () => element.removeEventListener('keydown', handleTab);
  },

  announce(message) {
    const announcer = document.createElement('div');
    announcer.setAttribute('role', 'status');
    announcer.setAttribute('aria-live', 'polite');
    announcer.className = 'visually-hidden';
    announcer.textContent = message;
    document.body.appendChild(announcer);
    setTimeout(() => announcer.remove(), 1000);
  },

  init() {
    document.getElementById('mobile-menu-toggle').addEventListener('click', () => this.toggleMobileMenu());
    document.getElementById('filters-toggle').addEventListener('click', () => this.toggleFilters());
    document.getElementById('filters-close').addEventListener('click', () => this.toggleFilters(false));

    document.addEventListener('click', e => {
      if (e.target.closest('.nav__link')) {
        this.toggleMobileMenu(false);
      }
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        if (document.querySelector('.nav.is-open')) this.toggleMobileMenu(false);
        if (document.querySelector('.filters.is-open')) this.toggleFilters(false);
      }
    });
  }
};

export { UI };