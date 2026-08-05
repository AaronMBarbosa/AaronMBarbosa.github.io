# Aaron Barbosa — Dual Interface Portfolio

This edition combines both completed portfolio designs in one static GitHub Pages site:

- **Modern UI:** dark liquid-glass bento layout with randomized chroma hover effects.
- **Personal Portal:** bright AOL/MySpace-era window chrome layered over the same portfolio.

A persistent interface switch appears in the lower-right corner. The selected style is saved in `localStorage`, so it follows the visitor between the home and photography pages.

## Theme transition

Switching to Personal Portal plays a short AOL-style connection sequence. Switching back runs a glass-and-chroma restoration animation. Reduced-motion preferences are respected.

## Files

- `index.html` — portfolio page
- `photo.html` — interactive photography page
- `style.css` / `style2.css` — original modern interfaces
- `retro.css` / `portal.css` — Personal Portal interfaces
- `theme-toggle.css` — persistent switch and transition visuals
- `theme-toggle.js` — theme state, persistence, and transition logic
- `script.js` / `script2.js` — original site interactions
- `retro.js` / `portal.js` — retro interface enhancements

## Deployment

Upload the contents of this folder to the root of the GitHub Pages repository. Preserve the repository's existing full `photos` folder; the packaged version contains only the assets available in the working copy.
