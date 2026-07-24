# ai-pet Landing Page

Static marketing site for ai-pet, built as an independent Vite application.

## Local development

```bash
npm install
npm run dev
```

## Verification

```bash
npm test
npm run typecheck
npm run build
npm run preview
```

The production build is written to `dist/` and uses relative asset paths by default. The GitHub Pages workflow builds with `/ai-pet/` as the project-site base path.

## Waitlist

The waitlist is intentionally local-only. It makes no network requests and does not persist email addresses.

- Any new valid email: success
- The reserved duplicate address: duplicate state
- The reserved error address: error state

## Custom pets

The character section explains that ai-pet supports PNG, WebP, GIF, and complete character packages. The landing page does not select, upload, or persist local files.

## Deployment

The public repository contains only this landing application. Pushing `main` runs tests, type checking, and the GitHub Pages build before deploying `dist/`.
