const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const cards = document.querySelectorAll('.card');

const chromaPalettes = [
  ['rgba(157, 123, 255, 0.62)', 'rgba(99, 217, 255, 0.48)', 'rgba(255, 114, 182, 0.50)'],
  ['rgba(255, 114, 182, 0.58)', 'rgba(255, 174, 92, 0.46)', 'rgba(157, 123, 255, 0.50)'],
  ['rgba(99, 217, 255, 0.56)', 'rgba(92, 132, 255, 0.50)', 'rgba(157, 123, 255, 0.48)'],
  ['rgba(215, 255, 99, 0.46)', 'rgba(99, 217, 255, 0.48)', 'rgba(157, 123, 255, 0.52)'],
  ['rgba(255, 137, 106, 0.54)', 'rgba(255, 114, 182, 0.50)', 'rgba(99, 217, 255, 0.44)'],
  ['rgba(112, 245, 196, 0.48)', 'rgba(99, 217, 255, 0.52)', 'rgba(157, 123, 255, 0.50)'],
  ['rgba(255, 196, 92, 0.48)', 'rgba(255, 114, 182, 0.52)', 'rgba(157, 123, 255, 0.48)'],
  ['rgba(112, 145, 255, 0.54)', 'rgba(157, 123, 255, 0.52)', 'rgba(255, 114, 182, 0.46)']
];

const shuffledPalettes = [...chromaPalettes].sort(() => Math.random() - 0.5);

cards.forEach((card, index) => {
  const palette = shuffledPalettes[index % shuffledPalettes.length];
  const angle = Math.round(96 + Math.random() * 58);
  const direction = Math.random() > 0.5 ? 1 : -1;

  card.style.setProperty('--burst-a', palette[0]);
  card.style.setProperty('--burst-b', palette[1]);
  card.style.setProperty('--burst-c', palette[2]);
  card.style.setProperty('--burst-angle', `${angle}deg`);
  card.style.setProperty('--burst-a-x', `${direction * (7 + Math.random() * 9)}%`);
  card.style.setProperty('--burst-a-y', `${-(7 + Math.random() * 8)}%`);
  card.style.setProperty('--burst-b-x', `${-direction * (11 + Math.random() * 9)}%`);
  card.style.setProperty('--burst-b-y', `${10 + Math.random() * 9}%`);
  card.style.setProperty('--burst-c-x', `${direction * (12 + Math.random() * 8)}%`);
  card.style.setProperty('--burst-c-y', `${12 + Math.random() * 9}%`);
});

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
