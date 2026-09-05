const State = (function() {
  const state = {
    products: [],
    filteredProducts: [],
    cart: [],
    filters: {
      categories: new Set(['desktops', 'gpus', 'cpus', 'ram', 'storage', 'preowned']),
      priceMin: 0,
      priceMax: 300000,
      condition: 'all',
      searchQuery: ''
    },
    ui: {
      isCartOpen: false,
      isFiltersOpen: false,
      isMobileMenuOpen: false
    }
  };

  const subscribers = new Map();

  function notify(key) {
    const callbacks = subscribers.get(key) || [];
    callbacks.forEach(cb => cb(state[key], state));
  }

  function set(path, value) {
    const keys = path.split('.');
    let target = state;
    for (let i = 0; i < keys.length - 1; i++) {
      target = target[keys[i]];
    }
    target[keys[keys.length - 1]] = value;
    notify(keys[0]);
    if (keys[0] === 'cart') { notify('cartCount'); notify('cartSubtotal'); notify('cartTotal'); }
    if (keys[0] === 'filters') { notify('filteredProducts'); }
  }

  function get(path) {
    const keys = path.split('.');
    let target = state;
    for (const key of keys) {
      target = target[key];
      if (target === undefined) return undefined;
    }
    return target;
  }

  function subscribe(key, callback) {
    if (!subscribers.has(key)) subscribers.set(key, new Set());
    subscribers.get(key).add(callback);
    return () => subscribers.get(key).delete(callback);
  }

  const computed = {
    get cartCount() {
      return state.cart.reduce((sum, item) => sum + item.quantity, 0);
    },
    get cartSubtotal() {
      return state.cart.reduce((sum, item) => {
        const product = state.products.find(p => p.id === item.productId);
        return sum + (product ? product.price * item.quantity : 0);
      }, 0);
    },
    get cartTotal() {
      const subtotal = computed.cartSubtotal;
      return subtotal >= 5600 ? subtotal : subtotal + 559;
    }
  };

  return {
    state,
    set,
    get,
    subscribe,
    computed
  };
})();

export { State };