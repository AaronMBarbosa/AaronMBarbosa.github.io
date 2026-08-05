(() => {
  const body = document.body;
  if (!body.classList.contains('portal-era')) return;

  const createControls = () => {
    const controls = document.createElement('span');
    controls.className = 'portal-controls';
    controls.setAttribute('aria-hidden', 'true');
    controls.innerHTML = '<i>_</i><i>□</i><i>×</i>';
    return controls;
  };

  const header = document.querySelector('.site-header');
  if (header && !header.querySelector('.portal-titlebar')) {
    const brand = header.querySelector('.brand');
    const nav = header.querySelector('.nav-links');

    const titlebar = document.createElement('div');
    titlebar.className = 'portal-titlebar';
    titlebar.innerHTML = '<span class="portal-app-icon">AB</span><span>Aaron Online 5.6 — Home</span>';
    titlebar.appendChild(createControls());

    const menubar = document.createElement('div');
    menubar.className = 'portal-menubar';
    menubar.setAttribute('aria-hidden', 'true');
    ['File', 'Edit', 'View', 'People', 'Favorites', 'Tools', 'Window', 'Help'].forEach((label) => {
      const item = document.createElement('span');
      item.textContent = label;
      menubar.appendChild(item);
    });

    const quickbar = document.createElement('div');
    quickbar.className = 'portal-quickbar';
    quickbar.setAttribute('aria-label', 'Quick links');
    const quickLinks = [
      ['✉', 'Mail', 'mailto:aambar1101@icloud.com'],
      ['★', 'Work', '#work'],
      ['☺', 'Profile', '#about'],
      ['▧', 'Photos', 'photo.html'],
      ['◎', 'Links', '#contact']
    ];
    quickLinks.forEach(([icon, label, href]) => {
      const link = document.createElement('a');
      link.href = href;
      link.innerHTML = `<span>${icon}</span><small>${label}</small>`;
      quickbar.appendChild(link);
    });

    const addressbar = document.createElement('div');
    addressbar.className = 'portal-addressbar';
    addressbar.innerHTML = `
      <span class="portal-welcome">Welcome</span>
      <span class="portal-history" aria-hidden="true">◀</span>
      <span class="portal-history" aria-hidden="true">▶</span>
      <span class="portal-home" aria-hidden="true">⌂</span>
      <span class="portal-address"><b>Address</b><code>aaron://home/profile</code></span>
      <span class="portal-go">Go</span>
    `;

    const identity = document.createElement('div');
    identity.className = 'portal-identity-row';
    if (brand) identity.appendChild(brand);
    if (nav) identity.appendChild(nav);

    header.append(titlebar, menubar, quickbar, addressbar, identity);
  }

  const cards = [...document.querySelectorAll('.card')];
  const statuses = [
    'HOME PAGE LOADED · USER ONLINE',
    'PROFILE PHOTO · 1 IMAGE',
    'WORK HISTORY · CURRENT ROLE',
    'PREFERENCES · 3 ITEMS',
    'ARCHIVE · GENERAL MOTORS',
    'EDUCATION · VERIFIED',
    'PHOTO ALBUM · 172 FILES',
    'INTERESTS · PUBLIC',
    'BUDDY LIST · AVAILABLE'
  ];

  cards.forEach((card, index) => {
    card.classList.add('portal-window');
    card.dataset.portalStatus = statuses[index] || 'READY';

    if (!card.querySelector('.portal-status-strip')) {
      const strip = document.createElement('span');
      strip.className = 'portal-status-strip';
      strip.setAttribute('aria-hidden', 'true');
      strip.textContent = card.dataset.portalStatus;
      card.appendChild(strip);
    }
  });

  const caption = document.querySelector('.portrait-caption');
  if (caption && !caption.querySelector('.portal-profile-flags')) {
    const flags = document.createElement('span');
    flags.className = 'portal-profile-flags';
    flags.innerHTML = '<b>● ONLINE</b><em>Profile views: 042</em>';
    caption.appendChild(flags);
  }

  const contactLinks = document.querySelector('.contact-links');
  if (contactLinks) contactLinks.setAttribute('data-title', "Aaron's Buddy List");

  const footer = document.querySelector('.site-footer');
  if (footer && !footer.querySelector('.portal-tray')) {
    const tray = document.createElement('span');
    tray.className = 'portal-tray';
    const clock = document.createElement('span');
    const updateClock = () => {
      clock.textContent = new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' }).format(new Date());
    };
    tray.innerHTML = '<span>● Connected</span><span>♫</span>';
    tray.appendChild(clock);
    updateClock();
    window.setInterval(updateClock, 30000);
    footer.appendChild(tray);
  }

  const galleryHeader = document.querySelector('.gallery-header');
  if (galleryHeader && !galleryHeader.querySelector('.portal-gallery-titlebar')) {
    const existing = [...galleryHeader.children];
    const main = document.createElement('div');
    main.className = 'portal-gallery-main';
    existing.forEach((child) => main.appendChild(child));

    const title = document.createElement('div');
    title.className = 'portal-gallery-titlebar';
    title.innerHTML = '<span><b>▧</b> Aaron Photo Album — 35mm Archive</span>';
    title.appendChild(createControls());

    const menu = document.createElement('div');
    menu.className = 'portal-gallery-menu';
    menu.innerHTML = '<span>File</span><span>Edit</span><span>View</span><span>Slideshow</span><span>Favorites</span><span>Help</span>';

    const location = document.createElement('div');
    location.className = 'portal-gallery-location';
    location.innerHTML = '<b>Location</b><code>album://aaron/selected-frames</code><span>Go</span>';

    galleryHeader.append(title, menu, location, main);
  }

  const intro = document.querySelector('.gallery-intro');
  if (intro && !intro.querySelector('.portal-intro-bar')) {
    const bar = document.createElement('div');
    bar.className = 'portal-intro-bar';
    bar.innerHTML = '<span>Welcome to Aaron’s Photo Album</span><i aria-hidden="true">?</i>';
    intro.prepend(bar);
  }
})();
