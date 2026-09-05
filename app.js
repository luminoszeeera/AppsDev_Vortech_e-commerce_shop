import { State } from './js/state.js';
import { PRODUCTS, renderProducts, renderSkeletons } from './js/products.js';
import { Cart } from './js/cart.js';
import { Filters } from './js/filters.js';
import { UI } from './js/ui.js';

async function init() {
  State.set('products', PRODUCTS);
  renderSkeletons(8, document.getElementById('product-grid'));

  Cart.init();
  Filters.init();
  UI.init();

  const filtered = Filters.apply(PRODUCTS);
  renderProducts(filtered, document.getElementById('product-grid'));
  UI.updateProductCount(filtered.length);

  document.getElementById('cart-toggle').addEventListener('click', () => Cart.toggle());

  document.getElementById('product-grid').addEventListener('click', e => {
    const btn = e.target.closest('[data-add-to-cart]');
    if (btn) {
      Cart.add(btn.dataset.addToCart);
    }
  });

  document.getElementById('search-input').addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      e.target.blur();
      e.target.value = '';
      State.set('filters.searchQuery', '');
      Filters.apply(State.get('products'));
    }
  });

  console.log('VorTech Grid initialized');
}

document.addEventListener('DOMContentLoaded', init);