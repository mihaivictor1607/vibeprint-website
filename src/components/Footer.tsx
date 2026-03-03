export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-brand-bg border-t border-white/10 pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

          {/* Column 1 — Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.svg" alt="InkSpired VibePrint logo" className="h-10 w-auto flex-shrink-0" />
              <span className="text-white font-bold text-lg">InkSpired VibePrint</span>
            </div>
            <p className="text-brand-text-secondary text-sm leading-relaxed">
              Imprimare digitală UV direct pe perete, pe orice suprafață.
              Fără tapete. Fără panouri. Artă pură, fixată cu UV.
            </p>
            <p className="text-brand-text-secondary text-sm mt-3">
              📍 Servim București &amp; Ilfov
            </p>
          </div>

          {/* Column 2 — Contact */}
          <div>
            <h4 className="text-sm uppercase tracking-wider text-brand-text-secondary font-semibold mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="tel:+40700000000"
                  className="text-brand-text-secondary hover:text-brand-teal transition-colors"
                >
                  📞 +40 700 000 000
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@vibeprint.ro"
                  className="text-brand-text-secondary hover:text-brand-teal transition-colors"
                >
                  ✉️ contact@vibeprint.ro
                </a>
              </li>
              <li className="text-brand-text-secondary">
                🕐 Lun–Vin: 09:00–18:00
              </li>
            </ul>
          </div>

          {/* Column 3 — Legal */}
          <div>
            <h4 className="text-sm uppercase tracking-wider text-brand-text-secondary font-semibold mb-4">
              Legal
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="/politica-confidentialitate"
                  className="text-brand-text-secondary hover:text-brand-teal transition-colors"
                >
                  Politică de Confidențialitate
                </a>
              </li>
              <li>
                <a
                  href="/termeni-si-conditii"
                  className="text-brand-text-secondary hover:text-brand-teal transition-colors"
                >
                  Termeni și Condiții
                </a>
              </li>
              <li>
                <a
                  href="https://anpc.ro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-text-secondary hover:text-brand-teal transition-colors"
                >
                  ANPC
                </a>
              </li>
              <li>
                <a
                  href="https://ec.europa.eu/consumers/odr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-text-secondary hover:text-brand-teal transition-colors"
                >
                  Soluționare Online Litigii (SOL)
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-brand-text-secondary">
          <p>
            © {year} <span className="text-white font-medium">Inkspire Printing Hub</span> · CUI: [TBD] · Județul Argeș, România
          </p>
          <p className="text-brand-teal font-medium">
            Întreprindere Socială · Legea 219/2015
          </p>
        </div>
      </div>
    </footer>
  )
}
