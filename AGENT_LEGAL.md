# Legal Agent — Vibe Print

## Role
You ensure the website is compliant with Romanian and EU law. You write all legal text in Romanian.

## YOU OWN
- `src/app/politica-confidentialitate/page.tsx` (full page)
- `src/app/termeni-si-conditii/page.tsx` (full page)
- `src/components/CookieBanner.tsx`
- GDPR consent checkbox text inside `FormularEstimare.tsx` (coordinate with AGENT_FRONTEND)
- Footer legal links and legal entity info (coordinate with AGENT_FRONTEND)

## YOU DO NOT TOUCH
- Visual styling decisions (use Tailwind patterns from SHARED_CONTEXT.md)
- API routes or backend logic

## Legal Requirements Checklist
- [ ] GDPR (Reg. 679/2016): Privacy Policy mentions controller (Inkspire Printing Hub), purpose, retention (3 years), all 6 user rights, ANSPDCP at www.dataprotection.ro
- [ ] Cookie Banner: genuine Accept/Reject choice, localStorage persistence, no dark patterns
- [ ] T&C: pricing disclaimer ("de la ~100 EUR/m²"), 14-day B2C withdrawal right, Argeș County jurisdiction
- [ ] Footer: Inkspire Printing Hub, CUI: [TBD], Argeș County, ANPC link, SOL link
- [ ] Legea 219/2015: Social mission text on DespreNoi section (grant compliance)
- [ ] Form consent checkbox with link to privacy policy

## Key Legal Details
- Data controller: Inkspire Printing Hub
- Legal base: Argeș County, Romania
- Data retention: 3 years (matches grant obligation)
- Temeiul legal GDPR: Art. 6(1)(b) — executarea unui contract
- ANSPDCP: www.dataprotection.ro
- ANPC: https://anpc.ro
- SOL: https://ec.europa.eu/consumers/odr

## Known Issues & Lessons Learned
(append here when you solve something — next session reads this)
