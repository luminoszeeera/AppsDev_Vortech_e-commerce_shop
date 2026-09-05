const SVG_PLACEHOLDERS = {
  desktop: `<svg viewBox="0 0 200 125" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="125" fill="#1E1E24"/><rect x="40" y="20" width="120" height="80" rx="8" fill="#2A2A34" stroke="#2D2D3A"/><rect x="55" y="30" width="90" height="50" rx="4" fill="#121212"/><rect x="55" y="85" width="90" height="8" rx="4" fill="#00E5FF" opacity="0.3"/><circle cx="170" cy="100" r="8" fill="#2D2D3A"/><circle cx="170" cy="100" r="3" fill="#00E5FF"/></svg>`,
  gpu: `<svg viewBox="0 0 200 125" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="125" fill="#1E1E24"/><rect x="30" y="35" width="140" height="55" rx="6" fill="#2A2A34" stroke="#2D2D3A"/><rect x="40" y="42" width="120" height="12" rx="3" fill="#121212"/><rect x="40" y="60" width="80" height="8" rx="2" fill="#00E5FF" opacity="0.4"/><rect x="40" y="72" width="60" height="6" rx="2" fill="#2D2D3A"/><rect x="180" y="45" width="12" height="45" rx="2" fill="#00E5FF" opacity="0.3"/></svg>`,
  cpu: `<svg viewBox="0 0 200 125" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="125" fill="#1E1E24"/><rect x="60" y="30" width="80" height="65" rx="6" fill="#2A2A34" stroke="#2D2D3A"/><g fill="#121212"><rect x="70" y="40" width="14" height="14" rx="2"/><rect x="90" y="40" width="14" height="14" rx="2"/><rect x="110" y="40" width="14" height="14" rx="2"/><rect x="70" y="60" width="14" height="14" rx="2"/><rect x="90" y="60" width="14" height="14" rx="2"/><rect x="110" y="60" width="14" height="14" rx="2"/><rect x="70" y="80" width="14" height="14" rx="2"/><rect x="90" y="80" width="14" height="14" rx="2"/></g><rect x="100" y="52" width="4" height="4" fill="#00E5FF"/></svg>`,
  ram: `<svg viewBox="0 0 200 125" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="125" fill="#1E1E24"/><rect x="25" y="30" width="150" height="65" rx="6" fill="#2A2A34" stroke="#2D2D3A"/><rect x="35" y="40" width="130" height="10" rx="2" fill="#121212"/><rect x="35" y="55" width="90" height="8" rx="2" fill="#00E5FF" opacity="0.3"/><rect x="35" y="70" width="60" height="6" rx="2" fill="#2D2D3A"/><g stroke="#00E5FF" stroke-width="1.5" opacity="0.5"><line x1="45" y1="50" x2="155" y2="50"/><line x1="45" y1="55" x2="130" y2="55"/></g></svg>`,
  storage: `<svg viewBox="0 0 200 125" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="125" fill="#1E1E24"/><rect x="55" y="25" width="90" height="75" rx="6" fill="#2A2A34" stroke="#2D2D3A"/><rect x="65" y="35" width="70" height="15" rx="3" fill="#121212"/><rect x="65" y="55" width="70" height="5" rx="2" fill="#00E5FF" opacity="0.4"/><rect x="65" y="65" width="50" height="4" rx="2" fill="#2D2D3A"/><rect x="65" y="75" width="40" height="4" rx="2" fill="#2D2D3A"/><circle cx="130" cy="62" r="5" fill="#00E5FF" opacity="0.3"/></svg>`,
  preowned: `<svg viewBox="0 0 200 125" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="125" fill="#1E1E24"/><rect x="40" y="20" width="120" height="80" rx="8" fill="#2A2A34" stroke="#2D2D3A"/><rect x="55" y="30" width="90" height="50" rx="4" fill="#121212"/><rect x="55" y="85" width="90" height="8" rx="4" fill="#FFC107" opacity="0.3"/><circle cx="170" cy="100" r="8" fill="#2D2D3A"/><circle cx="170" cy="100" r="3" fill="#FFC107"/><path d="M55 30 L70 45 M70 30 L55 45" stroke="#FFC107" stroke-width="2" stroke-linecap="round" opacity="0.5"/></svg>`
};

function getPlaceholderSVG(category) {
  return SVG_PLACEHOLDERS[category] || SVG_PLACEHOLDERS.desktop;
}

const PRODUCTS = [
  {
    id: 'desktop-gaming-01',
    name: 'VorTech Apex Gaming Desktop',
    category: 'desktops',
    condition: 'new',
    price: 139999,
    originalPrice: 156799,
    image: getPlaceholderSVG('desktop'),
    specs: {
      cpu: 'Intel Core i9-14900K',
      gpu: 'NVIDIA RTX 4090 24GB',
      ram: '64GB DDR5-6000',
      storage: '2TB NVMe Gen4 + 4TB HDD',
      psu: '1000W 80+ Platinum',
      cooling: '360mm AIO Liquid'
    },
    badge: 'Best Seller',
    rating: 4.9,
    reviewCount: 127
  },
  {
    id: 'desktop-workstation-01',
    name: 'VorTech Titan Workstation',
    category: 'desktops',
    condition: 'new',
    price: 218399,
    originalPrice: 240799,
    image: getPlaceholderSVG('desktop'),
    specs: {
      cpu: 'AMD Threadripper 7970X',
      gpu: 'NVIDIA RTX 6000 Ada 48GB',
      ram: '128GB DDR5-5600 ECC',
      storage: '4TB NVMe Gen4 + 8TB HDD',
      psu: '1200W 80+ Titanium',
      cooling: 'Custom Loop Ready'
    },
    badge: 'Workstation Class',
    rating: 4.8,
    reviewCount: 43
  },
  {
    id: 'desktop-office-01',
    name: 'VorTech Core Office PC',
    category: 'desktops',
    condition: 'new',
    price: 36399,
    originalPrice: 41999,
    image: getPlaceholderSVG('desktop'),
    specs: {
      cpu: 'Intel Core i5-13400',
      gpu: 'Intel UHD 730',
      ram: '16GB DDR4-3200',
      storage: '512GB NVMe Gen4',
      psu: '400W 80+ Bronze',
      cooling: 'Stock Cooler'
    },
    badge: 'Value Pick',
    rating: 4.5,
    reviewCount: 89
  },
  {
    id: 'desktop-streamer-01',
    name: 'VorTech Streamer Pro',
    category: 'desktops',
    condition: 'new',
    price: 100799,
    originalPrice: 111999,
    image: getPlaceholderSVG('desktop'),
    specs: {
      cpu: 'AMD Ryzen 9 7900X',
      gpu: 'NVIDIA RTX 4070 Ti 12GB',
      ram: '32GB DDR5-6000',
      storage: '1TB NVMe Gen4 + 2TB HDD',
      psu: '850W 80+ Gold',
      cooling: '240mm AIO'
    },
    badge: 'Stream Ready',
    rating: 4.7,
    reviewCount: 156
  },
  {
    id: 'desktop-compact-01',
    name: 'VorTech Nano SFF',
    category: 'desktops',
    condition: 'new',
    price: 67199,
    originalPrice: 75599,
    image: getPlaceholderSVG('desktop'),
    specs: {
      cpu: 'Intel Core i7-13700',
      gpu: 'NVIDIA RTX 4060 Ti 8GB',
      ram: '32GB DDR5-5600',
      storage: '1TB NVMe Gen4',
      psu: '600W SFX 80+ Gold',
      cooling: 'Low-Profile Air'
    },
    badge: 'SFF Champion',
    rating: 4.6,
    reviewCount: 78
  },
  {
    id: 'desktop-budget-01',
    name: 'VorTech Entry Gaming PC',
    category: 'desktops',
    condition: 'new',
    price: 50399,
    originalPrice: 55999,
    image: getPlaceholderSVG('desktop'),
    specs: {
      cpu: 'AMD Ryzen 5 7600',
      gpu: 'NVIDIA RTX 4060 8GB',
      ram: '16GB DDR5-5200',
      storage: '512GB NVMe Gen4',
      psu: '500W 80+ Bronze',
      cooling: 'Stock Cooler'
    },
    badge: 'Budget King',
    rating: 4.4,
    reviewCount: 203
  },

  {
    id: 'gpu-01',
    name: 'NVIDIA GeForce RTX 4090 24GB',
    category: 'gpus',
    condition: 'new',
    price: 100799,
    originalPrice: 111999,
    image: getPlaceholderSVG('gpu'),
    specs: {
      cudaCores: '16384',
      boostClock: '2520 MHz',
      memory: '24GB GDDR6X',
      memoryBus: '384-bit',
      tdp: '450W',
      ports: '3x DP 1.4a, 1x HDMI 2.1'
    },
    badge: 'Flagship',
    rating: 4.9,
    reviewCount: 312
  },
  {
    id: 'gpu-02',
    name: 'NVIDIA GeForce RTX 4080 Super 16GB',
    category: 'gpus',
    condition: 'new',
    price: 55999,
    originalPrice: 61599,
    image: getPlaceholderSVG('gpu'),
    specs: {
      cudaCores: '10240',
      boostClock: '2550 MHz',
      memory: '16GB GDDR6X',
      memoryBus: '256-bit',
      tdp: '320W',
      ports: '3x DP 1.4a, 1x HDMI 2.1'
    },
    rating: 4.8,
    reviewCount: 187
  },
  {
    id: 'gpu-03',
    name: 'AMD Radeon RX 7900 XTX 24GB',
    category: 'gpus',
    condition: 'new',
    price: 50399,
    originalPrice: 55999,
    image: getPlaceholderSVG('gpu'),
    specs: {
      streamProcessors: '6144',
      boostClock: '2680 MHz',
      memory: '24GB GDDR6',
      memoryBus: '384-bit',
      tdp: '355W',
      ports: '2x DP 2.1, 1x HDMI 2.1, 1x USB-C'
    },
    rating: 4.7,
    reviewCount: 142
  },
  {
    id: 'gpu-04',
    name: 'NVIDIA GeForce RTX 4070 Ti Super 16GB',
    category: 'gpus',
    condition: 'new',
    price: 44799,
    originalPrice: 47599,
    image: getPlaceholderSVG('gpu'),
    specs: {
      cudaCores: '8448',
      boostClock: '2610 MHz',
      memory: '16GB GDDR6X',
      memoryBus: '256-bit',
      tdp: '285W',
      ports: '3x DP 1.4a, 1x HDMI 2.1'
    },
    badge: '1440p King',
    rating: 4.8,
    reviewCount: 256
  },
  {
    id: 'gpu-05',
    name: 'NVIDIA GeForce RTX 4070 Super 12GB',
    category: 'gpus',
    condition: 'new',
    price: 33599,
    originalPrice: 36399,
    image: getPlaceholderSVG('gpu'),
    specs: {
      cudaCores: '7168',
      boostClock: '2475 MHz',
      memory: '12GB GDDR6X',
      memoryBus: '192-bit',
      tdp: '220W',
      ports: '3x DP 1.4a, 1x HDMI 2.1'
    },
    rating: 4.7,
    reviewCount: 198
  },
  {
    id: 'gpu-06',
    name: 'NVIDIA GeForce RTX 3080 10GB (Certified Pre-Owned)',
    category: 'gpus',
    condition: 'preowned',
    price: 30799,
    originalPrice: 39199,
    image: getPlaceholderSVG('gpu'),
    specs: {
      cudaCores: '8704',
      boostClock: '1710 MHz',
      memory: '10GB GDDR6X',
      memoryBus: '320-bit',
      tdp: '320W',
      ports: '3x DP 1.4a, 1x HDMI 2.1',
      warranty: '12 Months VorTech Certified'
    },
    badge: 'Certified',
    rating: 4.6,
    reviewCount: 87
  },

  {
    id: 'cpu-01',
    name: 'Intel Core i9-14900K',
    category: 'cpus',
    condition: 'new',
    price: 33039,
    originalPrice: 36399,
    image: getPlaceholderSVG('cpu'),
    specs: {
      cores: '24 (8P + 16E)',
      threads: '32',
      baseClock: '3.2 GHz',
      boostClock: '6.0 GHz',
      cache: '36MB L3',
      tdp: '125W / 253W',
      socket: 'LGA 1700'
    },
    badge: 'Gaming Beast',
    rating: 4.8,
    reviewCount: 234
  },
  {
    id: 'cpu-02',
    name: 'AMD Ryzen 9 7950X3D',
    category: 'cpus',
    condition: 'new',
    price: 33599,
    originalPrice: 36399,
    image: getPlaceholderSVG('cpu'),
    specs: {
      cores: '16',
      threads: '32',
      baseClock: '4.2 GHz',
      boostClock: '5.7 GHz',
      cache: '128MB L3 (3D V-Cache)',
      tdp: '120W',
      socket: 'AM5'
    },
    badge: 'Gaming + Productivity',
    rating: 4.9,
    reviewCount: 189
  },
  {
    id: 'cpu-03',
    name: 'Intel Core i7-14700K',
    category: 'cpus',
    condition: 'new',
    price: 22959,
    originalPrice: 25199,
    image: getPlaceholderSVG('cpu'),
    specs: {
      cores: '20 (8P + 12E)',
      threads: '28',
      baseClock: '3.4 GHz',
      boostClock: '5.6 GHz',
      cache: '33MB L3',
      tdp: '125W / 253W',
      socket: 'LGA 1700'
    },
    rating: 4.7,
    reviewCount: 167
  },
  {
    id: 'cpu-04',
    name: 'AMD Ryzen 7 7800X3D',
    category: 'cpus',
    condition: 'new',
    price: 19599,
    originalPrice: 22399,
    image: getPlaceholderSVG('cpu'),
    specs: {
      cores: '8',
      threads: '16',
      baseClock: '4.2 GHz',
      boostClock: '5.0 GHz',
      cache: '96MB L3 (3D V-Cache)',
      tdp: '120W',
      socket: 'AM5'
    },
    badge: 'Best Gaming CPU',
    rating: 4.9,
    reviewCount: 342
  },
  {
    id: 'cpu-05',
    name: 'Intel Core i5-13600K (Certified Pre-Owned)',
    category: 'cpus',
    condition: 'preowned',
    price: 12879,
    originalPrice: 17919,
    image: getPlaceholderSVG('cpu'),
    specs: {
      cores: '14 (6P + 8E)',
      threads: '20',
      baseClock: '3.5 GHz',
      boostClock: '5.1 GHz',
      cache: '24MB L3',
      tdp: '125W / 181W',
      socket: 'LGA 1700',
      warranty: '12 Months VorTech Certified'
    },
    badge: 'Certified',
    rating: 4.5,
    reviewCount: 76
  },

  {
    id: 'ram-01',
    name: 'G.Skill Trident Z5 RGB 64GB (2x32GB) DDR5-6000 CL30',
    category: 'ram',
    condition: 'new',
    price: 16799,
    originalPrice: 19599,
    image: getPlaceholderSVG('ram'),
    specs: {
      capacity: '64GB (2x32GB)',
      speed: 'DDR5-6000',
      latency: 'CL30-38-38-96',
      voltage: '1.35V',
      rgb: 'Yes',
      profile: 'Intel XMP 3.0 / AMD EXPO'
    },
    badge: 'Top Tier',
    rating: 4.8,
    reviewCount: 112
  },
  {
    id: 'ram-02',
    name: 'Corsair Vengeance 32GB (2x16GB) DDR5-5600 CL36',
    category: 'ram',
    condition: 'new',
    price: 7839,
    originalPrice: 8959,
    image: getPlaceholderSVG('ram'),
    specs: {
      capacity: '32GB (2x16GB)',
      speed: 'DDR5-5600',
      latency: 'CL36-36-36-76',
      voltage: '1.25V',
      rgb: 'No',
      profile: 'Intel XMP 3.0'
    },
    rating: 4.6,
    reviewCount: 204
  },
  {
    id: 'ram-03',
    name: 'Kingston Fury Beast 32GB (2x16GB) DDR5-6000 CL32 (Certified Pre-Owned)',
    category: 'ram',
    condition: 'preowned',
    price: 6159,
    originalPrice: 8399,
    image: getPlaceholderSVG('ram'),
    specs: {
      capacity: '32GB (2x16GB)',
      speed: 'DDR5-6000',
      latency: 'CL32-38-38-96',
      voltage: '1.35V',
      rgb: 'No',
      profile: 'Intel XMP 3.0 / AMD EXPO',
      warranty: '12 Months VorTech Certified'
    },
    badge: 'Certified',
    rating: 4.4,
    reviewCount: 41
  },

  {
    id: 'storage-01',
    name: 'Samsung 990 Pro 2TB NVMe Gen4',
    category: 'storage',
    condition: 'new',
    price: 10079,
    originalPrice: 12879,
    image: getPlaceholderSVG('storage'),
    specs: {
      capacity: '2TB',
      interface: 'PCIe 4.0 x4',
      readSpeed: '7450 MB/s',
      writeSpeed: '6900 MB/s',
      formFactor: 'M.2 2280',
      warranty: '5 Years'
    },
    badge: 'Fastest',
    rating: 4.9,
    reviewCount: 278
  },
  {
    id: 'storage-02',
    name: 'WD Black SN850X 2TB NVMe Gen4',
    category: 'storage',
    condition: 'new',
    price: 8959,
    originalPrice: 11199,
    image: getPlaceholderSVG('storage'),
    specs: {
      capacity: '2TB',
      interface: 'PCIe 4.0 x4',
      readSpeed: '7300 MB/s',
      writeSpeed: '6600 MB/s',
      formFactor: 'M.2 2280',
      warranty: '5 Years'
    },
    rating: 4.8,
    reviewCount: 189
  },
  {
    id: 'storage-03',
    name: 'Samsung 870 EVO 4TB SATA SSD',
    category: 'storage',
    condition: 'new',
    price: 16799,
    originalPrice: 19599,
    image: getPlaceholderSVG('storage'),
    specs: {
      capacity: '4TB',
      interface: 'SATA III',
      readSpeed: '560 MB/s',
      writeSpeed: '530 MB/s',
      formFactor: '2.5" 7mm',
      warranty: '5 Years'
    },
    badge: 'Mass Storage',
    rating: 4.7,
    reviewCount: 134
  },

  {
    id: 'preowned-01',
    name: 'VorTech Apex Gaming Desktop (Certified Pre-Owned)',
    category: 'preowned',
    condition: 'preowned',
    price: 106399,
    originalPrice: 139999,
    image: getPlaceholderSVG('preowned'),
    specs: {
      cpu: 'Intel Core i9-13900K',
      gpu: 'NVIDIA RTX 4080 16GB',
      ram: '32GB DDR5-5600',
      storage: '1TB NVMe Gen4 + 2TB HDD',
      psu: '1000W 80+ Platinum',
      cooling: '360mm AIO Liquid',
      warranty: '12 Months VorTech Certified'
    },
    badge: 'Certified Pre-Owned',
    rating: 4.7,
    reviewCount: 56
  },
  {
    id: 'preowned-02',
    name: 'VorTech Streamer Pro (Certified Pre-Owned)',
    category: 'preowned',
    condition: 'preowned',
    price: 72799,
    originalPrice: 100799,
    image: getPlaceholderSVG('preowned'),
    specs: {
      cpu: 'Intel Core i7-13700K',
      gpu: 'NVIDIA RTX 4070 12GB',
      ram: '32GB DDR5-5600',
      storage: '1TB NVMe Gen4',
      psu: '850W 80+ Gold',
      cooling: '240mm AIO',
      warranty: '12 Months VorTech Certified'
    },
    badge: 'Certified Pre-Owned',
    rating: 4.6,
    reviewCount: 42
  },
  {
    id: 'preowned-03',
    name: 'VorTech Workstation Tower (Certified Pre-Owned)',
    category: 'preowned',
    condition: 'preowned',
    price: 139999,
    originalPrice: 218399,
    image: getPlaceholderSVG('preowned'),
    specs: {
      cpu: 'AMD Threadripper 5965WX',
      gpu: 'NVIDIA RTX A5000 24GB',
      ram: '64GB DDR4-3200 ECC',
      storage: '2TB NVMe Gen4 + 4TB HDD',
      psu: '1000W 80+ Platinum',
      cooling: 'Dual Tower Air',
      warranty: '12 Months VorTech Certified'
    },
    badge: 'Certified Pre-Owned',
    rating: 4.5,
    reviewCount: 28
  }
];

function createProductCard(product) {
  const article = document.createElement('article');
  article.className = 'card';
  article.setAttribute('role', 'listitem');
  article.dataset.productId = product.id;

  const badgeHtml = product.condition === 'preowned'
    ? `<span class="badge badge--preowned">Certified Pre-Owned</span>`
    : `<span class="badge badge--new">Brand New</span>`;

  const productBadgeHtml = product.badge
    ? `<span class="badge badge--sale">${product.badge}</span>`
    : '';

  const originalPriceHtml = product.originalPrice && product.originalPrice > product.price
    ? `<span class="card__price-original">₱${product.originalPrice.toLocaleString()}</span>`
    : '';

  const specsHtml = Object.entries(product.specs).slice(0, 4).map(([key, value]) => `
    <div class="card__spec">
      <span class="card__spec-label">${key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')}:</span>
      <span class="card__spec-value">${value}</span>
    </div>
  `).join('');

  article.innerHTML = `
    <div class="card__image">
      ${product.image}
      <div class="card__badge">${badgeHtml}${productBadgeHtml}</div>
    </div>
    <div class="card__content">
      <h3 class="card__title">${product.name}</h3>
      <div class="card__specs">${specsHtml}</div>
      <div class="card__footer">
        <div class="card__price">
          <span class="card__price-current">₱${product.price.toLocaleString()}</span>
          ${originalPriceHtml}
        </div>
        <button class="btn btn--primary btn--sm card__btn" data-add-to-cart="${product.id}" aria-label="Add ${product.name} to cart">Add to Cart</button>
      </div>
    </div>
  `;

  return article;
}

function createProductSkeleton() {
  const article = document.createElement('article');
  article.className = 'card skeleton';
  article.setAttribute('aria-hidden', 'true');
  article.innerHTML = `
    <div class="card__image skeleton-shimmer"></div>
    <div class="card__content">
      <div class="card__title skeleton-shimmer" style="width: 70%; height: 1.5rem;"></div>
      <div class="card__specs">
        <div class="card__spec skeleton-shimmer" style="height: 1rem;"></div>
        <div class="card__spec skeleton-shimmer" style="height: 1rem;"></div>
        <div class="card__spec skeleton-shimmer" style="height: 1rem;"></div>
      </div>
      <div class="card__footer">
        <div class="card__price skeleton-shimmer" style="width: 80px; height: 1.5rem;"></div>
        <div class="card__btn skeleton-shimmer" style="width: 100px; height: 2.5rem;"></div>
      </div>
    </div>
  `;
  return article;
}

function renderProducts(products, container) {
  container.innerHTML = '';
  if (products.length === 0) {
    container.hidden = true;
    return;
  }
  container.hidden = false;
  const fragment = document.createDocumentFragment();
  products.forEach(product => {
    fragment.appendChild(createProductCard(product));
  });
  container.appendChild(fragment);
}

function renderSkeletons(count, container) {
  container.innerHTML = '';
  container.hidden = false;
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < count; i++) {
    fragment.appendChild(createProductSkeleton());
  }
  container.appendChild(fragment);
}

export { PRODUCTS, renderProducts, renderSkeletons, createProductCard };