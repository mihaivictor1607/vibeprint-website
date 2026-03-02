'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const features = [
  {
    icon: '🎨',
    title: 'Orice Design',
    description: 'De la ilustrații fine la fotografii hiper-realiste — dacă există în format digital, îl imprimăm pe perete. Rezoluție fotografică, culori vii.',
    accent: 'text-brand-teal',
  },
  {
    icon: '🧱',
    title: 'Orice Suprafață',
    description: 'Tencuială, rigips, beton, cărămidă, lemn, MDF, sticlă, faianță. Interior sau exterior. Fără panouri, fără tapete, fără lipici.',
    accent: 'text-brand-purple',
  },
  {
    icon: '⚡',
    title: 'Rapid & Durabil',
    description: 'Imprimare direct pe perete, la fața locului. Cerneală UV-curabilă rezistentă la umiditate și lumină solară. Gata în câteva ore.',
    accent: 'text-brand-indigo',
  },
]

export default function CeFacem() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="ce-facem" ref={ref} className="py-24 px-4 bg-brand-bg">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Ce facem, de fapt?
          </h2>
          <p className="text-brand-text-secondary text-lg max-w-2xl mx-auto">
            Imprimăm direct pe peretele tău. Fără tapete. Fără panouri.
            Fără mizerie. Doar artă pură, fixată cu UV.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-brand-teal/50 transition-colors duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className={`font-bold text-xl mb-3 ${feature.accent}`}>{feature.title}</h3>
              <p className="text-brand-text-secondary leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
