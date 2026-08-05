(() => {
  const body = document.body;
  if (!body.classList.contains('retro-aero')) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cards = document.querySelectorAll('.card');
  const aeroPalettes = [
    ['rgba(82, 231, 255, 0.58)', 'rgba(120, 239, 152, 0.48)', 'rgba(153, 151, 255, 0.48)'],
    ['rgba(91, 184, 255, 0.56)', 'rgba(82, 231, 255, 0.52)', 'rgba(201, 255, 91, 0.42)'],
    ['rgba(126, 244, 181, 0.50)', 'rgba(74, 211, 255, 0.52)', 'rgba(255, 159, 111, 0.42)'],
    ['rgba(157, 151, 255, 0.54)', 'rgba(82, 231, 255, 0.50)', 'rgba(255, 143, 201, 0.44)'],
    ['rgba(201, 255, 91, 0.45)', 'rgba(87, 222, 255, 0.54)', 'rgba(95, 154, 255, 0.48)'],
    ['rgba(255, 153, 108, 0.44)', 'rgba(255, 143, 201, 0.48)', 'rgba(82, 231, 255, 0.50)'],
    ['rgba(76, 209, 255, 0.54)', 'rgba(100, 247, 205, 0.46)', 'rgba(201, 255, 91, 0.40)'],
    ['rgba(139, 154, 255, 0.52)', 'rgba(81, 213, 255, 0.50)', 'rgba(115, 239, 151, 0.42)']
  ].sort(() => Math.random() - 0.5);

  const windowTitles = [
    'HOME.ASP // WELCOME',
    'PROFILE.JPG // USER: AARON',
    'WORK_LOG.TXT // ACTIVE',
    'METHODS.INI // READY',
    'GM_ARCHIVE.DAT // READ ONLY',
    'EDUCATION.HTML // VERIFIED',
    'PHOTO_ALBUM.EXE // OPEN',
    'INTERESTS.MP3 // SHARED',
    'CONTACT.BUDDY // ONLINE'
  ];

  cards.forEach((card, index) => {
    const palette = aeroPalettes[index % aeroPalettes.length];
    const direction = Math.random() > 0.5 ? 1 : -1;
    const burstProperties = [
      '--burst-a', '--burst-b', '--burst-c', '--burst-angle',
      '--burst-a-x', '--burst-a-y', '--burst-b-x', '--burst-b-y',
      '--burst-c-x', '--burst-c-y'
    ];

    // Preserve the sleek interface's randomized palette before preparing
    // a separate Personal Portal palette for the same card.
    burstProperties.forEach((property) => {
      const key = `modern${property.replace(/^--/, '').replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())}`;
      card.dataset[key] = card.style.getPropertyValue(property);
    });

    const retroPalette = {
      '--burst-a': palette[0],
      '--burst-b': palette[1],
      '--burst-c': palette[2],
      '--burst-angle': `${Math.round(100 + Math.random() * 48)}deg`,
      '--burst-a-x': `${direction * (8 + Math.random() * 8)}%`,
      '--burst-a-y': `${-(6 + Math.random() * 7)}%`,
      '--burst-b-x': `${-direction * (10 + Math.random() * 8)}%`,
      '--burst-b-y': `${9 + Math.random() * 8}%`,
      '--burst-c-x': `${direction * (11 + Math.random() * 7)}%`,
      '--burst-c-y': `${11 + Math.random() * 8}%`
    };

    Object.entries(retroPalette).forEach(([property, value]) => {
      const key = `retro${property.replace(/^--/, '').replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())}`;
      card.dataset[key] = value;
      if (document.documentElement.dataset.interfaceTheme === 'retro') {
        card.style.setProperty(property, value);
      }
    });

    card.style.setProperty('--bubble-x1', `${8 + Math.random() * 25}%`);
    card.style.setProperty('--bubble-y1', `${8 + Math.random() * 28}%`);
    card.style.setProperty('--bubble-x2', `${67 + Math.random() * 23}%`);
    card.style.setProperty('--bubble-y2', `${8 + Math.random() * 35}%`);
    card.style.setProperty('--bubble-x3', `${55 + Math.random() * 35}%`);
    card.style.setProperty('--bubble-y3', `${62 + Math.random() * 28}%`);

    if (!card.querySelector('.retro-aero-layer')) {
      const layer = document.createElement('span');
      layer.className = 'retro-aero-layer';
      layer.setAttribute('aria-hidden', 'true');
      card.prepend(layer);
    }

    if (body.classList.contains('retro-terminal') && !card.querySelector('.retro-window-bar')) {
      const bar = document.createElement('span');
      bar.className = 'retro-window-bar';
      bar.setAttribute('aria-hidden', 'true');

      const label = document.createElement('span');
      label.textContent = windowTitles[index] || `WINDOW_${String(index + 1).padStart(2, '0')}.DAT`;

      const controls = document.createElement('span');
      controls.className = 'retro-window-controls';
      controls.innerHTML = '<i></i><i></i><i></i>';

      bar.append(label, controls);
      card.prepend(bar);
    }

    card.addEventListener('pointerenter', () => card.classList.add('is-pointer-active'));
    card.addEventListener('pointerleave', () => card.classList.remove('is-pointer-active'));
    card.addEventListener('focusin', () => card.classList.add('is-pointer-active'));
    card.addEventListener('focusout', () => card.classList.remove('is-pointer-active'));
  });

  if (body.classList.contains('retro-photo')) {
    const aurora = document.querySelector('.aurora-background');
    if (aurora) {
      const sparkCount = window.innerWidth < 700 ? 7 : 12;
      for (let index = 0; index < sparkCount; index += 1) {
        const spark = document.createElement('span');
        spark.className = 'retro-spark';
        spark.setAttribute('aria-hidden', 'true');
        spark.style.setProperty('--spark-x', `${4 + Math.random() * 92}%`);
        spark.style.setProperty('--spark-y', `${8 + Math.random() * 84}%`);
        spark.style.setProperty('--spark-size', `${5 + Math.random() * 8}px`);
        spark.style.setProperty('--spark-opacity', `${(0.22 + Math.random() * 0.28).toFixed(2)}`);
        spark.style.setProperty('--spark-speed', `${(4.5 + Math.random() * 5).toFixed(1)}s`);
        spark.style.setProperty('--spark-delay', `${(-Math.random() * 7).toFixed(1)}s`);
        aurora.appendChild(spark);
      }
    }
  }

  if (reducedMotion) body.classList.add('retro-reduced-motion');
})();
