const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();


const photoCard = document.querySelector('.photo-card');
const ambientPhotoLayers = [...document.querySelectorAll('.ambient-photo-layer')];
const PHOTO_TOTAL = Number(photoCard?.dataset.photoTotal || 172);

// The repository uses lowercase .jpg for most photos and uppercase .JPG for these files.
// Using the exact path avoids expected-but-noisy 404 errors in the browser console.
const UPPERCASE_PHOTO_INDICES = new Set([100, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 114]);
const photoPath = (index) => `photos/${index}.${UPPERCASE_PHOTO_INDICES.has(index) ? 'JPG' : 'jpg'}`;

function randomPhotoPath(excluded = new Set()) {
  const available = Array.from({ length: PHOTO_TOTAL }, (_, index) => index + 1)
    .map(photoPath)
    .filter((path) => !excluded.has(path));

  return available[Math.floor(Math.random() * available.length)] || photoPath(100);
}

function loadRandomPhotoCardImage() {
  if (!photoCard) return;

  const chosen = randomPhotoPath();
  const positionX = `${Math.round(36 + Math.random() * 28)}%`;
  const positionY = `${Math.round(34 + Math.random() * 24)}%`;
  photoCard.style.backgroundImage = `url("${chosen}"), linear-gradient(135deg, #38383e, #111)`;
  photoCard.style.backgroundPosition = `${positionX} ${positionY}, center`;
}

function startAmbientPhotoCarousel() {
  if (ambientPhotoLayers.length < 2) return;

  let activeLayer = 0;
  let currentPath = photoPath(100);

  ambientPhotoLayers[0].style.backgroundImage = `url("${currentPath}")`;
  ambientPhotoLayers[0].style.backgroundPosition = '50% 50%';

  const swapPhoto = () => {
    const nextPath = randomPhotoPath(new Set([currentPath]));
    const nextLayer = activeLayer === 0 ? 1 : 0;

    ambientPhotoLayers[nextLayer].style.backgroundImage = `url("${nextPath}")`;
    ambientPhotoLayers[nextLayer].style.backgroundPosition = `${Math.round(38 + Math.random() * 24)}% ${Math.round(36 + Math.random() * 28)}%`;

    requestAnimationFrame(() => {
      ambientPhotoLayers[nextLayer].classList.add('is-active');
      ambientPhotoLayers[activeLayer].classList.remove('is-active');
      activeLayer = nextLayer;
      currentPath = nextPath;
    });
  };

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.setTimeout(swapPhoto, 5500);
    window.setInterval(swapPhoto, 14000);
  }
}

loadRandomPhotoCardImage();
startAmbientPhotoCarousel();

const cards = document.querySelectorAll('.card');

const CHROMA_PALETTES = [
  ['rgba(157, 123, 255, 0.60)', 'rgba(99, 217, 255, 0.48)', 'rgba(255, 114, 182, 0.50)'],
  ['rgba(255, 126, 95, 0.56)', 'rgba(255, 205, 96, 0.46)', 'rgba(179, 118, 255, 0.50)'],
  ['rgba(66, 224, 196, 0.54)', 'rgba(85, 151, 255, 0.50)', 'rgba(214, 255, 99, 0.42)'],
  ['rgba(255, 94, 177, 0.56)', 'rgba(255, 151, 75, 0.48)', 'rgba(82, 218, 255, 0.48)'],
  ['rgba(105, 119, 255, 0.56)', 'rgba(179, 145, 255, 0.50)', 'rgba(112, 244, 205, 0.44)'],
  ['rgba(28, 206, 209, 0.54)', 'rgba(75, 126, 255, 0.50)', 'rgba(255, 112, 177, 0.48)'],
  ['rgba(255, 124, 154, 0.54)', 'rgba(190, 128, 255, 0.50)', 'rgba(255, 199, 92, 0.44)'],
  ['rgba(203, 255, 78, 0.44)', 'rgba(69, 222, 255, 0.50)', 'rgba(153, 106, 255, 0.52)'],
  ['rgba(255, 92, 120, 0.52)', 'rgba(111, 92, 255, 0.54)', 'rgba(75, 230, 194, 0.44)'],
  ['rgba(90, 179, 255, 0.52)', 'rgba(255, 125, 205, 0.50)', 'rgba(255, 188, 82, 0.42)']
];

function shuffledCopy(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

const randomizedPalettes = shuffledCopy(CHROMA_PALETTES);
const angleOptions = shuffledCopy([92, 104, 116, 128, 140, 152, 164, 78, 132, 146]);

function applyRandomChroma(card, index) {
  const palette = randomizedPalettes[index % randomizedPalettes.length];
  const angle = angleOptions[index % angleOptions.length];
  const direction = index % 2 === 0 ? 1 : -1;
  const verticalShift = 8 + Math.round(Math.random() * 10);
  const horizontalShift = 10 + Math.round(Math.random() * 10);

  card.style.setProperty('--burst-a', palette[0]);
  card.style.setProperty('--burst-b', palette[1]);
  card.style.setProperty('--burst-c', palette[2]);
  card.style.setProperty('--burst-angle', `${angle}deg`);
  card.style.setProperty('--burst-a-x', `${horizontalShift * direction}%`);
  card.style.setProperty('--burst-a-y', `${-verticalShift}%`);
  card.style.setProperty('--burst-b-x', `${-horizontalShift * direction}%`);
  card.style.setProperty('--burst-b-y', `${verticalShift}%`);
  card.style.setProperty('--burst-c-x', `${Math.round(horizontalShift * 0.75) * direction}%`);
  card.style.setProperty('--burst-c-y', `${Math.round(verticalShift * 1.15)}%`);
}

cards.forEach((card, index) => {
  applyRandomChroma(card, index);
  if (!card.querySelector('.glass-sheen')) {
    const sheen = document.createElement('span');
    sheen.className = 'glass-sheen';
    sheen.setAttribute('aria-hidden', 'true');
    card.prepend(sheen);
  }
  const setCardPosition = (xRatio = 50, yRatio = 50, pxX = '50%', pxY = '50%') => {
    card.style.setProperty('--mouse-x', typeof pxX === 'number' ? `${pxX}px` : pxX);
    card.style.setProperty('--mouse-y', typeof pxY === 'number' ? `${pxY}px` : pxY);
    card.style.setProperty('--ratio-x', `${xRatio}%`);
    card.style.setProperty('--ratio-y', `${yRatio}%`);
  };

  setCardPosition();

  card.addEventListener('pointerenter', (event) => {
    card.classList.add('is-pointer-active');
    const bounds = card.getBoundingClientRect();
    setCardPosition(
      ((event.clientX - bounds.left) / bounds.width) * 100,
      ((event.clientY - bounds.top) / bounds.height) * 100,
      event.clientX - bounds.left,
      event.clientY - bounds.top
    );
  });

  card.addEventListener('pointermove', (event) => {
    card.classList.add('is-pointer-active');
    const bounds = card.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const xRatio = (x / bounds.width) * 100;
    const yRatio = (y / bounds.height) * 100;

    setCardPosition(xRatio, yRatio, x, y);
  });

  card.addEventListener('pointerleave', () => {
    card.classList.remove('is-pointer-active');
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
