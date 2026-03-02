'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Trimiți cererea',
    description: 'Completezi formularul cu ideea ta și dimensiunile peretelui. Primești o estimare imediată.',
    color: 'text-brand-teal',
    border: 'border-brand-teal/40',
  },
  {
    number: '02',
    title: 'Consultare gratuită',
    description: 'Te contactăm în max. 24h pentru a discuta detaliile, suprafața și design-ul final.',
    color: 'text-brand-purple',
    border: 'border-brand-purple/40',
  },
  {
    number: '03',
    title: 'Imprimare',
    description: 'Venim la tine cu echipamentul. Imprimăm direct pe perete în câteva ore. Fără praf, fără mizerie.',
    color: 'text-brand-indigo',
    border: 'border-brand-indigo/40',
  },
  {
    number: '04',
    title: 'Gata!',
    description: 'Cerneala UV se usucă instant. Peretele tău este transformat — te bucuri imediat.',
    color: 'text-brand-lime',
    border: 'border-brand-lime/40',
  },
]

export default function CumFunctioneaza() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="cum-functioneaza" ref={ref} className="py-24 px-4 bg-brand-bg">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Cum funcționează?
          </h2>
          <p className="text-brand-text-secondary text-lg">
            Simplu, rapid și fără bătăi de cap.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`border ${step.border} bg-white/5 rounded-2xl p-6`}
            >
              <span className={`text-5xl font-extrabold ${step.color} opacity-60 block mb-3`}>
                {step.number}
              </span>
              <h3 className="text-white font-bold text-lg mb-2">{step.title}</h3>
              <p className="text-brand-text-secondary text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
