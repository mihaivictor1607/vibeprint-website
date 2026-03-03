'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Ce Facem', href: '#ce-facem' },
  { label: 'Galerie', href: '#galerie' },
  { label: 'Cum Funcționează', href: '#cum-functioneaza' },
  { label: 'Despre Noi', href: '#despre-noi' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* relative so the mobile hamburger can be absolute-right */}
        <div className="relative flex items-center justify-center h-24 md:h-28">

          {/* Centered group: Logo + Nav links + CTA */}
          <div className="flex items-center gap-4 md:gap-8">
            <a href="#" className="flex items-center group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.svg"
                alt="InkSpired VibePrint logo"
                className="h-20 md:h-24 w-auto flex-shrink-0"
              />
            </a>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-white hover:text-brand-teal transition-colors duration-200 text-lg font-bold"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <a
              href="#formular"
              className="hidden md:inline-flex bg-brand-teal text-brand-bg font-bold px-5 py-2.5 rounded-full text-base hover:bg-brand-teal/90 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2 focus:ring-offset-brand-bg"
            >
              Cere ofertă
            </a>
          </div>

          {/* Mobile hamburger — absolute right so it doesn't push center group */}
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
