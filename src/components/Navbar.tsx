'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Ce Facem', href: '#ce-facem' },
  { label: 'Galerie', href: '#galerie' },
  { label: 'Cum Funcționează', href: '#cum-functioneaza' },
  { label: 'Despre Noi', href: '#despre-noi' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [navVisible, setNavVisible] = useState(true)

  useEffect(() => {
    let lastScrollY = window.scrollY

    const onScroll = () => {
      const currentY = window.scrollY

      if (currentY < 10) {
        // At top — full centered navbar
        setScrolled(false)
        setNavVisible(true)
      } else if (currentY > lastScrollY) {
        // Scrolling down — hide everything
        setNavVisible(false)
        setScrolled(true)
      } else {
        // Scrolling up — show minimal (logo left, CTA right)
        setNavVisible(true)
        setScrolled(true)
      }

      lastScrollY = currentY
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      variants={{
        hidden: { y: '-100%' },
        visible: { y: 0 },
      }}
      initial="hidden"
      animate={navVisible ? 'visible' : 'hidden'}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`relative flex items-center gap-4 md:gap-10 h-24 md:h-28 ${scrolled ? 'justify-between' : 'justify-center'}`}>

          {/* Logo — layout-animates from center to left on scroll */}
          <motion.a layout="position" href="#" className="flex items-center group flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.svg"
              alt="InkSpired VibePrint logo"
              className="h-24 md:h-28 w-auto flex-shrink-0"
            />
          </motion.a>

          {/* Desktop nav links — only visible at top */}
          <AnimatePresence>
            {!scrolled && (
              <motion.div
                key="nav-links"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="hidden md:flex items-center gap-6"
              >
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-white hover:text-brand-teal transition-colors duration-200 text-lg font-bold"
                  >
                    {link.label}
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* CTA — layout-animates from center to right on scroll */}
          <motion.a
            layout="position"
            href="#formular"
            className="hidden md:inline-flex bg-brand-teal text-brand-bg font-bold px-5 py-2.5 rounded-full text-base hover:bg-brand-teal/90 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2 focus:ring-offset-brand-bg flex-shrink-0"
          >
            Cere ofertă
          </motion.a>

          {/* Mobile hamburger — always absolute right */}
          <button
            className="md:hidden absolute right-0 text-white p-2 rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-teal"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Închide meniu' : 'Deschide meniu'}
            type="button"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-brand-bg/98 backdrop-blur-md border-t border-white/10"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 text-white hover:text-brand-teal hover:bg-white/5 rounded-lg transition-colors font-bold text-lg"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#formular"
                onClick={() => setMenuOpen(false)}
                className="block mt-3 text-center bg-brand-teal text-brand-bg font-bold px-5 py-3 rounded-full hover:bg-brand-teal/90 transition-colors"
              >
                Cere ofertă gratuită
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
