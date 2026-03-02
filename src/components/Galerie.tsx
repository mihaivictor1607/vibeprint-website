'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// Color-block placeholders — replace src with real image paths when available
const placeholderItems = [
  { bg: 'bg-brand-purple/40', label: 'Living room abstract mural', tall: false },
  { bg: 'bg-brand-teal/30', label: 'Restaurant branded wall', tall: true },
  { bg: 'bg-brand-indigo/40', label: 'Corporate office print', tall: false },
  { bg: 'bg-brand-lime/20', label: 'Kids room mural', tall: true },
  { bg: 'bg-brand-purple/30', label: 'Hotel lobby wall', tall: false },
  { bg: 'bg-brand-teal/20', label: 'Exterior building print', tall: false },
]

export default function Galerie() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="galerie" ref={ref} className="py-24 px-4 bg-brand-bg/80">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Lucrările noastre
          </h2>
          <p className="text-brand-text-secondary text-lg">
            Fiecare perete are o poveste. Iată câteva dintre ale noastre.
          </p>
        </motion.div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {placeholderItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`relative overflow-hidden rounded-xl break-inside-avoid group cursor-pointer ${item.bg} ${item.tall ? 'h-72' : 'h-48'} border border-white/10 hover:border-brand-teal/50 transition-all duration-300`}
            >
              <div className="absolute inset-0 flex items-end p-4">
                <span className="text-white/60 text-xs font-medium group-hover:text-white transition-colors">
                  {item.label}
                </span>
              </div>
              <div className="absolute inset-0 bg-brand-teal/0 group-hover:bg-brand-teal/10 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center text-brand-text-secondary text-sm mt-8"
        >
          📸 Galerie completă disponibilă în curând
        </motion.p>
      </div>
    </section>
  )
}
