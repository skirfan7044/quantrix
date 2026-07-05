// ─── Navbar scroll effect ───
const navbar = document.getElementById('navbar');

function setActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const currentPage = currentPath.toLowerCase();
  const activeTargets = currentPage === 'product-details.html' || currentPage === 'product.html'
    ? ['product.html']
    : currentPage === 'index.html' || currentPage === ''
      ? ['index.html']
      : [currentPage];

  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach((link) => {
    const href = (link.getAttribute('href') || '').split('#')[0].split('/').pop().toLowerCase();
    const isActive = activeTargets.includes(href);
    link.classList.toggle('active', isActive);
    if (isActive) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

if (navbar) {
  window.addEventListener('scroll', () => {
    const threshold = window.location.pathname.includes('about.html') ? 80 : 50;
    if (window.scrollY > threshold) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

document.addEventListener('DOMContentLoaded', setActiveNavLink);

// ─── Mobile menu toggle ───
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('mobile-overlay');
  const isOpen = menu && menu.classList.contains('open');

  if (isOpen) {
    menu.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
  } else {
    if (menu) {
      menu.classList.add('open');
    }
    if (overlay) overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

// ─── Mobile drawer (for product page) ───
function openDrawer() {
  const drawer = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('drawerOverlay');
  if (drawer) {
    drawer.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeDrawer() {
  const drawer = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('drawerOverlay');
  if (drawer) {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// Close drawer on overlay click
document.addEventListener('click', function(e) {
  const overlay = document.getElementById('drawerOverlay');
  if (overlay && overlay.classList.contains('open') && e.target === overlay) {
    closeDrawer();
  }
});

// Close drawer on escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeDrawer();
    // Also close legacy mobile menu
    const menu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('mobile-overlay');
    if (menu && menu.classList.contains('open')) {
      menu.classList.remove('open');
      overlay.style.display = 'none';
      document.body.style.overflow = '';
    }
  }
});

// ─── Product detail page interactions ───
function switchProductImg(thumbEl, url) {
  document.querySelectorAll('.thumb').forEach((thumb) => thumb.classList.remove('active'));
  thumbEl.classList.add('active');

  const mainImg = document.getElementById('mainImg');
  if (!mainImg) return;

  mainImg.style.opacity = '0';
  mainImg.style.transform = 'scale(0.97)';

  setTimeout(() => {
    mainImg.src = url;
    mainImg.style.opacity = '1';
    mainImg.style.transform = 'scale(1)';
  }, 200);
}

function switchProductTab(id, btn) {
  document.querySelectorAll('.tab-btn').forEach((tabBtn) => {
    tabBtn.classList.remove('active');
    tabBtn.setAttribute('aria-selected', 'false');
  });

  btn.classList.add('active');
  btn.setAttribute('aria-selected', 'true');

  document.querySelectorAll('.tab-panel').forEach((panel) => panel.classList.remove('active'));
  const target = document.getElementById(`tab-${id}`);
  if (target) target.classList.add('active');
}

function shareProduct() {
  const url = window.location.href;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(url).then(() => showToast('Product link copied to clipboard!'));
  } else {
    showToast(`Copy URL: ${url}`);
  }
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 3200);
}

document.addEventListener('DOMContentLoaded', () => {
  const mainImg = document.getElementById('mainImg');
  if (mainImg) {
    mainImg.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
  }

  const galleryMain = document.getElementById('galleryMain');
  if (galleryMain) {
    galleryMain.addEventListener('click', function () {
      this.classList.toggle('zoomed');
    });
  }

  document.querySelectorAll('.thumb').forEach((thumb) => {
    thumb.addEventListener('click', function () {
      const url = this.getAttribute('data-full');
      if (url) {
        switchProductImg(this, url);
      }
    });
  });

  document.querySelectorAll('.tab-btn').forEach((btn) => {
    btn.addEventListener('click', function () {
      const tabId = this.getAttribute('data-tab');
      if (tabId) {
        switchProductTab(tabId, this);
      }
    });
  });

  const shareBtn = document.getElementById('shareBtn');
  if (shareBtn) {
    shareBtn.addEventListener('click', shareProduct);
  }
});

// ─── Scroll animations (Intersection Observer) ───
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  }
);

document.querySelectorAll('.fade-up, .fade-in').forEach((el) => {
  observer.observe(el);
});

// ─── Hero elements visible on load ───
setTimeout(() => {
  document.querySelectorAll('#hero .fade-up, #hero .fade-in').forEach((el) => {
    el.classList.add('visible');
  });
}, 100);

// ─── Product page hero elements ───
setTimeout(() => {
  document.querySelectorAll('.hero .fade-up').forEach((el) => {
    el.classList.add('in');
  });
}, 60);

// ─── Button ripple effect ───
document.querySelectorAll(
  '.btn-primary-hero, .btn-secondary-hero, .btn-cta-primary, .btn-cta-secondary'
).forEach((btn) => {
  btn.addEventListener('click', function(e) {
    // Skip ripple for links (<a> tags) to allow normal navigation
    if (this.tagName === 'A') {
      return;
    }

    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);

    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      width: ${size}px;
      height: ${size}px;
      left: ${e.clientX - rect.left - size / 2}px;
      top: ${e.clientY - rect.top - size / 2}px;
      background: rgba(255,255,255,0.25);
      transform: scale(0);
      animation: ripple-anim 0.5s ease-out;
      pointer-events: none;
    `;

    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);

    setTimeout(() => ripple.remove(), 500);
  });
});

// ─── Add ripple keyframe dynamically ───
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes ripple-anim {
    to {
      transform: scale(2.5);
      opacity: 0;
    }
  }
`;
document.head.appendChild(styleSheet);

// ─── Newsletter subscription (legacy) ───
const newsletterBtn = document.querySelector('.newsletter-btn');
if (newsletterBtn) {
  newsletterBtn.addEventListener('click', function() {
    const input = document.querySelector('.newsletter-input');
    if (input && input.value && input.value.includes('@')) {
      this.textContent = '✓ Subscribed!';
      this.style.background = '#0d9488';
      input.value = '';

      setTimeout(() => {
        this.textContent = 'Subscribe';
        this.style.background = '#09548D';
      }, 3000);
    } else if (input) {
      input.style.borderColor = '#ef4444';
      setTimeout(() => {
        input.style.borderColor = 'rgba(255,255,255,0.12)';
      }, 2000);
    }
  });
}

// ─── Product page newsletter subscription ───
function subscribeNewsletter() {
  const inp = document.getElementById('nlEmail');
  const btn = document.getElementById('nlBtn');
  if (inp && inp.value && inp.value.includes('@')) {
    btn.textContent = '✓ Done!';
    btn.style.background = '#059669';
    inp.value = '';
    setTimeout(() => {
      btn.textContent = 'Subscribe';
      btn.style.background = '';
    }, 3200);
  } else if (inp) {
    inp.style.borderColor = '#ef4444';
    setTimeout(() => {
      inp.style.borderColor = '';
    }, 2000);
  }
}

// ─── Smooth anchor scrolling ───
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const navbarHeight = document.getElementById('navbar').offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ─── Close mobile menu on link click ───
document.querySelectorAll('.mobile-nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    const menu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('mobile-overlay');
    if (menu) {
      menu.classList.remove('open');
      if (overlay) overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
    // Also close drawer if open
    closeDrawer();
  });
});

// ─── Close mobile menu on escape key ───
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const menu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('mobile-overlay');
    if (menu && menu.classList.contains('open')) {
      menu.classList.remove('open');
      if (overlay) overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }
});

// ─── About page counters ───
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent;
        const num = parseInt(text, 10);
        if (!Number.isNaN(num) && num > 0) {
          let current = 0;
          const increment = Math.ceil(num / 40);
          const timer = setInterval(() => {
            current += increment;
            if (current >= num) {
              el.textContent = text;
              clearInterval(timer);
            } else {
              el.textContent = `${current}+`;
            }
          }, 30);
        }
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach((counter) => observer.observe(counter));
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(animateCounters, 500);
});

// ============================================================
// ─── PRODUCT PAGE SPECIFIC FUNCTIONS ──────────────────────
// ============================================================

// ─── Filter & Search state ───
let activeCat = 'all';
let searchVal = '';
let viewMode = 'grid';

const allCards = () => Array.from(document.querySelectorAll('.pcard'));

// ─── Apply filters ───
function applyFilters() {
  let count = 0;
  allCards().forEach(card => {
    const catMatch = activeCat === 'all' || card.dataset.cat === activeCat;
    const haystack = ((card.dataset.cat || '') + ' ' + (card.dataset.search || '')).toLowerCase();
    const searchMatch = !searchVal || haystack.includes(searchVal.toLowerCase());

    if (catMatch && searchMatch) {
      card.style.display = '';
      count++;
    } else {
      card.style.display = 'none';
    }
  });

  // Count display with pulse
  const el = document.getElementById('countDisplay');
  if (el) {
    el.textContent = count;
    el.classList.remove('count-pulse');
    void el.offsetWidth; // reflow
    el.classList.add('count-pulse');
  }

  // Active filter tag
  const tag = document.getElementById('activeFilterTag');
  if (tag) {
    if (activeCat !== 'all') {
      tag.textContent = activeCat;
      tag.classList.add('visible');
    } else {
      tag.classList.remove('visible');
    }
  }

  // Empty state
  const empty = document.getElementById('emptyState');
  const pagination = document.getElementById('paginationRow');
  if (empty) {
    empty.style.display = count === 0 ? 'block' : 'none';
  }
  if (pagination) {
    pagination.style.display = count === 0 ? 'none' : 'flex';
  }
}

// ─── Category chip ───
function setFilter(btn, cat) {
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  activeCat = cat;
  applyFilters();
}

// ─── Search ───
const searchInput = document.getElementById('searchInput');
if (searchInput) {
  searchInput.addEventListener('input', function() {
    searchVal = this.value.trim();
    const clearBtn = document.getElementById('clearBtn');
    if (clearBtn) {
      clearBtn.style.display = searchVal ? 'block' : 'none';
    }
    applyFilters();
  });
}

function clearSearch() {
  const input = document.getElementById('searchInput');
  if (input) {
    input.value = '';
    searchVal = '';
    const clearBtn = document.getElementById('clearBtn');
    if (clearBtn) {
      clearBtn.style.display = 'none';
    }
    applyFilters();
  }
}

function resetAll() {
  clearSearch();
  activeCat = 'all';
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  const allChip = document.querySelector('[data-cat="all"]');
  if (allChip) {
    allChip.classList.add('active');
  }
  applyFilters();
}

// ─── View toggle ───
function setView(mode) {
  viewMode = mode;
  const grid = document.getElementById('productGrid');
  const gBtn = document.getElementById('gridViewBtn');
  const lBtn = document.getElementById('listViewBtn');

  if (!grid) return;

  if (mode === 'list') {
    grid.classList.add('list-view');
    if (gBtn) {
      gBtn.classList.remove('active');
      gBtn.setAttribute('aria-pressed', 'false');
    }
    if (lBtn) {
      lBtn.classList.add('active');
      lBtn.setAttribute('aria-pressed', 'true');
    }
  } else {
    grid.classList.remove('list-view');
    if (gBtn) {
      gBtn.classList.add('active');
      gBtn.setAttribute('aria-pressed', 'true');
    }
    if (lBtn) {
      lBtn.classList.remove('active');
      lBtn.setAttribute('aria-pressed', 'false');
    }
  }
}

// ─── Pagination ───
let currentPage = 1;
const totalPages = 8;

function goPg(n) {
  currentPage = Math.max(1, Math.min(totalPages, n));
  updatePagination();
  const grid = document.getElementById('productGrid');
  if (grid) {
    grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function changePg(dir) {
  goPg(currentPage + dir);
}

function updatePagination() {
  [1, 2, 3, 8].forEach(n => {
    const btn = document.getElementById('pg' + n);
    if (btn) {
      btn.classList.toggle('active', n === currentPage);
    }
  });

  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  if (prevBtn) {
    prevBtn.classList.toggle('disabled', currentPage === 1);
  }
  if (nextBtn) {
    nextBtn.classList.toggle('disabled', currentPage === totalPages);
  }
}

// ─── Initialize product page features ───
document.addEventListener('DOMContentLoaded', function() {
  // Apply initial filters
  applyFilters();

  // Set initial view
  setView('grid');

  // Handle image loading errors
  document.querySelectorAll('.pcard-img-inner img').forEach(img => {
    img.addEventListener('error', function() {
      this.style.display = 'none';
      const fallback = this.parentElement.querySelector('.fallback-icon');
      if (fallback) {
        fallback.style.display = 'flex';
      }
    });
  });
});