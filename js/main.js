const navToggle = document.getElementById('navToggle');
const mobileNav = document.getElementById('mobileNav');

function closeMobileNav() {
  if (!mobileNav || !navToggle) return;
  mobileNav.classList.remove('is-open');
  navToggle.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Open navigation menu');
}

if (navToggle && mobileNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  });

  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMobileNav);
  });

  // Close mobile nav on Escape for accessibility
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileNav();
  });
}

function hexToRgb(hex) {
  const cleanHex = hex.replace('#', '');
  return [
    parseInt(cleanHex.slice(0, 2), 16),
    parseInt(cleanHex.slice(2, 4), 16),
    parseInt(cleanHex.slice(4, 6), 16),
  ];
}

function lerpColor(a, b, t) {
  return [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ];
}

const sections = Array.from(document.querySelectorAll('[data-bg]'));

function updateBackgroundColor() {
  const scrollY = window.scrollY;
  const winH = window.innerHeight;

  for (let i = 0; i < sections.length; i += 1) {
    const current = sections[i];
    const next = sections[i + 1];
    const currentRect = current.getBoundingClientRect();
    const currentTop = currentRect.top + scrollY;
    const currentStart = currentTop - winH * 0.5;
    const nextTop = next ? next.getBoundingClientRect().top + scrollY : null;
    const nextStart = nextTop !== null ? nextTop - winH * 0.5 : Infinity;

    if (scrollY >= currentStart && scrollY < nextStart) {
      const colorA = hexToRgb(current.dataset.bg);

      if (!next) {
        document.body.style.backgroundColor = `rgb(${colorA[0]}, ${colorA[1]}, ${colorA[2]})`;
        return;
      }

      const colorB = hexToRgb(next.dataset.bg);
      const range = Math.max(1, nextTop - currentTop);
      const t = Math.max(0, Math.min(1, (scrollY - currentStart) / range));
      const [r, g, b] = lerpColor(colorA, colorB, t);
      document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
      return;
    }
  }
}

let backgroundTicking = false;
window.addEventListener('scroll', () => {
  if (!backgroundTicking) {
    window.requestAnimationFrame(() => {
      updateBackgroundColor();
      backgroundTicking = false;
    });
    backgroundTicking = true;
  }
}, { passive: true });

window.addEventListener('resize', updateBackgroundColor);
updateBackgroundColor();

const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    entry.target.classList.toggle('visible', entry.isIntersecting);
  });
}, {
  threshold: 0.15,
});

revealElements.forEach((element) => revealObserver.observe(element));