# Promeos Site

This is a sectionized version of the Promeos landing page.

## Structure

```text
promeos-site/
  index.html
  assets/
    FullLogo_Transparent_NoBuffer.png
  css/
    styles.css
  js/
    main.js
```

## How to open in VS Code

1. Unzip the folder.
2. Open VS Code.
3. Choose **File > Open Folder**.
4. Select the `promeos-site` folder.
5. Open `index.html` in a browser, or use the VS Code Live Server extension.

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

If you want, I can:
- Generate optimized WebP/AVIF versions of the logo and other images and wire them into `<picture>` fallbacks.
- Add a small CI workflow to run linters (ESLint/Stylelint) before deploy.

### Image optimization & CI

I added a small Node-based tool to generate AVIF/WebP fallbacks from your existing raster images and to create a `favicon.ico`.

Run the following to install dev dependencies and optimize images locally:

```bash
npm ci
npm run optimize-images
```

I also added lint configs and a GitHub Actions workflow at `.github/workflows/ci.yml` that runs image optimization, linters, and a Lighthouse CI run (uploads results to temporary public storage).

## Publish to GitHub Pages

This repository includes an automated deploy workflow at `.github/workflows/deploy-pages.yml` which will publish the repository root to GitHub Pages when you push to the `main` branch.

1. Create a GitHub repository and push this project to it (set the remote `origin`).

```bash
git init
git add .
git commit -m "Initial: site + CI + Pages workflow"
git branch -M main
git remote add origin <git@github.com:your-username/your-repo.git>
git push -u origin main
```

2. The `deploy-pages.yml` workflow will run on push to `main` and publish the site. Wait a couple minutes, then visit `https://<your-username>.github.io/<your-repo>/` to view the site.

3. If you prefer to use a custom domain, add a `CNAME` file in the repo root with your domain and configure DNS accordingly. The Pages workflow will respect the `CNAME` file when publishing.

If you'd like, I can create a branch and commit these changes for you here, or help with creating the remote repo and pushing; tell me which GitHub repo name to use (or paste the remote URL) and I will prepare a commit message and instructions.
