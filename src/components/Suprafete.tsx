'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const specs = [
  {
    icon: '📐',
    value: 'până la 4 m',
    label: 'Înălțime maximă',
    note: 'Orice perete, oricât de înalt',
  },
  {
    icon: '↔️',
    value: 'Nelimitată',
    label: 'Lungime',
    note: 'Printuri continue, fără îmbinări',
  },
  {
    icon: '⏳',
    value: '7–10 ani',
    label: 'Durabilitate interior',
    note: '3–6 ani exterior, variabil după vreme',
  },
  {
    icon: '🎨',
    value: 'Fotografică',
    label: 'Rezoluție',
    note: 'Culori vii, detalii fine, UV-fixat',
  },
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
            Tehnologia noastră
          </h2>
          <p className="text-brand-text-secondary text-lg">
            Echipament industrial. Rezultate de galerie.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {specs.map((spec, i) => (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-brand-teal/50 hover:bg-brand-teal/5 transition-all duration-300"
            >
              <div className="text-3xl mb-4">{spec.icon}</div>
              <p className="text-brand-teal text-4xl font-extrabold mb-2 leading-none">
                {spec.value}
              </p>
              <p className="text-white font-semibold text-lg mb-1">{spec.label}</p>
              <p className="text-brand-text-secondary text-sm">{spec.note}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
