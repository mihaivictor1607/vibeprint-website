'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

// ssr: false — canvas + CDN import must run client-side only
const TubesBackground = dynamic(() => import('./ui/neon-flow'), { ssr: false })

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.3 + i * 0.2, duration: 0.8, ease: 'easeOut' as const },
  }),
}

export default function Hero3D() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-bg">
      {/* NeonFlow animation — fills the background */}
      <div className="absolute inset-0">
        <TubesBackground className="w-full h-full" />
      </div>

      {/* Gradient overlay: fades animation into page */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-bg pointer-events-none" />

      {/* Hero text content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.h1
          custom={0}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white leading-tight mb-4"
        >
          Transformă orice perete
          <br />
          <span className="text-brand-teal">într-o operă de artă.</span>
        </motion.h1>

        <motion.div
          custom={1}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="flex justify-center"
        >
          <a
            href="#formular"
            className="bg-brand-teal text-brand-bg font-bold px-8 py-4 rounded-full text-lg hover:bg-brand-teal/90 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2 focus:ring-offset-brand-bg"
          >
            Cere o ofertă gratuită
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-brand-text-secondary"
        aria-hidden="true"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 10l5 5 5-5" />
        </svg>
      </motion.div>
    </section>
  )
}
