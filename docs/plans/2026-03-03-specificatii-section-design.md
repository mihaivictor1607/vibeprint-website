# Specificații Section Redesign — Design Doc

**Date:** 2026-03-03
**Status:** Approved

## Scope

Replace the 8-card surface grid in `Suprafete.tsx` with a 4-card printer specs section focused on technical capabilities. Surface types are already covered in the "Orice Suprafață" card in the CeFacem section — no redundancy needed here.

---

## Content

**Section title:** `Tehnologia noastră`
**Subtitle:** `Echipament industrial. Rezultate de galerie.`

### 4 Stat Cards (2×2 grid)

| Icon | Stat value | Label | Note |
|------|-----------|-------|------|
| 📐 | `până la 4 m` | `Înălțime maximă` | `Orice perete, oricât de înalt` |
| ↔️ | `Nelimitată` | `Lungime` | `Printuri continue, fără îmbinări` |
| ⏳ | `7–10 ani` | `Durabilitate interior` | `3–6 ani exterior, variabil după vreme` |
| 🎨 | `Fotografică` | `Rezoluție` | `Culori vii, detalii fine, UV-fixat` |

---

## Visual Style

- Same dark card style as rest of site: `bg-white/5 border border-white/10 rounded-2xl p-8`
- Stat value: `text-brand-teal text-4xl font-extrabold` — large, teal, bold
- Label: `text-white font-semibold text-lg`
- Note: `text-brand-text-secondary text-sm`
- Icon: `text-3xl mb-3` — above the stat
- Cards animate in with stagger on scroll (same pattern as CeFacem cards)
- Section background: `bg-gradient-to-b from-brand-bg to-brand-surface` (unchanged)

---

## Files Modified

- `src/components/Suprafete.tsx` — full rewrite
  - Remove 8-surface grid
  - Add 4-spec stat cards
  - Update title/subtitle
  - Keep `id="suprafete"` (not linked from navbar, safe to keep for potential anchor use)
