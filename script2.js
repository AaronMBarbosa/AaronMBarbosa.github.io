const TOTAL_IMAGES = 172;
const POOL_SIZE = 16;
const MIN_DISTANCE = Math.max(58, window.innerWidth / 16);

const stage = document.querySelector('.gallery-stage');
const imagesContainer = document.querySelector('.images-container');
const intro = document.querySelector('#gallery-intro');
const countdown = document.querySelector('#intro-countdown');
const timerFill = document.querySelector('.timer-bar i');
const counter = document.querySelector('#counter-current');

const auroraBackground = document.querySelector('.aurora-background');

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function buildAuroraBackground() {
  if (!auroraBackground) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const palette = [
    'rgba(157, 123, 255, 0.62)',
    'rgba(99, 217, 255, 0.56)',
    'rgba(255, 114, 182, 0.52)',
    'rgba(94, 234, 212, 0.46)',
    'rgba(215, 255, 99, 0.34)',
    'rgba(96, 111, 255, 0.52)',
    'rgba(255, 151, 92, 0.42)'
  ];

  const orbCount = window.innerWidth < 700 ? 5 : 8;

  for (let index = 0; index < orbCount; index += 1) {
    const orb = document.createElement('span');
    orb.className = 'aurora-orb';
    orb.style.setProperty('--aurora-color', palette[Math.floor(Math.random() * palette.length)]);
    orb.style.setProperty('--aurora-size', `${randomBetween(38, 74).toFixed(1)}vmax`);
    orb.style.setProperty('--aurora-opacity', randomBetween(0.38, 0.72).toFixed(2));
    auroraBackground.appendChild(orb);

    const startX = randomBetween(-12, 78);
    const startY = randomBetween(-18, 76);
    const middleX = randomBetween(-18, 82);
    const middleY = randomBetween(-22, 80);
    const endX = randomBetween(-12, 78);
    const endY = randomBetween(-18, 76);
    const scaleA = randomBetween(0.82, 1.12);
    const scaleB = randomBetween(1.00, 1.32);
    const rotateA = randomBetween(-24, 24);
    const rotateB = randomBetween(-34, 34);

    if (reducedMotion) {
      orb.style.transform = `translate3d(${startX}vw, ${startY}vh, 0) scale(${scaleA}) rotate(${rotateA}deg)`;
      continue;
    }

    orb.animate([
      {
        transform: `translate3d(${startX}vw, ${startY}vh, 0) scale(${scaleA}) rotate(${rotateA}deg)`,
        opacity: randomBetween(0.32, 0.56)
      },
      {
        transform: `translate3d(${middleX}vw, ${middleY}vh, 0) scale(${scaleB}) rotate(${rotateB}deg)`,
        opacity: randomBetween(0.52, 0.82),
        offset: randomBetween(0.38, 0.62)
      },
      {
        transform: `translate3d(${endX}vw, ${endY}vh, 0) scale(${randomBetween(0.88, 1.18)}) rotate(${randomBetween(-28, 28)}deg)`,
        opacity: randomBetween(0.34, 0.60)
      }
    ], {
      duration: randomBetween(16000, 32000),
      delay: -randomBetween(0, 14000),
      iterations: Infinity,
      direction: Math.random() > 0.5 ? 'alternate' : 'alternate-reverse',
      easing: 'ease-in-out'
    });
  }
}

buildAuroraBackground();

let imagePool = [];
let globalIndex = 0;
let lastPoint = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
let hasStarted = false;
let isPointerDown = false;
let autoStartTimer = null;

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
  if (autoStartTimer !== null) {
    window.cancelAnimationFrame(autoStartTimer);
    autoStartTimer = null;
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
    if (timerFill) timerFill.style.transform = 'scaleX(0)';
    return;
  }

  const INTRO_SECONDS = 3;
  const durationMs = INTRO_SECONDS * 1000;
  const startedAt = performance.now();
  countdown.textContent = String(INTRO_SECONDS).padStart(2, '0');
  if (timerFill) timerFill.style.transform = 'scaleX(1)';

  const updateCountdown = (now) => {
    if (hasStarted) return;

    const elapsed = now - startedAt;
    const progress = Math.min(1, elapsed / durationMs);
    const remaining = Math.max(0, Math.ceil((durationMs - elapsed) / 1000));

    countdown.textContent = String(remaining).padStart(2, '0');
    if (timerFill) timerFill.style.transform = `scaleX(${1 - progress})`;

    if (progress >= 1) {
      autoStartTimer = null;
      beginExperience();
      return;
    }

    autoStartTimer = window.requestAnimationFrame(updateCountdown);
  };

  autoStartTimer = window.requestAnimationFrame(updateCountdown);
});
