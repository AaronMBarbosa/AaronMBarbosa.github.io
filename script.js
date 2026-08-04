const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const photoCard = document.querySelector('.photo-card');

async function loadRandomPhotoCardImage() {
  if (!photoCard) return;

  const totalPhotos = Number(photoCard.dataset.photoTotal || 172);
  const shuffled = Array.from({ length: totalPhotos }, (_, index) => index + 1)
    .sort(() => Math.random() - 0.5);

  const tryLoad = (path) => new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(path);
    img.onerror = () => resolve(null);
    img.src = path;
  });

  for (const index of shuffled) {
    const lower = await tryLoad(`photos/${index}.jpg`);
    const upper = lower ? null : await tryLoad(`photos/${index}.JPG`);
    const chosen = lower || upper;

    if (!chosen) continue;

    const positionX = `${(32 + Math.random() * 36).toFixed(0)}%`;
    const positionY = `${(32 + Math.random() * 28).toFixed(0)}%`;
    photoCard.style.setProperty('--photo-card-image', `url("${chosen}")`);
    photoCard.style.setProperty('--photo-card-position', `${positionX} ${positionY}`);
    return;
  }
}

loadRandomPhotoCardImage();

const cards = document.querySelectorAll('.card');

cards.forEach((card) => {
  const setCardPosition = (xRatio = 50, yRatio = 50, pxX = '50%', pxY = '50%') => {
    card.style.setProperty('--mouse-x', typeof pxX === 'number' ? `${pxX}px` : pxX);
    card.style.setProperty('--mouse-y', typeof pxY === 'number' ? `${pxY}px` : pxY);
    card.style.setProperty('--ratio-x', `${xRatio}%`);
    card.style.setProperty('--ratio-y', `${yRatio}%`);
  };

  setCardPosition();

  card.addEventListener('pointermove', (event) => {
    const bounds = card.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const xRatio = (x / bounds.width) * 100;
    const yRatio = (y / bounds.height) * 100;

    setCardPosition(xRatio, yRatio, x, y);
  });

  card.addEventListener('pointerleave', () => {
    setCardPosition();
  });
});

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('.reveal');

if (reducedMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 45, 220)}ms`;
    observer.observe(item);
  });
}
