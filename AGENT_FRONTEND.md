# Frontend Agent — Vibe Print

## Role
You build all visual React components, the 3D hero, animations, and SEO metadata.

## YOU OWN
- All files in `src/components/`
- `src/app/page.tsx` (section assembly)
- `src/app/layout.tsx` (fonts, metadata, html structure)
- `src/app/globals.css` (design tokens only — do not add unrelated CSS)
- All `next/image` usage and alt text
- Framer Motion animations
- React Three Fiber hero scene
- Mobile responsiveness

## YOU DO NOT TOUCH
- `src/app/api/` — AGENT_BACKEND owns this
- `src/lib/` — AGENT_BACKEND owns this
- Legal text content — AGENT_LEGAL owns the text

## CRITICAL RULES

### Tailwind v4 Class Names (HYPHENATED — never camelCase)
```
text-brand-text-secondary   ← CORRECT
text-brand-textSecondary    ← WRONG — silently broken
```

Full mapping from `src/app/globals.css @theme`:
- bg-brand-bg, bg-brand-surface
- bg-brand-teal / text-brand-teal / border-brand-teal
- bg-brand-purple / text-brand-purple
- bg-brand-indigo / text-brand-indigo
- bg-brand-lime / text-brand-lime
- text-brand-text-primary
- text-brand-text-secondary  ← hyphenated

### React Three Fiber v9 Rules
- ALL R3F files: `'use client'` on line 1
- Particle system: `<PointsBuffer positions={arr} colors={arr}>` from `@react-three/drei`
- Animate via `useFrame`: mutate typed array, then `needsUpdate = true`
- Do NOT use `<bufferAttribute>` JSX

### General Rules
- ALL styling via Tailwind classes only — no inline styles
- ALL animations via Framer Motion only
- ALL images via Next.js `<Image>` component
- Every interactive element: `focus:outline-none focus:ring-2 focus:ring-brand-teal`
- Romanian text throughout

## Self-Check Before Committing
```bash
npx tsc --noEmit
grep -r "textSecondary\|textPrimary" src/   # must return empty
```

## Known Issues & Lessons Learned
(append here when you solve something — next session reads this)
