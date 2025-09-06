# Cosmic Compass

[![Live Preview](https://img.shields.io/badge/Live%20Preview-GitHub%20Pages-brightgreen)](https://knoksen.github.io/Cosmic-Compass/) 
[![Open in GitHub Codespaces](https://img.shields.io/badge/Open%20in-GitHub%20Codespaces-blue?logo=github)](https://codespaces.new/knoksen/Cosmic-Compass)
[![CI](https://github.com/knoksen/Cosmic-Compass/actions/workflows/ci.yml/badge.svg)](https://github.com/knoksen/Cosmic-Compass/actions/workflows/ci.yml)
[![Deploy](https://github.com/knoksen/Cosmic-Compass/actions/workflows/deploy.yml/badge.svg)](https://github.com/knoksen/Cosmic-Compass/actions/workflows/deploy.yml)
[![Smoke Test](https://github.com/knoksen/Cosmic-Compass/actions/workflows/smoke.yml/badge.svg)](https://github.com/knoksen/Cosmic-Compass/actions/workflows/smoke.yml)

Cosmic Compass is a Next.js application that lets you explore the vast wonders of the universe. From detailed information about planets and nebulae to a hangar of famous starships, this app is a portal to the cosmos.

🌌 **Features**:

- Interactive starfield background
- Explore destinations across the cosmos
- Virtual starship hangar
- FTL jump simulator

This project is built with Next.js, React, TypeScript, and Tailwind CSS. It features a stunning visual design with a deep space theme and interactive elements to create an immersive user experience.

## Quick Start 🚀

### Option 1: Instant Dev Environment

Click the "Open in GitHub Codespaces" button above to start coding right away. The dev environment will:

- Auto-install dependencies
- Start the dev server
- Open the app in a new browser tab

### Option 2: Local Development

1. Clone the repository:

   ```bash
   git clone https://github.com/knoksen/Cosmic-Compass.git
   cd Cosmic-Compass
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:9002](http://localhost:9002) in your browser

## Development Notes 📝

- This project uses Next.js 13+ with the App Router
- Styling is done with Tailwind CSS and shadcn/ui
- TypeScript is used for type safety
- Unit tests are written with Jest and React Testing Library

## Release Process 📦

1. Ensure CI is green (lint, typecheck, test, build).
2. Update `CHANGELOG.md` if needed.
3. Bump version in `package.json` (already at 0.2.0).
4. Commit and push changes:

   ```bash
   git add .
   git commit -m "chore(release): v0.2.0"
   git push origin main
   ```
   
5. Create and push tag:

   ```bash
   npm run release:tag
   ```
   
6. Deploy the `out/` directory (static export) to hosting (e.g. GitHub Pages, Firebase Hosting, Netlify, Vercel Static). For GitHub Pages you can publish `out` as the docs root or use an action.

### Automated Deployment (GitHub Pages)

This repo includes a deployment workflow (`deploy.yml`) that publishes the static export to GitHub Pages whenever you push a version tag (e.g. `v0.2.0`).

Steps:

1. Run release steps above (ensure version bumped & tagged)
2. Push the tag (`npm run release:tag` already does this)
3. The Deploy workflow builds with `NEXT_PUBLIC_BASE_PATH=/<repo-name>` and pushes `out/` to Pages
4. Access the site at: `https://<user>.github.io/<repo-name>/`

Local preview using the same base path:

```bash
npm run deploy:local
```

Then open `out/index.html` in a static server or via an editor preview.

## CI

The workflow `.github/workflows/ci.yml` runs on pushes and PRs to `main`:

- Install dependencies with `npm ci`
- Lint / typecheck / test
- Build & export static site
- Upload static export as artifact

## Future Ideas

- Add more tests (destination page, jump flow)
- Bundle size optimizations (lazy load audio/starfield)
- Accessibility audit
- Dark/light toggle (currently space theme only)

---

[![Live Preview](https://img.shields.io/badge/Live%20Preview-Open%20App-brightgreen)](https://cosmic-compass-app.web.app)
