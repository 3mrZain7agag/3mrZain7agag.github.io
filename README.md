# Amr Hagag — Portfolio

Personal Data Engineering portfolio, built with React + Vite. Deploys to
GitHub Pages via GitHub Actions.

## Local development

```bash
npm install
npm run dev
```

## Deploying to GitHub Pages (3mrZain7agag.github.io)

This repo must be named **exactly** `3mrZain7agag.github.io` for GitHub
to serve it at the root domain.

1. Create a new repo on GitHub named `3mrZain7agag.github.io` (public).
2. Push this project to it:
   ```bash
   git init
   git remote add origin https://github.com/3mrZain7agag/3mrZain7agag.github.io.git
   git add .
   git commit -m "feat: initial portfolio"
   git branch -M main
   git push -u origin main
   ```
3. In the repo on GitHub: **Settings → Pages → Build and deployment → Source**,
   select **GitHub Actions**. (The workflow in `.github/workflows/deploy.yml`
   is already set up to build and deploy automatically on every push to `main`.)
4. Wait a minute for the first Action run to finish (check the **Actions** tab),
   then visit `https://3mrZain7agag.github.io`.

Every future push to `main` redeploys automatically — no server, no
subscriptions, no expiry.

## Editing content

All content lives in `src/App.jsx` — experience, projects, certificates, and
contact info are plain arrays near the top of each section component. Update
the F1 project's `stats`/`tags`/`link` there as the project evolves.

Styling and design tokens (colors, fonts, spacing) are in `src/index.css`.
