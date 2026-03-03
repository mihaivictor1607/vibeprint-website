'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const COOKIE_KEY = 'vibeprint_cookie_consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(COOKIE_KEY)
      if (!stored) setVisible(true)
    } catch {
      setVisible(true)
    }
  }, [])

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, 'accepted')
    setVisible(false)
  }

  const reject = () => {
    localStorage.setItem(COOKIE_KEY, 'rejected')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-modal={false}
          aria-label="Consimțământ cookie-uri"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50"
        >
          <div className="bg-brand-bg border border-white/20 rounded-2xl p-6 shadow-2xl">
            <p className="text-white font-semibold mb-1">Folosim cookie-uri</p>
            <p className="text-brand-text-secondary text-sm mb-4 leading-relaxed">
              Folosim cookie-uri esențiale pentru funcționarea site-ului. Fără date de tracking.{' '}
              <a href="/politica-confidentialitate" className="text-brand-teal underline">
                Politică de Confidențialitate
              </a>
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={accept}
                className="flex-1 bg-brand-teal text-brand-bg font-bold py-2 rounded-full text-sm hover:bg-brand-teal/90 transition-colors"
              >
                Accept
              </button>
              <button
                type="button"
                onClick={reject}
                className="flex-1 border border-white/20 text-white font-semibold py-2 rounded-full text-sm hover:border-white/40 transition-colors"
              >
                Refuz
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
