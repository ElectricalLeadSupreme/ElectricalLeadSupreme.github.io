# Promeos Site

This is a sectionized version of the Promeos landing page.

## Structure

```text
/
  index.html
  css/
    styles.css
  js/
    main.js
  assets/
    FullLogo_Transparent_NoBuffer.png
```

## How to open in VS Code

1. Open VS Code.
2. Choose **File > Open Folder**.
3. Select the repository root.
4. Open `index.html` in a browser, or use the VS Code Live Server extension.

## What changed

- Moved inline CSS into `css/styles.css`.
- Moved inline JavaScript into `js/main.js`.
- Replaced the embedded base64 logo with `assets/FullLogo_Transparent_NoBuffer.png`.
- Added semantic `header`, `main`, and footer structure.
- Improved mobile navigation accessibility with `aria-controls`, `aria-expanded`, and open/close labels.
- Added keyboard focus styles.
- Consolidated repeated CSS blocks.
- Added `prefers-reduced-motion` support.
- Throttled scroll background updates with `requestAnimationFrame`.
- Used `IntersectionObserver` for reveal animations.
- Added basic SEO and Open Graph meta tags.

## Quick notes & deploy

- The site includes responsive grid improvements and non-blocking font preload to reduce layout shifts and FOUT.
- I added an SVG favicon at `assets/favicon.svg` and set explicit `width`/`height` plus `loading="lazy"` on the logo images for layout stability.
- Do not reduce the vertical section paddings — they are intentionally preserved to keep the hero/background spacing.

To serve locally with a quick static server (Node.js must be installed):

```bash
npx http-server . -c-1 -p 8080
# then open http://localhost:8080
```

## Publish to GitHub Pages

This repository includes an automated deploy workflow at `.github/workflows/deploy-pages.yml` which will publish the repository root to GitHub Pages when you push to the `main` branch.

1. Push to the `main` branch:

```bash
git add .
git commit -m "Move site files to root"
git push origin main
```

2. The `deploy-pages.yml` workflow will run on push to `main` and publish the site. Wait a couple minutes, then visit `https://ElectricalLeadSupreme.github.io/` to view the site.
