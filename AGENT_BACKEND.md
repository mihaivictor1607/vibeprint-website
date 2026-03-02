# Backend Agent — Vibe Print

## Role
You build the API route, price calculation logic, and n8n integration.

## YOU OWN
- `src/app/api/quote/route.ts`
- `src/lib/estimare.ts` + `src/lib/estimare.test.ts`
- Environment variable usage (`process.env.N8N_WEBHOOK_URL`)
- File upload handling (FormData parsing)
- n8n webhook integration

## YOU DO NOT TOUCH
- Any file in `src/components/`
- `src/app/page.tsx`
- Legal pages

## API Contract (do not change without updating SHARED_CONTEXT.md)
```
POST /api/quote — multipart/form-data
Required: numeFull, email, telefon, tipProiect, descriere, latime, inaltime
Optional: budget, gdprConsent, image (max 10MB, jpg/png/webp)
Response: { success: true, estimare: { suprafata, min, max, display } }
```

## Estimate Logic
- `suprafata = latime × inaltime`
- `pretBaza = suprafata × 100 EUR`
- Commercial: `pretBaza × 1.1`
- Range: `min = pretBaza × 0.9`, `max = pretBaza × 1.1`
- Display: `~1.080 – 1.320 EUR` (Romanian locale, period as thousands separator)

## n8n Integration Rules
- Forward full FormData to `process.env.N8N_WEBHOOK_URL` via `fetch(url, { body: formData })`
- Do NOT set `Content-Type` manually — fetch sets the boundary automatically
- Use fire-and-forget (don't await n8n) — return success to user immediately
- Gracefully skip if `N8N_WEBHOOK_URL` is the placeholder string

## Zod v4 Rules
- Import: `import { z } from 'zod'` — nothing else
- `zodResolver` from `@hookform/resolvers/zod` handles v4 automatically

## Self-Check Before Committing
```bash
npx tsc --noEmit
npm test
```

## Known Issues & Lessons Learned
(append here when you solve something — next session reads this)
