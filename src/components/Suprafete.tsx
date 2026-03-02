'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const surfaces = [
  { icon: '🏠', label: 'Tencuială', note: 'Interior & exterior' },
  { icon: '🧱', label: 'Cărămidă', note: 'Aparentă sau tencuită' },
  { icon: '⬜', label: 'Rigips', note: 'Glet fin recomandat' },
  { icon: '🪨', label: 'Beton', note: 'Aparent sau șlefuit' },
  { icon: '🪵', label: 'Lemn / MDF', note: 'Lacuit sau brut' },
  { icon: '🪟', label: 'Sticlă', note: 'Curată și degresată' },
  { icon: '🔲', label: 'Faianță', note: 'Curată, fără ceară' },
  { icon: '🌿', label: 'Exterior', note: 'Sezon apr–oct' },
]

export default function Suprafete() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="suprafete"
      ref={ref}
      className="py-24 px-4 bg-gradient-to-b from-brand-bg to-brand-surface"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Pe ce suprafețe imprimăm?
          </h2>
          <p className="text-brand-text-secondary text-lg">
            Dacă e o suprafață, probabil o putem imprima.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {surfaces.map((surface, i) => (
            <motion.div
              key={surface.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:border-brand-teal/50 hover:bg-brand-teal/5 transition-all duration-300"
            >
              <div className="text-3xl mb-3">{surface.icon}</div>
              <p className="text-white font-semibold text-sm mb-1">{surface.label}</p>
              <p className="text-brand-text-secondary text-xs">{surface.note}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
