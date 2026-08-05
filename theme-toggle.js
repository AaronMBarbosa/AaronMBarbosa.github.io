(() => {
  const root = document.documentElement;
  const body = document.body;
  const retroSheet = document.querySelector('#retro-theme-css');
  const portalSheet = document.querySelector('#portal-theme-css');
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const STORAGE_KEY = 'aaron-interface-theme';
  let switching = false;
  let transitionTimers = [];

  const getStoredTheme = () => {
    const current = root.dataset.interfaceTheme;
    return current === 'retro' ? 'retro' : 'modern';
  };

  const saveTheme = (theme) => {
    try { localStorage.setItem(STORAGE_KEY, theme); } catch (_) {}
  };

  const clearTransitionTimers = () => {
    transitionTimers.forEach((timer) => window.clearTimeout(timer));
    transitionTimers = [];
  };

  const buildToggle = () => {
    const button = document.createElement('button');
    button.className = 'interface-toggle';
    button.type = 'button';
    button.innerHTML = `
      <span class="interface-toggle__icon" aria-hidden="true">AB</span>
      <span class="interface-toggle__copy">
        <strong></strong>
        <small></small>
      </span>
      <span class="interface-toggle__switch" aria-hidden="true"></span>
    `;
    body.appendChild(button);
    return button;
  };

  const buildTransition = () => {
    const overlay = document.createElement('div');
    overlay.className = 'interface-transition';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML = `
      <div class="interface-transition__ghost-desktop" aria-hidden="true">
        <span class="interface-transition__ghost-window ghost-window--one"><i></i><b></b></span>
        <span class="interface-transition__ghost-window ghost-window--two"><i></i><b></b></span>
        <span class="interface-transition__ghost-window ghost-window--three"><i></i><b></b></span>
      </div>

      <div class="interface-transition__modern-stage" aria-hidden="true">
        <span class="interface-transition__crt-line"></span>
        <span class="interface-transition__glass-orb orb-one"></span>
        <span class="interface-transition__glass-orb orb-two"></span>
        <span class="interface-transition__glass-orb orb-three"></span>
      </div>

      <div class="interface-transition__panel" role="status" aria-live="polite">
        <div class="interface-transition__title">
          <span class="interface-transition__title-text"></span>
          <span class="interface-transition__window-buttons" aria-hidden="true">
            <i></i><i></i><i></i>
          </span>
        </div>

        <div class="interface-transition__body">
          <div class="interface-transition__identity">
            <span class="interface-transition__mark" aria-hidden="true">AB</span>
            <div class="interface-transition__copy">
              <strong></strong>
              <p class="interface-transition__status"></p>
            </div>
          </div>

          <div class="interface-transition__modem" aria-hidden="true">
            <div class="interface-transition__modem-head">
              <span>CONNECTION MONITOR</span>
              <span class="interface-transition__speed">56.0 Kbps</span>
            </div>
            <div class="interface-transition__lights">
              <span><i></i>POWER</span>
              <span><i></i>LINK</span>
              <span><i></i>AUTH</span>
              <span><i></i>DATA</span>
            </div>
            <div class="interface-transition__signal">
              <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
            </div>
          </div>

          <div class="interface-transition__terminal" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <span class="interface-transition__progress" aria-hidden="true"><i></i></span>
          <div class="interface-transition__footer" aria-hidden="true">
            <span class="interface-transition__packet">TX <b>0000</b></span>
            <span class="interface-transition__clock">00:00</span>
          </div>
        </div>
      </div>
    `;
    body.appendChild(overlay);
    return overlay;
  };

  const toggle = buildToggle();
  const overlay = buildTransition();
  const toggleStrong = toggle.querySelector('strong');
  const toggleSmall = toggle.querySelector('small');
  const overlayTitle = overlay.querySelector('.interface-transition__title-text');
  const overlayStrong = overlay.querySelector('.interface-transition__copy strong');
  const overlayStatus = overlay.querySelector('.interface-transition__status');
  const terminalLines = [...overlay.querySelectorAll('.interface-transition__terminal span')];
  const lights = [...overlay.querySelectorAll('.interface-transition__lights span')];
  const packetCount = overlay.querySelector('.interface-transition__packet b');
  const transitionClock = overlay.querySelector('.interface-transition__clock');

  const updateToggle = (theme) => {
    const retro = theme === 'retro';
    toggle.setAttribute('aria-pressed', String(retro));
    toggle.setAttribute('aria-label', retro ? 'Switch to the sleek modern interface' : 'Open the AOL Personal Portal interface');
    toggleStrong.textContent = retro ? 'Switch to Modern UI' : 'Open Personal Portal';
    toggleSmall.textContent = retro ? 'Glass + chroma interface' : 'Aaron Online 5.6';
  };

  const applyTheme = (theme, persist = true) => {
    const retro = theme === 'retro';
    if (retroSheet) retroSheet.disabled = !retro;
    if (portalSheet) portalSheet.disabled = !retro;

    root.dataset.interfaceTheme = theme;
    body.classList.toggle('theme-retro', retro);
    body.classList.toggle('theme-modern', !retro);

    const burstProperties = [
      '--burst-a', '--burst-b', '--burst-c', '--burst-angle',
      '--burst-a-x', '--burst-a-y', '--burst-b-x', '--burst-b-y',
      '--burst-c-x', '--burst-c-y'
    ];
    document.querySelectorAll('.card').forEach((card) => {
      burstProperties.forEach((property) => {
        const suffix = property.replace(/^--/, '').replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
        const value = card.dataset[`${retro ? 'retro' : 'modern'}${suffix}`];
        if (value) card.style.setProperty(property, value);
      });
    });

    if (themeMeta) themeMeta.content = retro ? '#2e65d5' : '#09090b';
    document.title = body.classList.contains('portal-photo')
      ? `Photos — Aaron Barbosa${retro ? ' Personal Portal' : ''}`
      : retro
        ? 'Aaron Barbosa — Personal Portal Portfolio'
        : 'Aaron Barbosa — Software Engineer';

    updateToggle(theme);
    if (persist) saveTheme(theme);
  };

  const statusSets = {
    retro: {
      title: 'Aaron Online Setup — Dial-Up Connection',
      heading: 'Connecting to Personal Portal…',
      lines: [
        'Opening COM1 and waking modem…',
        'Dialing Aaron Online access number…',
        'Carrier detected at 56.0 Kbps.',
        'Authenticating USER: AARON…',
        'Loading profile windows and buddy list…',
        'Synchronizing photos, links, and work files…',
        'Welcome. You’ve got portfolio.'
      ],
      terminal: [
        ['ATZ', 'OK', 'ATDT 555-PORTFOLIO'],
        ['CONNECT 56000/V90', 'PPP SESSION OPEN', 'AUTH: ********'],
        ['PROFILE.EXE READY', 'BUDDYLIST.DAT LOADED', 'WELCOME, AARON']
      ]
    },
    modern: {
      title: 'Aaron Online — Interface Upgrade',
      heading: 'Switching to Modern UI…',
      lines: [
        'Saving Personal Portal session…',
        'Closing legacy windows…',
        'Converting segmented progress to glass…',
        'Starting chroma and ambient layers…',
        'Modern interface ready.'
      ],
      terminal: [
        ['SESSION SAVE /AARON', 'WINDOW CACHE CLOSED', 'LEGACY UI RELEASED'],
        ['GLASS.KERNEL START', 'CHROMA RNG SEEDED', 'UI MODE: MODERN']
      ]
    }
  };

  const resetTransitionVisuals = () => {
    overlay.classList.remove('is-active', 'to-modern', 'to-retro', 'theme-applied', 'is-complete', 'ghosts-cleared');
    overlay.dataset.step = '0';
    lights.forEach((light) => light.classList.remove('is-on'));
    terminalLines.forEach((line) => { line.textContent = ''; });
    packetCount.textContent = '0000';
    transitionClock.textContent = '00:00';
  };

  const setTransitionStep = (step, setup, maxSeconds = 3) => {
    overlay.dataset.step = String(step);
    overlayStatus.textContent = setup.lines[Math.min(step, setup.lines.length - 1)];

    lights.forEach((light, index) => {
      light.classList.toggle('is-on', index <= Math.min(step, lights.length - 1));
    });

    const terminalGroup = setup.terminal[Math.min(Math.floor(step / 2), setup.terminal.length - 1)];
    terminalLines.forEach((line, index) => {
      line.textContent = terminalGroup[index] || '';
    });

    packetCount.textContent = String(Math.min(9999, step * 137 + 42)).padStart(4, '0');
    const denominator = Math.max(1, setup.lines.length - 1);
    const elapsedSeconds = Math.min(maxSeconds, Math.floor((step / denominator) * maxSeconds));
    transitionClock.textContent = `00:0${elapsedSeconds}`;
  };

  const finishTransition = () => {
    overlay.classList.remove('is-active');
    overlay.setAttribute('aria-hidden', 'true');
    root.classList.remove('interface-switching');
    switching = false;
    toggle.focus({ preventScroll: true });
    window.setTimeout(resetTransitionVisuals, 180);
  };

  const switchTheme = (nextTheme) => {
    if (switching || nextTheme === getStoredTheme()) return;
    switching = true;
    clearTransitionTimers();
    resetTransitionVisuals();

    const setup = statusSets[nextTheme];
    overlay.classList.add(nextTheme === 'retro' ? 'to-retro' : 'to-modern');
    overlayTitle.textContent = setup.title;
    overlayStrong.textContent = setup.heading;
    setTransitionStep(0, setup, nextTheme === 'retro' ? 3 : 2);
    overlay.setAttribute('aria-hidden', 'false');
    root.classList.add('interface-switching');

    const progress = overlay.querySelector('.interface-transition__progress i');
    progress.style.animation = 'none';
    void progress.offsetWidth;
    progress.style.animation = '';

    overlay.classList.add('is-active');

    if (reducedMotion) {
      transitionTimers.push(window.setTimeout(() => {
        applyTheme(nextTheme);
        finishTransition();
      }, 160));
      return;
    }

    if (nextTheme === 'retro') {
      // Original full AOL dial-up sequence — intentionally preserved.
      const stepTimes = [420, 850, 1280, 1710, 2110, 2780];
      stepTimes.forEach((delay, index) => {
        transitionTimers.push(window.setTimeout(() => setTransitionStep(index + 1, setup, 3), delay));
      });

      transitionTimers.push(window.setTimeout(() => {
        applyTheme(nextTheme);
        overlay.classList.add('theme-applied');
      }, 2450));

      transitionTimers.push(window.setTimeout(() => {
        overlay.classList.add('is-complete');
      }, 3050));

      transitionTimers.push(window.setTimeout(finishTransition, 3600));
      return;
    }

    // Retro -> Modern is deliberately shorter and quieter. It retains the
    // segmented-bar-to-glass morph, but avoids the prolonged white flash and
    // oversized color bloom from the earlier version.
    const modernStepTimes = [360, 760, 1160, 1530];
    modernStepTimes.forEach((delay, index) => {
      transitionTimers.push(window.setTimeout(() => setTransitionStep(index + 1, setup, 2), delay));
    });

    // Remove the decorative legacy windows from the compositor before the
    // modern page is exposed. Without this explicit cleanup, some browsers can
    // retain a translucent frame for one or two painted frames.
    transitionTimers.push(window.setTimeout(() => {
      overlay.classList.add('ghosts-cleared');
    }, 1060));

    transitionTimers.push(window.setTimeout(() => {
      applyTheme(nextTheme);
      overlay.classList.add('theme-applied');
    }, 1420));

    transitionTimers.push(window.setTimeout(() => {
      overlay.classList.add('is-complete');
    }, 1900));

    transitionTimers.push(window.setTimeout(finishTransition, 2300));
  };

  const initialTheme = getStoredTheme();
  applyTheme(initialTheme, false);

  toggle.addEventListener('click', () => {
    switchTheme(getStoredTheme() === 'retro' ? 'modern' : 'retro');
  });
})();
