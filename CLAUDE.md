# CLAUDE.md — Photographer Portfolio

Single-page portfolio for **Tanvir Jawad**, a documentary/street photographer and DIU journalism student in Bangladesh.
**Current phase: hero section only** — don't restyle Work/About/Contact until the hero is signed off.
Hero = 3D rotating ring of featured photos → Intro (bio + Instagram/Facebook left, portrait right)
→ "Selected Work" grid of all 20 photos with descriptions → Contact. Clicking any photo opens a lightbox.

## Stack
- Vite 8 + React 19 + TypeScript 6 (strict, `verbatimModuleSyntax` → use `import type` for types)
- Tailwind CSS v4 via `@tailwindcss/vite` — **no `tailwind.config.js`**; theme tokens live in `src/index.css`
- shadcn/ui (style `radix-nova`, base color neutral, lucide icons) — config in `components.json`
- Fonts: Geist Variable (body), Instrument Serif (headings, `font-heading`)
- Lint: oxlint · Format: Prettier + prettier-plugin-tailwindcss

## Commands
```bash
npm install        # first time
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build → dist/
npm run lint       # oxlint
npm run format     # prettier on src/
```
Always run `npm run build` and `npm run lint` before saying a change is done.

## Layout
```
src/
  components/
    ui/               shadcn + 21st.dev primitives (button, dialog, circular-gallery)
    sections/         page sections: hero, intro, work-grid, lightbox, about-contact (contact + footer)
  data/photos.ts      ALL photo metadata + photographer info (single source of truth)
  lib/utils.ts        cn() helper
  index.css           Tailwind import, theme tokens (light + .dark), fonts
public/photos/
  full/NN-slug.webp   2400px long edge — lightbox
  card/NN-slug.webp   1000px long edge — ring cards + grid
```
Import alias: `@/` → `src/`.

## Conventions
- `components/ui/` is the shadcn folder. Add shadcn components with `npx shadcn@latest add <name>`;
  paste 21st.dev components there too. Page-specific composition goes in `components/sections/`.
- Use `cn()` from `@/lib/utils` — never re-declare a local `cn`.
- Use theme tokens (`bg-background`, `text-muted-foreground`, `border-border`…) not raw colors.
  The site runs in dark mode (`class="dark"` on `<html>` in `index.html`).
- Never hard-code photo paths in components — go through `photos` / `photoUrl()` in `src/data/photos.ts`.
- Every `<img>` needs meaningful `alt` text (from `photo.alt`). Lazy-load anything below the fold.

## Adding / replacing photos
1. Originals are on Google Drive (20 JPGs, 2–10 MB each). **Never commit originals** — they go in
   `photos-originals/` (git-ignored) if needed locally.
2. Export two WebP sizes named `NN-slug.webp` into `public/photos/full` (2400px, q≈82) and
   `public/photos/card` (1000px, q≈78). Apply EXIF rotation.
3. Add an entry to `photos` in `src/data/photos.ts`. `featured: true` puts it in the hero ring
   (keep the ring at ~10–14 photos). `focus` = CSS object-position for the portrait crop.

## CircularGallery notes (`src/components/ui/circular-gallery.tsx`)
Adapted from 21st.dev. Differences from the original — keep them:
- Animation runs in a rAF loop writing transforms to refs; it does **not** setState per frame.
- Scroll rotation is measured over `scrollContainerRef` (the hero section) and added to
  auto-rotation, so there is no jump when scrolling starts/stops.
- Look/motion match the original: 300×400 cards, radius 600 : perspective 2000, far side of the
  ring visible at 30% opacity (no backface hiding), 0.02°/frame auto-rotation that pauses while
  scrolling, one full turn over the 500vh hero. Radius grows with item count (perspective scales
  with it); the whole ring scales down on small screens; honours `prefers-reduced-motion`.
- Cards render at their on-screen size (×`FRONT_MAG`) and the ring is pushed back by its radius so the
  front card sits at z=0 — same geometry as the original but no perspective upscaling (keeps text sharp).
  Don't add `will-change: transform` to the ring; it freezes rasterisation and blurs on mobile.
- Item shape is `{ title, subtitle, photo: { url, text, pos, by } }` (original used common/binomial).

## Open TODOs (need the photographer)
- Email → `PHOTOGRAPHER` in `src/data/photos.ts` (name, bio, portrait, Instagram, Facebook done).
  Social icons render greyed-out and unlinked until their URL is set.
- Confirm every photo's title, place, year and description (current text is a draft written
  from the images; be careful with claims about events or people)
- Favicon / OG image, domain + deployment (Vercel or Netlify: build `npm run build`, output `dist`)
