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

The production build is written to `dist/` and uses relative asset paths for static hosting.

## Waitlist demo

The waitlist is intentionally local-only. It makes no network requests and does not persist email addresses.

- Any new valid email: success
- `duplicate@demo.test`: duplicate state
- `error@demo.test`: error state

## Custom pet demo

The character section accepts PNG, WebP, and GIF files up to 10 MB for a local preview. Files are rendered through an object URL, never uploaded or persisted, and released when the preview changes or the page closes.
