import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import CookieBanner from '@/components/CookieBanner'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'Vibe Print — Imprimare Digitală pe Perete | București & Ilfov',
  description: 'Transformă orice perete într-o operă de artă. Imprimare digitală UV direct pe perete, pe orice suprafață. Murală personalizată, de la ~100 EUR/m².',
  keywords: 'imprimare pe perete bucuresti, murala personalizata, print decorativ perete, imprimare digitala perete',
  openGraph: {
    title: 'Vibe Print — Imprimare Digitală pe Perete',
    description: 'Transformă orice perete într-o operă de artă. București & Ilfov.',
    locale: 'ro_RO',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ro" className={plusJakarta.variable}>
      <body className="antialiased">
        {children}
        <CookieBanner />
      </body>
    </html>
  )
}
