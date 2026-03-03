'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ThreeDCarousel } from './ui/3d-carousel'

const galleryItems = [
  { src: '/gallery/brand-vision.svg', label: 'Brand Vision' },
  { src: '/gallery/design-interior.svg', label: 'Design Interior' },
  { src: '/gallery/design-personalizat.svg', label: 'Design Personalizat' },
  { src: '/gallery/brand.svg', label: 'Brand Identity' },
  { src: '/gallery/pub.svg', label: 'Publicitate' },
  { src: '/gallery/transformare-urbana.svg', label: 'Transformare Urbană' },
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
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Lucrările noastre
          </h2>
          <p className="text-brand-text-secondary text-lg">
            Trage să explorezi — fiecare perete are o poveste.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <ThreeDCarousel items={galleryItems} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9 }}
          className="text-center text-brand-text-secondary text-sm mt-6"
        >
          📸 Galerie completă disponibilă în curând
        </motion.p>
      </div>
    </section>
  )
}
