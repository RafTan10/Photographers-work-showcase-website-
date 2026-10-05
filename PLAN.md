# Project Plan — Photographer Portfolio

## Goal
A fast, single-page portfolio that leads with the photographs: a striking 3D hero, then all 20
images with titles and short descriptions, then a short about + contact.

## Current focus: Hero section only
Build and polish the **hero** first; the Work grid, lightbox and About/Contact stay as working
drafts and are not worked on until the hero is signed off.

Hero contents:
- Name **Tanvir Jawad**, tagline "Documentary & street photographer · Bangladesh"
- One-line intro: *Documenting the everyday lives of Bangladesh's people — and the politics that shape them.*
- 3D CircularGallery of 12 featured photos (rotates on its own + on scroll)
- **Next:** his portrait (photo to be supplied) — decide placement in the hero

## About the photographer (approved copy source: Rafid)
Tanvir Jawad is a documentary and street photographer and a third-year journalism student at
Daffodil International University (DIU). His work follows the day-to-day lives of people across
Bangladesh — on its streets, in its open landscapes, and in the political moments whose
consequences fall on ordinary people.

Trained as a journalist, he photographs with one aim: to bring the truth to light.

Alongside his documentary work, Tanvir shoots events and fests for mobile brands in Bangladesh
and event-management companies, and is a key member of DIU's photography club.

## Page structure
| # | Section | What it does | Status |
|---|---------|--------------|--------|
| 1 | Nav | Name + Work / About / Contact anchors, fixed, blends over images | ✅ |
| 2 | Hero | 21st.dev **CircularGallery** with 12 featured photos, photographer name, rotates on its own and with scroll (sticky, 220vh) | ✅ |
| 3 | Selected Work | All 20 photos in a 1/2/3-column masonry grid, each with title, place · year, description | ✅ |
| 4 | Lightbox | shadcn Dialog, full-size image, caption, ← / → keys and buttons | ✅ |
| 5 | About + Contact | Bio ✅, location, email, Instagram (TODO); copyright footer | draft |

## Phases
1. **Setup** — Vite + React + TS, Tailwind v4, shadcn init, `@/` alias, VS Code config, CLAUDE.md ✅
2. **Assets** — download 20 originals from Drive (≈135 MB) → optimised WebP in two sizes (≈11 MB total) ✅
3. **Hero** — integrate CircularGallery, fix its issues (see below) ✅
4. **Content** — draft titles/descriptions/alt text ✅ → **photographer to confirm** ⏳
5. **Polish** — real name/bio/contact, favicon + OG image, check on real phones ⏳
6. **Launch** — Git repo, deploy to Vercel/Netlify, custom domain ⏳

## Fixes applied to the 21st.dev component
1. Duplicate local `cn` → shared `@/lib/utils` (shadcn).
2. `NodeJS.Timeout` type (Node-only) → removed; browser timers only.
3. `setRotation` every animation frame re-rendered all cards 60×/s → rAF loop writes to refs.
4. Scroll rotation was tied to the **whole page** height and *replaced* the auto angle (visible
   jump) → measured over the hero section only and *added* to auto rotation, eased.
5. Fixed `radius=600` overlapped cards with >10 items → radius auto-fits count × card width.
6. Fixed 300×400 cards overflowed phones → card size scales with gallery width.
7. No reduced-motion support → auto-rotation off when `prefers-reduced-motion`.
8. 10 × `<h2>` inside cards broke heading outline → `<h3>`; cards are buttons (keyboard + click → lightbox).
9. `backdrop-blur` on every 3D card (expensive) removed; mirrored card backs hidden.
10. Animal-specific fields `common/binomial` → `title/subtitle`.
11. Demo's `import { CircularGallery, GalleryItem }` fails under `verbatimModuleSyntax` → `import type`.

## Questions for the photographer
- ~~Name, short bio~~ ✅ · still need: contact email, Instagram, portrait photo
- For each photo: correct title, location, date, and anything that should *not* be said
- Which photos must be in the hero ring; any to drop or swap
- Print sales / licensing info to show?
