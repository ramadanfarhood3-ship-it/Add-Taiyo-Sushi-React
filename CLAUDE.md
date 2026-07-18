# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

A single-page React marketing site for Taiyo Sushi Restaurant (Damascus). Vite + React 18 + Tailwind CSS, no backend, no router — one page composed of stacked section components linked by scroll anchors.

## Commands

```bash
npm install       # install dependencies
npm run dev        # start Vite dev server on port 3000 (auto-opens browser)
npm run build       # production build to dist/
npm run preview      # preview the production build
```

There is no test suite and no lint script configured in `package.json` — don't assume `npm test` or `npm run lint` exist.

## Known issue: broken `src/` path (fix before running build/dev)

`index.html` loads `<script type="module" src="/src/main.jsx">` and `tailwind.config.js` scans content from `./src/**/*.{js,ts,jsx,tsx}`, but **all source files currently live at the repo root** (`main.jsx`, `App.jsx`, `Navbar.jsx`, etc.) instead of under `src/` and `src/components/`. As-is, `npm run build` fails immediately with `Failed to resolve /src/main.jsx from index.html`, and Tailwind would never pick up class names from the components even if the dev server ran.

The README documents the *intended* layout:
```
src/
├── main.jsx
├── App.jsx
├── index.css
└── components/
    ├── Navbar.jsx
    ├── Hero.jsx
    ├── About.jsx
    ├── Menu.jsx
    ├── Gallery.jsx
    ├── Reviews.jsx
    ├── Location.jsx
    ├── Reservation.jsx
    └── Footer.jsx
```
`App.jsx` already imports components as `./components/Navbar`, `./components/Hero`, etc., consistent with this intended layout. If asked to get the app running, move `main.jsx`, `App.jsx`, and `index.css` into `src/`, and the eight section components into `src/components/`, rather than rewriting the imports or the Vite/Tailwind config.

## Architecture

- **`App.jsx`** is the whole app. It owns a single piece of state — `darkMode` — initialized from `prefers-color-scheme` and toggled by adding/removing the `dark` class on `document.documentElement` (Tailwind's `darkMode: 'class'`). It renders one section component after another in a fixed order: `Navbar`, `Hero`, `About`, `Menu`, `Gallery`, `Reviews`, `Location`, `Reservation`, `Footer`. `darkMode`/`toggleDarkMode` are passed only to `Navbar`; every other section is self-contained and reads Tailwind's `dark:` variants directly.
- **Navigation is anchor-based**, not routed. `Navbar`'s `navLinks` array maps labels to `#id` hashes (`#home`, `#about`, `#menu`, …) matching each section's root `id`; clicking calls `scrollIntoView({ behavior: 'smooth' })` instead of using a router. When adding/renaming a section, keep its root element `id` in sync with the corresponding `Navbar` entry.
- **Scroll-reveal animation pattern**: `About`, `Menu`, `Gallery`, and `Reservation` each repeat the same idiom — a `useRef` on the section, a `useEffect` that attaches an `IntersectionObserver` to flip a local `isVisible` state, and Tailwind animation classes (`animate-fade-in-up`, etc., defined in `tailwind.config.js`) applied conditionally on `isVisible`. Follow this existing pattern rather than introducing a new animation library when adding similar effects to other sections.
- **No backend/API calls anywhere** — `Reservation.jsx`'s `handleSubmit` only sets local `submitted` state (a mock confirmation, auto-reset after a timeout); it does not send data anywhere. Don't assume a form endpoint exists.
- **Styling is all Tailwind utility classes** plus a small set of custom pieces:
  - Custom color palette `taiyo.{black,dark,red,gold,goldLight,cream}` and custom fonts (`font-serif` = Playfair Display, `font-sans` = Inter) are defined in `tailwind.config.js`, alongside the custom keyframe animations used by the scroll-reveal pattern above.
  - `index.css` adds a handful of hand-written utility classes under `@layer utilities` (`glass-effect`, `text-shadow`, `scrollbar-hide`, `nav-link`) — check there before reinventing similar effects.
- Icons come from `lucide-react`; fonts (Playfair Display, Inter) are loaded via Google Fonts `<link>` tags in `index.html`, not bundled.
