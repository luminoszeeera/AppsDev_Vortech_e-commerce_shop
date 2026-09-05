import { State } from './state.js';
import { UI } from './ui.js';

const Filters = {
  init() {
    this.bindEvents();
    this.syncFromURL();
  },

  apply(products) {
    const filters = State.get('filters');
    let result = [...products];

    result = this.byCategory(result, filters.categories);
    result = this.byPriceRange(result, filters.priceMin, filters.priceMax);
    result = this.byCondition(result, filters.condition);
    result = this.bySearchQuery(result, filters.searchQuery);

    State.set('filteredProducts', result);
    this.syncToURL();
    return result;
  },

  byCategory(products, categories) {
    if (categories.size === 0 || categories.size === 6) return products;
    return products.filter(p => categories.has(p.category));
  },

  byPriceRange(products, min, max) {
    return products.filter(p => p.price >= min && p.price <= max);
  },

  byCondition(products, condition) {
    if (condition === 'all') return products;
    return products.filter(p => p.condition === condition);
  },

  bySearchQuery(products, query) {
    if (!query.trim()) return products;
    const q = query.toLowerCase().trim();
    return products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      JSON.stringify(p.specs).toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  },

  syncFromURL() {
    const params = new URLSearchParams(window.location.search);
    const filters = State.get('filters');

    const cats = params.get('categories');
    if (cats) {
      filters.categories = new Set(cats.split(','));
      this.updateCategoryCheckboxes();
    }

    const priceMin = params.get('priceMin');
    if (priceMin) {
      filters.priceMin = parseInt(priceMin, 10);
      document.getElementById('price-min').value = filters.priceMin;
    }

    const priceMax = params.get('priceMax');
    if (priceMax) {
      filters.priceMax = parseInt(priceMax, 10);
      document.getElementById('price-max').value = filters.priceMax;
      document.getElementById('price-max-input').value = filters.priceMax;
    }

    const condition = params.get('condition');
    if (condition) {
      filters.condition = condition;
      this.updateConditionRadios(condition);
      this.updateHeaderConditionButtons(condition);
    }

    const search = params.get('search');
    if (search) {
      filters.searchQuery = search;
      document.getElementById('search-input').value = search;
    }

    State.set('filters', filters);
  },

  syncToURL() {
    const filters = State.get('filters');
    const params = new URLSearchParams();

    if (filters.categories.size > 0 && filters.categories.size < 6) {
      params.set('categories', Array.from(filters.categories).join(','));
    }
    if (filters.priceMin > 0) params.set('priceMin', filters.priceMin);
    if (filters.priceMax < 300000) params.set('priceMax', filters.priceMax);
    if (filters.condition !== 'all') params.set('condition', filters.condition);
    if (filters.searchQuery) params.set('search', filters.searchQuery);

    const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.replaceState({}, '', newUrl);
  },

  reset() {
    const filters = {
      categories: new Set(['desktops', 'gpus', 'cpus', 'ram', 'storage', 'preowned']),
      priceMin: 0,
      priceMax: 300000,
      condition: 'all',
      searchQuery: ''
    };
    State.set('filters', filters);
    this.updateCategoryCheckboxes();
    this.updatePriceInputs();
    this.updateConditionRadios('all');
    this.updateHeaderConditionButtons('all');
    document.getElementById('search-input').value = '';
    this.syncToURL();
  },

  updateCategoryCheckboxes() {
    const filters = State.get('filters');
    document.querySelectorAll('input[name="category"]').forEach(cb => {
      cb.checked = filters.categories.has(cb.value);
    });
  },

  updatePriceInputs() {
    const filters = State.get('filters');
    document.getElementById('price-min').value = filters.priceMin;
    document.getElementById('price-max').value = filters.priceMax;
    document.getElementById('price-max-input').value = filters.priceMax;
  },

  updateConditionRadios(condition) {
    document.querySelectorAll('input[name="condition"]').forEach(radio => {
      radio.checked = radio.value === condition;
    });
  },

  updateHeaderConditionButtons(condition) {
    document.querySelectorAll('.condition-filter__btn').forEach(btn => {
      const isActive = btn.dataset.condition === condition;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-pressed', isActive);
    });
  },

  render() {
    this.updateCategoryCheckboxes();
    this.updatePriceInputs();
    this.updateConditionRadios(State.get('filters').condition);
    this.updateHeaderConditionButtons(State.get('filters').condition);
  },

  bindEvents() {
    const form = document.getElementById('filters-form');
    const searchInput = document.getElementById('search-input');
    const categoryNavLinks = document.querySelectorAll('.nav__link[data-category]');
    const headerConditionBtns = document.querySelectorAll('.condition-filter__btn');
    const heroCtaPreowned = document.querySelector('.hero__cta .btn[data-condition="preowned"]');
    const clearBtn = document.getElementById('filters-clear');
    const resetBtn = document.getElementById('reset-filters');

    let searchDebounceTimer;

    searchInput.addEventListener('input', e => {
      clearTimeout(searchDebounceTimer);
      searchDebounceTimer = setTimeout(() => {
        State.set('filters.searchQuery', e.target.value);
        this.apply(State.get('products'));
        UI.announce(`${State.get('filteredProducts').length} products found`);
      }, 300);
    });

    form.addEventListener('change', e => {
      if (e.target.name === 'category') {
        const categories = new Set(State.get('filters').categories);
        if (e.target.checked) categories.add(e.target.value);
        else categories.delete(e.target.value);
        State.set('filters.categories', categories);
        this.apply(State.get('products'));
      } else if (e.target.name === 'condition') {
        State.set('filters.condition', e.target.value);
        this.updateHeaderConditionButtons(e.target.value);
        this.apply(State.get('products'));
      }
    });

    document.getElementById('price-min').addEventListener('change', e => {
      State.set('filters.priceMin', Math.max(0, Math.min(parseInt(e.target.value, 10) || 0, 300000)));
      this.apply(State.get('products'));
    });

    document.getElementById('price-max').addEventListener('input', e => {
      const val = parseInt(e.target.value, 10);
      State.set('filters.priceMax', val);
      document.getElementById('price-max-input').value = val;
    });

    document.getElementById('price-max').addEventListener('change', () => {
      this.apply(State.get('products'));
    });

    document.getElementById('price-max-input').addEventListener('change', e => {
      const val = Math.max(0, Math.min(parseInt(e.target.value, 10) || 0, 300000));
      State.set('filters.priceMax', val);
      document.getElementById('price-max').value = val;
      this.apply(State.get('products'));
    });

    categoryNavLinks.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const category = link.dataset.category;
        document.querySelectorAll('.nav__link').forEach(l => l.classList.remove('is-active'));
        link.classList.add('is-active');

        if (category === 'all') {
          State.set('filters.categories', new Set(['desktops', 'gpus', 'cpus', 'ram', 'storage', 'preowned']));
        } else {
          State.set('filters.categories', new Set([category]));
        }
        this.updateCategoryCheckboxes();
        this.apply(State.get('products'));
        document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' });
      });
    });

    headerConditionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const condition = btn.dataset.condition;
        State.set('filters.condition', condition);
        this.updateConditionRadios(condition);
        this.updateHeaderConditionButtons(condition);
        this.apply(State.get('products'));
      });
    });

    if (heroCtaPreowned) {
      heroCtaPreowned.addEventListener('click', e => {
        e.preventDefault();
        State.set('filters.condition', 'preowned');
        this.updateConditionRadios('preowned');
        this.updateHeaderConditionButtons('preowned');
        this.apply(State.get('products'));
        document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' });
      });
    }

    clearBtn.addEventListener('click', () => this.reset());

    resetBtn.addEventListener('click', () => this.reset());

    State.subscribe('filteredProducts', () => {
      import('./products.js').then(({ renderProducts }) => {
        renderProducts(State.get('filteredProducts'), document.getElementById('product-grid'));
        UI.updateProductCount(State.get('filteredProducts').length);
        const emptyState = document.getElementById('catalog-empty');
        emptyState.hidden = State.get('filteredProducts').length > 0;
      });
    });
  }
};

export { Filters };