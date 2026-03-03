import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Politică de Confidențialitate — InkSpired VibePrint',
  robots: { index: false },
}

export default function PoliticaConfidentialitate() {
  const lastUpdated = new Date().toLocaleDateString('ro-RO')

  return (
    <main className="min-h-screen bg-brand-bg py-24 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <h1 className="text-4xl font-bold text-white mb-3">
          Politică de Confidențialitate
        </h1>
        <p className="text-brand-text-secondary text-sm mb-12">
          Ultima actualizare: {lastUpdated}
        </p>

        {/* Section 1 */}
        <section className="mb-10 pt-10 border-t border-white/10">
          <h2 className="text-xl font-semibold text-white mb-3">
            1. Cine suntem
          </h2>
          <p className="text-brand-text-secondary leading-relaxed">
            Operator de date cu caracter personal:{' '}
            <strong className="text-white">Inkspire Printing Hub</strong>, sediu juridic în{' '}
            Județul Argeș, România, CUI: [CUI_TBD].
          </p>
          <p className="text-brand-text-secondary leading-relaxed mt-3">
            Pentru orice întrebări legate de prelucrarea datelor dumneavoastră, ne puteți
            contacta la adresa de email:{' '}
            <a
              href="mailto:contact@vibeprint.ro"
              className="text-brand-teal hover:underline"
            >
              contact@vibeprint.ro
            </a>
            .
          </p>
        </section>

        {/* Section 2 */}
        <section className="mb-10 pt-10 border-t border-white/10">
          <h2 className="text-xl font-semibold text-white mb-3">
            2. Ce date colectăm
          </h2>
          <p className="text-brand-text-secondary leading-relaxed mb-3">
            Prin intermediul formularului de estimare de pe site, colectăm următoarele
            date cu caracter personal:
          </p>
          <ul className="list-disc list-inside text-brand-text-secondary space-y-2 pl-2">
            <li>Nume și prenume</li>
            <li>Adresă de email</li>
            <li>Număr de telefon</li>
            <li>
              Imagini / fotografii încărcate opțional prin formularul de estimare
              (pentru a vă putea oferi o previzualizare sau o estimare personalizată)
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="mb-10 pt-10 border-t border-white/10">
          <h2 className="text-xl font-semibold text-white mb-3">
            3. De ce colectăm aceste date
          </h2>
          <p className="text-brand-text-secondary leading-relaxed mb-3">
            Datele colectate sunt utilizate exclusiv în următoarele scopuri:
          </p>
          <ul className="list-disc list-inside text-brand-text-secondary space-y-2 pl-2">
            <li>
              <strong className="text-white">Furnizarea unei estimări de preț</strong> —
              temei juridic GDPR: executarea unui contract sau luarea de măsuri la
              cererea persoanei vizate înainte de încheierea unui contract (Art. 6(1)(b))
              și/sau interes legitim (Art. 6(1)(f)).
            </li>
            <li>
              <strong className="text-white">Contactarea dumneavoastră</strong> în
              legătură cu proiectul pentru care ați solicitat o estimare, pentru a
              discuta detalii și a planifica lucrarea.
            </li>
          </ul>
          <p className="text-brand-text-secondary leading-relaxed mt-3">
            Nu utilizăm datele dumneavoastră în scopuri de marketing direct fără
            consimțământul prealabil explicit.
          </p>
        </section>

        {/* Section 4 */}
        <section className="mb-10 pt-10 border-t border-white/10">
          <h2 className="text-xl font-semibold text-white mb-3">
            4. Cât timp păstrăm datele
          </h2>
          <p className="text-brand-text-secondary leading-relaxed">
            Datele dumneavoastră cu caracter personal sunt păstrate pentru o perioadă de
            maximum{' '}
            <strong className="text-white">12 luni</strong> de la ultimul contact, după
            care sunt șterse în mod securizat. Dacă solicitați ștergerea datelor înainte
            de expirarea acestei perioade, vom da curs cererii dumneavoastră în termen
            de 30 de zile.
          </p>
        </section>

        {/* Section 5 */}
        <section className="mb-10 pt-10 border-t border-white/10">
          <h2 className="text-xl font-semibold text-white mb-3">
            5. Drepturile tale
          </h2>
          <p className="text-brand-text-secondary leading-relaxed mb-3">
            În conformitate cu Regulamentul General privind Protecția Datelor (GDPR —
            Regulamentul UE 2016/679), aveți următoarele drepturi:
          </p>
          <ul className="list-disc list-inside text-brand-text-secondary space-y-2 pl-2">
            <li>
              <strong className="text-white">Drept de acces</strong> — puteți solicita
              o copie a datelor pe care le deținem despre dumneavoastră.
            </li>
            <li>
              <strong className="text-white">Drept de rectificare</strong> — puteți
              solicita corectarea datelor inexacte sau incomplete.
            </li>
            <li>
              <strong className="text-white">
                Drept de ștergere (&ldquo;dreptul de a fi uitat&rdquo;)
              </strong>{' '}
              — puteți solicita ștergerea datelor dumneavoastră, cu excepția cazurilor
              în care prelucrarea este impusă de obligații legale.
            </li>
            <li>
              <strong className="text-white">
                Drept de restricționare a prelucrării
              </strong>{' '}
              — puteți solicita limitarea modului în care utilizăm datele dumneavoastră.
            </li>
            <li>
              <strong className="text-white">Drept la portabilitatea datelor</strong> —
              puteți solicita transmiterea datelor dumneavoastră către un alt operator,
              într-un format structurat și lizibil automat.
            </li>
          </ul>
          <p className="text-brand-text-secondary leading-relaxed mt-4">
            Pentru a vă exercita oricare dintre aceste drepturi, ne puteți contacta la:{' '}
            <a
              href="mailto:contact@vibeprint.ro"
              className="text-brand-teal hover:underline"
            >
              contact@vibeprint.ro
            </a>
            .
          </p>
          <p className="text-brand-text-secondary leading-relaxed mt-3">
            De asemenea, aveți dreptul de a depune o plângere la autoritatea de
            supraveghere din România:{' '}
            <strong className="text-white">
              Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter
              Personal (ANSPDCP)
            </strong>{' '}
            —{' '}
            <a
              href="https://www.dataprotection.ro"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-teal hover:underline"
            >
              www.dataprotection.ro
            </a>
            .
          </p>
        </section>

        {/* Section 6 */}
        <section className="mb-10 pt-10 border-t border-white/10">
          <h2 className="text-xl font-semibold text-white mb-3">
            6. Cookie-uri
          </h2>
          <p className="text-brand-text-secondary leading-relaxed">
            Acest site utilizează exclusiv{' '}
            <strong className="text-white">cookie-uri esențiale</strong> necesare
            funcționării corecte a site-ului. Alegerea dumneavoastră privind consimțământul
            pentru cookie-uri este stocată local în browser (
            <code className="text-brand-teal text-sm">localStorage</code>) și nu este
            transmisă către servere externe.
          </p>
          <p className="text-brand-text-secondary leading-relaxed mt-3">
            Nu folosim cookie-uri de tracking, analiză sau publicitate terță parte.
          </p>
        </section>

        {/* Section 7 */}
        <section className="mb-10 pt-10 border-t border-white/10">
          <h2 className="text-xl font-semibold text-white mb-3">
            7. Securitate
          </h2>
          <p className="text-brand-text-secondary leading-relaxed">
            Toate datele transmise între browser-ul dumneavoastră și serverele noastre
            sunt protejate prin criptare{' '}
            <strong className="text-white">HTTPS</strong>. Fotografiile încărcate prin
            formularul de estimare nu sunt partajate cu terțe părți fără
            consimțământul dumneavoastră explicit și sunt accesate exclusiv de echipa
            InkSpired VibePrint în scopul pregătirii ofertei.
          </p>
        </section>

        {/* Section 8 */}
        <section className="mb-10 pt-10 border-t border-white/10">
          <h2 className="text-xl font-semibold text-white mb-3">
            8. Contact
          </h2>
          <p className="text-brand-text-secondary leading-relaxed">
            Pentru orice întrebări sau solicitări legate de această politică de
            confidențialitate:
          </p>
          <ul className="list-none text-brand-text-secondary space-y-2 mt-3 pl-2">
            <li>
              <span className="text-white font-medium">Operator:</span>{' '}
              Inkspire Printing Hub
            </li>
            <li>
              <span className="text-white font-medium">Email:</span>{' '}
              <a
                href="mailto:contact@vibeprint.ro"
                className="text-brand-teal hover:underline"
              >
                contact@vibeprint.ro
              </a>
            </li>
          </ul>
        </section>

        {/* Back link */}
        <div className="pt-10 border-t border-white/10">
          <Link href="/" className="text-brand-teal hover:underline text-sm">
            &larr; Înapoi la pagina principală
          </Link>
        </div>

      </div>
    </main>
  )
}
