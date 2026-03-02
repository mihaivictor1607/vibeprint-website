# Vibe Print — Shared Agent Context

> Last updated: 2026-03-02

## Build Status
- [x] Task 1: Next.js 16.1.6 scaffold
- [x] Task 2: All dependencies installed
- [x] Task 3: Vitest configured
- [x] Task 4: Environment variables (.env.example, .env.local)
- [x] Task 5: Tailwind v4 brand colors + Plus Jakarta Sans font
- [ ] Task 6–22: Pending

## CRITICAL: Version Facts (read before every task)

### Tailwind v4 (NOT v3)
- No `tailwind.config.ts` — do NOT create one
- Brand tokens defined in `src/app/globals.css` inside `@theme {}`
- Class name mapping (HYPHENATED, never camelCase):
  - `--color-brand-bg`             → `bg-brand-bg`
  - `--color-brand-surface`        → `bg-brand-surface`
  - `--color-brand-teal`           → `bg-brand-teal` / `text-brand-teal`
  - `--color-brand-purple`         → `bg-brand-purple` / `text-brand-purple`
  - `--color-brand-indigo`         → `bg-brand-indigo` / `text-brand-indigo`
  - `--color-brand-lime`           → `bg-brand-lime` / `text-brand-lime`
  - `--color-brand-text-primary`   → `text-brand-text-primary`
  - `--color-brand-text-secondary` → `text-brand-text-secondary` ← HYPHENATED
- Opacity modifiers work: `bg-brand-teal/90`, `bg-brand-bg/95`

### React Three Fiber v9 + drei v10 (React 19)
- Use `<PointsBuffer positions={Float32Array} colors={Float32Array}>` from `@react-three/drei`
- Do NOT use `<bufferAttribute>` JSX or `<bufferGeometry>` — unreliable in React 19
- Animate via `useFrame`: mutate `geo.attributes.position.array[]`, then `pos.needsUpdate = true`
- Every file using R3F hooks (`useFrame`, `useThree`, `Canvas`) MUST have `'use client'` on line 1

### Zod v4
- Import: `import { z } from 'zod'` — nothing else
- `zodResolver` from `@hookform/resolvers/zod` handles v4 automatically

### Next.js 16 App Router
- API routes: `export async function POST(req: Request)` — NOT the old `(req, res)` pattern
- Server Components are default; add `'use client'` only when needed (hooks, events, browser APIs)

## API Contract
```
POST /api/quote
Content-Type: multipart/form-data

Required fields: numeFull, email, telefon, tipProiect, descriere, latime, inaltime
Optional fields: budget, gdprConsent, image (File)

Response 200: { success: true, estimare: { suprafata, min, max, display } }
Response 400: { success: false, error: string }
Response 500: { success: false, error: "Eroare internă. Te rugăm să încerci din nou." }
```

## Design Decisions (final — do not re-debate)
- Language: Romanian throughout
- Font: Plus Jakarta Sans (variable: `--font-plus-jakarta`)
- 3D Hero: "Living Wall" ink particle system, mouse-reactive
- Estimate: ~100 EUR/m², ±10% range, commercial +10% surcharge
- Form: react-hook-form + zod v4, multi-step, file upload in useState (not zod)
- Hosting: Vercel free tier + GitHub
- n8n: self-hosted, webhook URL in `N8N_WEBHOOK_URL` env var
