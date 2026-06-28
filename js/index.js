// ─── Navbar scroll effect ───
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ─── Mobile menu toggle ───
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('mobile-overlay');
  const isOpen = menu.classList.contains('open');

  if (isOpen) {
    menu.classList.remove('open');
    overlay.style.display = 'none';
    document.body.style.overflow = '';
  } else {
    menu.classList.add('open');
    overlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }
}

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

// ─── Button ripple effect ───
document.querySelectorAll(
  '.btn-primary-hero, .btn-secondary-hero, .btn-cta-primary, .btn-cta-secondary'
).forEach((btn) => {
  btn.addEventListener('click', function(e) {
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

// ─── Newsletter subscription ───
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
    menu.classList.remove('open');
    overlay.style.display = 'none';
    document.body.style.overflow = '';
  });
});

// ─── Close mobile menu on escape key ───
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const menu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('mobile-overlay');
    if (menu.classList.contains('open')) {
      menu.classList.remove('open');
      overlay.style.display = 'none';
      document.body.style.overflow = '';
    }
  }
});

console.log('Quantrix India — Industrial Automation Solutions');