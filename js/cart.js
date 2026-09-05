import { State } from './state.js';
import { PRODUCTS } from './products.js';
import { UI } from './ui.js';

const CART_STORAGE_KEY = 'vortech-cart';
const FREE_SHIPPING_THRESHOLD = 5600;

const Cart = {
  init() {
    this.load();
    this.bindEvents();
  },

  load() {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const cart = JSON.parse(stored);
        State.set('cart', cart);
      }
    } catch (e) {
      console.warn('Failed to load cart from localStorage:', e);
    }
  },

  save() {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(State.get('cart')));
    } catch (e) {
      console.warn('Failed to save cart to localStorage:', e);
    }
  },

  add(productId, quantity = 1) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return false;

    const cart = [...State.get('cart')];
    const existingIndex = cart.findIndex(item => item.productId === productId);

    if (existingIndex >= 0) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({ productId, quantity });
    }

    State.set('cart', cart);
    this.save();
    UI.updateCartBadge(State.computed.cartCount);
    UI.toast(`Added ${product.name} to cart`, 'success');
    return true;
  },

  remove(productId) {
    const cart = State.get('cart').filter(item => item.productId !== productId);
    State.set('cart', cart);
    this.save();
    UI.updateCartBadge(State.computed.cartCount);
    this.render();
  },

  updateQuantity(productId, quantity) {
    if (quantity <= 0) {
      this.remove(productId);
      return;
    }

    const cart = [...State.get('cart')];
    const item = cart.find(item => item.productId === productId);
    if (item) {
      item.quantity = quantity;
      State.set('cart', cart);
      this.save();
      UI.updateCartBadge(State.computed.cartCount);
      this.render();
    }
  },

  clear() {
    State.set('cart', []);
    this.save();
    UI.updateCartBadge(0);
    this.render();
  },

  getItems() {
    const cart = State.get('cart');
    return cart.map(item => {
      const product = PRODUCTS.find(p => p.id === item.productId);
      return { ...item, product };
    }).filter(item => item.product);
  },

  getCount() {
    return State.computed.cartCount;
  },

  getSubtotal() {
    return State.computed.cartSubtotal;
  },

  getTotal() {
    return State.computed.cartTotal;
  },

  render() {
    const container = document.getElementById('cart-items');
    const subtotalEl = document.getElementById('cart-subtotal');
    const totalEl = document.getElementById('cart-total');
    const shippingEl = document.getElementById('cart-shipping');
    const checkoutBtn = document.getElementById('checkout-btn');

    const items = this.getItems();

    if (items.length === 0) {
      container.innerHTML = `
        <li class="cart-empty" style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:var(--space-8);text-align:center;color:var(--color-text-muted);">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="opacity:0.3;margin-bottom:var(--space-4);"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          <p>Your cart is empty</p>
          <a href="#catalog" class="btn btn--primary" style="margin-top:var(--space-4);" onclick="Cart.close()">Continue Shopping</a>
        </li>
      `;
      subtotalEl.textContent = '₱0';
      totalEl.textContent = '₱0';
      shippingEl.textContent = 'Calculated at checkout';
      checkoutBtn.disabled = true;
      return;
    }

    container.innerHTML = items.map(item => `
      <li class="cart-item" data-product-id="${item.productId}">
        <div class="cart-item__image">
          ${item.product.image}
        </div>
        <div class="cart-item__details">
          <span class="cart-item__name">${item.product.name}</span>
          <span class="cart-item__condition">
            ${item.product.condition === 'preowned' ? '<span class="badge badge--preowned" style="font-size:10px;padding:2px 6px;">Certified Pre-Owned</span>' : '<span class="badge badge--new" style="font-size:10px;padding:2px 6px;">Brand New</span>'}
          </span>
          <span class="cart-item__price">₱${(item.product.price * item.quantity).toLocaleString()}</span>
        </div>
        <div class="cart-item__controls">
          <button class="cart-item__qty-btn" data-qty="-1" aria-label="Decrease quantity">−</button>
          <span class="cart-item__qty">${item.quantity}</span>
          <button class="cart-item__qty-btn" data-qty="+1" aria-label="Increase quantity">+</button>
          <button class="cart-item__remove" data-remove aria-label="Remove ${item.product.name} from cart">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          </button>
        </div>
      </li>
    `).join('');

    const subtotal = this.getSubtotal();
    const total = this.getTotal();
    const shipping = subtotal >= 5600 ? 0 : 559;

    subtotalEl.textContent = `₱${subtotal.toLocaleString()}`;
    totalEl.textContent = `₱${total.toLocaleString()}`;
    shippingEl.textContent = shipping === 0 ? 'Free' : `₱${shipping.toLocaleString()}`;
    checkoutBtn.disabled = false;
  },

  open() {
    const drawer = document.getElementById('cart-drawer');
    const toggle = document.getElementById('cart-toggle');
    drawer.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    State.set('ui.isCartOpen', true);
    this.render();
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      const firstFocusable = drawer.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (firstFocusable) firstFocusable.focus();
    }, 100);
    UI.trapFocus(drawer.querySelector('.cart-drawer__panel'));
  },

  close() {
    const drawer = document.getElementById('cart-drawer');
    const toggle = document.getElementById('cart-toggle');
    drawer.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    State.set('ui.isCartOpen', false);
    document.body.style.overflow = '';
    toggle.focus();
  },

  toggle() {
    if (State.get('ui.isCartOpen')) this.close();
    else this.open();
  },

  bindEvents() {
    const drawer = document.getElementById('cart-drawer');
    const itemsContainer = document.getElementById('cart-items');

    document.getElementById('cart-toggle').addEventListener('click', () => this.toggle());
    document.getElementById('cart-drawer-close').addEventListener('click', () => this.close());
    drawer.querySelector('.cart-drawer__backdrop').addEventListener('click', () => this.close());

    itemsContainer.addEventListener('click', e => {
      const qtyBtn = e.target.closest('[data-qty]');
      const removeBtn = e.target.closest('[data-remove]');
      const item = e.target.closest('.cart-item');

      if (!item) return;
      const productId = item.dataset.productId;

      if (qtyBtn) {
        const delta = parseInt(qtyBtn.dataset.qty, 10);
        const currentQty = parseInt(item.querySelector('.cart-item__qty').textContent, 10);
        this.updateQuantity(productId, currentQty + delta);
      } else if (removeBtn) {
        this.remove(productId);
      }
    });

    document.getElementById('checkout-btn').addEventListener('click', () => {
      this.clear();
      this.close();
      UI.toast('Order placed successfully! (Demo)', 'success');
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && State.get('ui.isCartOpen')) {
        this.close();
      }
    });
  }
};

export { Cart };