'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function DespreNoi() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="despre-noi" ref={ref} className="py-24 px-4 bg-brand-bg">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
            Despre Vibe Print
          </h2>

          <p className="text-brand-text-secondary text-lg leading-relaxed mb-6">
            Suntem o echipă pasionată de artă și tehnologie, cu baza în județul Argeș
            și activitate în București și Ilfov. Credem că fiecare spațiu merită să
            spună o poveste — și că arta nu ar trebui să fie rezervată galeriilor.
          </p>

          <p className="text-brand-text-secondary text-lg leading-relaxed mb-8">
            Vibe Print este o{' '}
            <strong className="text-white">întreprindere socială</strong>{' '}
            înregistrată conform{' '}
            <strong className="text-white">Legii 219/2015</strong>.
            Misiunea noastră nu se oprește la pereți frumoși — prin fiecare proiect
            creăm oportunități de muncă pentru persoane aflate în situații vulnerabile
            și contribuim activ la incluziunea socială.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="inline-flex items-center gap-3 bg-brand-teal/10 border border-brand-teal/30 rounded-full px-6 py-3">
              <span className="text-brand-teal text-xl">✦</span>
              <span className="text-brand-teal font-semibold">
                Artă cu impact social
              </span>
            </div>
            <div className="inline-flex items-center gap-3 bg-brand-purple/10 border border-brand-purple/30 rounded-full px-6 py-3">
              <span className="text-brand-purple text-xl">🏛</span>
              <span className="text-brand-text-secondary font-medium text-sm">
                Întreprindere Socială · Legea 219/2015
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
