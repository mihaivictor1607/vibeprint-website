'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface Spec {
  title: string
  stat: string
  footnote?: string
}

const specs: Spec[] = [
  {
    title: 'Înălțime maximă',
    stat: 'până la 4 m',
  },
  {
    title: 'Lungime print',
    stat: 'nelimitată',
  },
  {
    title: 'Design interior',
    stat: 'durabilitate 7–10 ani',
  },
  {
    title: 'Design exterior',
    stat: 'durabilitate 3–6 ani',
    footnote: '*În funcție de condițiile meteo',
  },
]

export default function Suprafete() {
  const ref = useRef<HTMLElement>(null)
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
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
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
              key={spec.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-brand-teal/50 hover:bg-brand-teal/5 transition-all duration-300 text-center"
            >
              <p className="text-white text-3xl font-extrabold mb-2">
                {spec.title}
              </p>
              <p className="text-brand-teal text-4xl font-extrabold leading-snug mb-2">
                {spec.stat}
              </p>
              {spec.footnote && (
                <p className="text-brand-text-secondary text-xs mt-3 text-left">
                  {spec.footnote}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
