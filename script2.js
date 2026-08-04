const TOTAL_IMAGES = 172;
const POOL_SIZE = 16;
const MIN_DISTANCE = Math.max(58, window.innerWidth / 16);

const stage = document.querySelector('.gallery-stage');
const imagesContainer = document.querySelector('.images-container');
const intro = document.querySelector('#gallery-intro');
const countdown = document.querySelector('#intro-countdown');
const timerProgress = document.querySelector('.timer-bar i');
const counter = document.querySelector('#counter-current');

let imagePool = [];
let globalIndex = 0;
let lastPoint = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
let hasStarted = false;
let isPointerDown = false;
let autoStartFrame = null;

const shuffledIndices = Array.from({ length: TOTAL_IMAGES }, (_, index) => index + 1)
  .sort(() => Math.random() - 0.5);

function tryLoadImage(image, index) {
  return new Promise((resolve) => {
    const lowerCasePath = `photos/${index}.jpg`;
    const upperCasePath = `photos/${index}.JPG`;

    image.onload = () => resolve(true);
    image.onerror = () => {
      image.onerror = () => resolve(false);
      image.src = upperCasePath;
    };
    image.src = lowerCasePath;
  });
}

async function buildImagePool() {
  for (const index of shuffledIndices) {
    if (imagePool.length >= POOL_SIZE) break;

    const image = new Image();
    image.className = 'trail-image';
    image.alt = '';
    image.decoding = 'async';
    image.loading = 'eager';
    image.style.setProperty('--rotation', `${(Math.random() * 8 - 4).toFixed(2)}deg`);

    const loaded = await tryLoadImage(image, index);
    if (!loaded) continue;

    imagesContainer.appendChild(image);
    imagePool.push(image);
  }
}

function distanceFromLast(x, y) {
  return Math.hypot(x - lastPoint.x, y - lastPoint.y);
}

function activateImage(x, y) {
  if (!imagePool.length) return;

  const image = imagePool[globalIndex % imagePool.length];
  const previous = imagePool[(globalIndex - 7 + imagePool.length) % imagePool.length];

  image.classList.remove('is-fading');
  image.style.left = `${x}px`;
  image.style.top = `${y}px`;
  image.style.zIndex = String(globalIndex + 1);
  image.style.setProperty('--rotation', `${(Math.random() * 8 - 4).toFixed(2)}deg`);

  requestAnimationFrame(() => image.classList.add('is-active'));

  if (globalIndex > 6 && previous !== image) {
    previous.classList.add('is-fading');
    previous.classList.remove('is-active');
  }

  globalIndex += 1;
  counter.textContent = String(globalIndex).padStart(2, '0');
  lastPoint = { x, y };
}

function beginExperience(x = window.innerWidth / 2, y = window.innerHeight / 2) {
  if (autoStartFrame !== null) {
    window.cancelAnimationFrame(autoStartFrame);
    autoStartFrame = null;
  }

  if (!hasStarted) {
    hasStarted = true;
    intro.classList.add('is-hidden');
  }

  const offsets = [
    [-150, -80], [110, -120], [-60, 80], [170, 65]
  ];

  offsets.forEach(([offsetX, offsetY], index) => {
    window.setTimeout(() => {
      const safeX = Math.min(window.innerWidth - 70, Math.max(70, x + offsetX));
      const safeY = Math.min(window.innerHeight - 70, Math.max(70, y + offsetY));
      activateImage(safeX, safeY);
    }, index * 85);
  });
}

function handlePointerMove(event) {
  if (!hasStarted || (!isPointerDown && event.pointerType === 'touch')) return;
  if (event.target.closest('a, button')) return;

  const { clientX: x, clientY: y } = event;
  if (distanceFromLast(x, y) >= MIN_DISTANCE) activateImage(x, y);
}

stage.addEventListener('pointerdown', (event) => {
  if (event.target.closest('a, button')) return;
  isPointerDown = true;
  stage.setPointerCapture?.(event.pointerId);

  if (!hasStarted) beginExperience(event.clientX, event.clientY);
  else activateImage(event.clientX, event.clientY);
});

stage.addEventListener('pointermove', handlePointerMove);
stage.addEventListener('pointerup', () => { isPointerDown = false; });
stage.addEventListener('pointercancel', () => { isPointerDown = false; });

window.addEventListener('resize', () => {
  lastPoint = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
});

buildImagePool().then(() => {
  if (!imagePool.length) {
    intro.querySelector('p:last-of-type').textContent = 'The photo archive could not be loaded. Please refresh and try again.';
    countdown.textContent = '--';
    return;
  }

  const INTRO_DURATION_MS = 3000;
  const startedAt = performance.now();
  countdown.textContent = '03';
  timerProgress?.style.setProperty('--timer-progress', '1');

  const updateIntroTimer = (now) => {
    if (hasStarted) return;

    const elapsed = Math.min(INTRO_DURATION_MS, now - startedAt);
    const progress = Math.max(0, 1 - (elapsed / INTRO_DURATION_MS));
    const remaining = Math.max(0, Math.ceil((INTRO_DURATION_MS - elapsed) / 1000));

    countdown.textContent = String(remaining).padStart(2, '0');
    timerProgress?.style.setProperty('--timer-progress', progress.toFixed(4));

    if (elapsed >= INTRO_DURATION_MS) {
      autoStartFrame = null;
      beginExperience();
      return;
    }

    autoStartFrame = window.requestAnimationFrame(updateIntroTimer);
  };

  autoStartFrame = window.requestAnimationFrame(updateIntroTimer);
});
