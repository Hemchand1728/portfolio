# Hemachandu Gunthati — Portfolio

A single-page portfolio with a real-time 3D hero, built with:

- **React 19 + TypeScript**, bundled with **Vite**
- **Tailwind CSS v4** for styling (light and dark themes)
- **Three.js** via **React Three Fiber** and **drei** for the 3D armillary-sphere hero
- **Motion** (Framer Motion) for reveal, tilt and page animations
- **Lenis** for smooth scrolling

## Run locally

```bash
npm install
npm run dev
```

## Edit content

All text, links, projects and skills live in [`src/data.ts`](src/data.ts). Your photo lives at `public/hemachandu.webp`.

## Deploy

Pushing to `main` on GitHub runs `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages. In the repository, go to **Settings → Pages** and set **Source** to **GitHub Actions** once.

It also deploys to Vercel or Netlify with no changes: build command `npm run build`, output directory `dist`.

The previous plain HTML/CSS/JS version is kept in `legacy/`.
