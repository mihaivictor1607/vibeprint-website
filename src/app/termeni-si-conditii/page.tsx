import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Termeni și Condiții — Vibe Print',
  robots: { index: false },
}

export default function TermeniSiConditii() {
  const lastUpdated = new Date('2026-03-03').toLocaleDateString('ro-RO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <main className="min-h-screen bg-brand-bg py-24 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <h1 className="text-4xl font-bold text-white mb-3">
          Termeni și Condiții
        </h1>
        <p className="text-brand-text-secondary text-sm mb-12">
          Ultima actualizare: {lastUpdated}
        </p>

        {/* Art. 1 */}
        <section className="mb-10 pt-10 border-t border-white/10">
          <h2 className="text-xl font-semibold text-white mb-3">
            Art. 1 — Definiții
          </h2>
          <ul className="list-none text-brand-text-secondary space-y-3 pl-2">
            <li>
              <strong className="text-white">&bdquo;Societatea&rdquo;</strong> —{' '}
              Inkspire Printing Hub, întreprindere socială înregistrată conform Legii
              219/2015, CUI: [CUI_TBD], sediu juridic în Județul Argeș, România.
            </li>
            <li>
              <strong className="text-white">&bdquo;Serviciul&rdquo;</strong> —
              imprimare digitală UV direct pe perete, executată la sediul sau locația
              indicată de client.
            </li>
            <li>
              <strong className="text-white">&bdquo;Clientul&rdquo;</strong> —
              persoana fizică sau juridică care solicită serviciile Societății prin
              intermediul site-ului, telefonului sau oricărui alt canal de comunicare.
            </li>
          </ul>
        </section>

        {/* Art. 2 */}
        <section className="mb-10 pt-10 border-t border-white/10">
          <h2 className="text-xl font-semibold text-white mb-3">
            Art. 2 — Obiectul contractului
          </h2>
          <p className="text-brand-text-secondary leading-relaxed">
            Societatea prestează servicii de imprimare digitală UV pe suprafețe verticale
            (pereți, panouri, separatoare etc.), la locația Clientului, pe baza comenzii
            confirmate de ambele părți. Detaliile tehnice, suprafața și termenele de
            execuție sunt stabilite de comun acord înainte de începerea lucrării.
          </p>
        </section>

        {/* Art. 3 */}
        <section className="mb-10 pt-10 border-t border-white/10">
          <h2 className="text-xl font-semibold text-white mb-3">
            Art. 3 — Estimarea prețului
          </h2>
          <ul className="list-disc list-inside text-brand-text-secondary space-y-2 pl-2">
            <li>
              Estimările de preț oferite online sau prin formularul de pe site sunt{' '}
              <strong className="text-white">orientative</strong>, pornind de la{' '}
              <strong className="text-white">~100 EUR/m²</strong>.
            </li>
            <li>
              Prețul final se stabilește după inspectarea locației de către un reprezentant
              al Societății și luarea în considerare a condițiilor reale ale suprafeței.
            </li>
            <li>
              Estimarea online{' '}
              <strong className="text-white">nu constituie o ofertă fermă</strong> și nu
              generează obligații contractuale pentru niciuna dintre părți.
            </li>
          </ul>
        </section>

        {/* Art. 4 */}
        <section className="mb-10 pt-10 border-t border-white/10">
          <h2 className="text-xl font-semibold text-white mb-3">
            Art. 4 — Obligațiile Clientului
          </h2>
          <ul className="list-disc list-inside text-brand-text-secondary space-y-2 pl-2">
            <li>
              Să asigure accesul echipei Societății la locația unde urmează a fi executată
              lucrarea, la data și ora agreate.
            </li>
            <li>
              Suprafața pe care se execută imprimarea trebuie să fie{' '}
              <strong className="text-white">curată, uscată și fără umiditate excesivă</strong>{' '}
              sau defecte structurale majore.
            </li>
            <li>
              Să informeze Societatea în avans cu privire la orice restricții de acces
              (program de funcționare, autorizații speciale, condiții ale proprietarului
              sau ale asociației de locatari etc.).
            </li>
          </ul>
        </section>

        {/* Art. 5 */}
        <section className="mb-10 pt-10 border-t border-white/10">
          <h2 className="text-xl font-semibold text-white mb-3">
            Art. 5 — Obligațiile Societății
          </h2>
          <ul className="list-disc list-inside text-brand-text-secondary space-y-2 pl-2">
            <li>
              Prestarea Serviciului cu echipamente profesionale, menținute în stare de
              funcționare corespunzătoare.
            </li>
            <li>
              Respectarea termenelor de execuție agreate, cu notificarea prealabilă a
              Clientului în caz de întârziere justificată.
            </li>
            <li>
              Utilizarea de materiale UV-cured, rezistente la uzură și mediu, conform
              specificațiilor tehnice asumate la confirmarea comenzii.
            </li>
          </ul>
        </section>

        {/* Art. 6 */}
        <section className="mb-10 pt-10 border-t border-white/10">
          <h2 className="text-xl font-semibold text-white mb-3">
            Art. 6 — Plata
          </h2>
          <ul className="list-disc list-inside text-brand-text-secondary space-y-2 pl-2">
            <li>
              La confirmarea comenzii se achită un{' '}
              <strong className="text-white">avans</strong>, al cărui procent este stabilit
              contractual pentru fiecare proiect în parte.
            </li>
            <li>
              Restul prețului se achită la{' '}
              <strong className="text-white">finalizarea și recepția lucrării</strong>.
            </li>
            <li>
              Moneda de plată este{' '}
              <strong className="text-white">RON sau EUR</strong>, conform acordului
              stabilit la emiterea ofertei finale.
            </li>
          </ul>
        </section>

        {/* Art. 7 */}
        <section className="mb-10 pt-10 border-t border-white/10">
          <h2 className="text-xl font-semibold text-white mb-3">
            Art. 7 — Răspundere și limitare
          </h2>
          <ul className="list-disc list-inside text-brand-text-secondary space-y-2 pl-2">
            <li>
              Societatea{' '}
              <strong className="text-white">nu răspunde</strong> pentru deteriorări ale
              suprafeței preexistente sau ascunse (igrasie, fisuri latente, vopsea
              neaderată etc.), care nu au putut fi identificate la inspecția preliminară.
            </li>
            <li>
              Clientul are obligația de a inspecta lucrarea la finalizare și de a semnala
              orice neconformitate în scris, în termen de{' '}
              <strong className="text-white">24 de ore</strong> de la recepție. Reclamațiile
              ulterioare acestui termen nu vor fi luate în considerare dacă defectul nu
              este unul latent.
            </li>
          </ul>
        </section>

        {/* Art. 8 */}
        <section className="mb-10 pt-10 border-t border-white/10">
          <h2 className="text-xl font-semibold text-white mb-3">
            Art. 8 — Forță majoră
          </h2>
          <p className="text-brand-text-secondary leading-relaxed">
            Niciuna dintre părți nu va fi răspunzătoare pentru neexecutarea sau executarea
            defectuoasă a obligațiilor sale contractuale dacă aceasta este cauzată de un
            eveniment de forță majoră — adică orice eveniment imprevizibil, insurmontabil
            și independent de voința părții afectate (calamități naturale, acte ale
            autorităților, conflicte sociale etc.). Partea afectată va notifica cealaltă
            parte în cel mai scurt timp posibil și va lua toate măsurile rezonabile pentru
            a limita efectele evenimentului.
          </p>
        </section>

        {/* Art. 9 */}
        <section className="mb-10 pt-10 border-t border-white/10">
          <h2 className="text-xl font-semibold text-white mb-3">
            Art. 9 — Legea aplicabilă și soluționarea litigiilor
          </h2>
          <p className="text-brand-text-secondary leading-relaxed">
            Prezentul contract se supune{' '}
            <strong className="text-white">legislației române</strong>. Orice litigiu
            născut din sau în legătură cu acesta se va soluționa, în primă instanță, pe
            cale amiabilă. În cazul în care acordul amiabil nu este posibil, litigiul va
            fi deferit instanțelor judecătorești competente de la sediul Societății.
          </p>
          <p className="text-brand-text-secondary leading-relaxed mt-3">
            Soluționarea online a litigiilor (conform Reg. UE 524/2013):{' '}
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-teal hover:underline"
            >
              https://ec.europa.eu/consumers/odr
            </a>
            .
          </p>
        </section>

        {/* Art. 10 */}
        <section className="mb-10 pt-10 border-t border-white/10">
          <h2 className="text-xl font-semibold text-white mb-3">
            Art. 10 — Contact
          </h2>
          <p className="text-brand-text-secondary leading-relaxed">
            Pentru orice întrebări legate de prezentele Termeni și Condiții:
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
