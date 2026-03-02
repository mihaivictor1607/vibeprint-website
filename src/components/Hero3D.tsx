'use client'

import { Suspense, useState, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

// Dynamically import ParticleField to ensure no SSR issues
const ParticleField = dynamic(() => import('./hero/ParticleField'), { ssr: false })

function WallPlane() {
  return (
    <mesh position={[0, 0, -2]}>
      <planeGeometry args={[30, 18]} />
      <meshStandardMaterial color="#0D0A1A" roughness={0.9} />
    </mesh>
  )
}

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.3 + i * 0.2, duration: 0.8, ease: 'easeOut' as const },
  }),
}

export default function Hero3D() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMouse({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
    })
  }, [])

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-bg"
      onMouseMove={handleMouseMove}
    >
      {/* 3D Canvas — fills the background */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          dpr={[1, 1.5]}
          gl={{ antialias: false }}
        >
          <ambientLight intensity={0.4} />
          <Suspense fallback={null}>
            <WallPlane />
            <ParticleField
              count={typeof window !== 'undefined' && window.innerWidth < 768 ? 800 : 2000}
              mouseX={mouse.x}
              mouseY={mouse.y}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Gradient overlay: fades 3D scene into page */}
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

        <motion.p
          custom={1}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-brand-text-secondary text-lg md:text-xl mb-10 leading-relaxed"
        >
          Imprimare digitală UV direct pe perete, pe orice suprafață.
          <br className="hidden sm:block" />
          București &amp; Ilfov · de la{' '}
          <strong className="text-white">~100 EUR/m²</strong>
        </motion.p>

        <motion.div
          custom={2}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#formular"
            className="bg-brand-teal text-brand-bg font-bold px-8 py-4 rounded-full text-lg hover:bg-brand-teal/90 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2 focus:ring-offset-brand-bg"
          >
            Cere o ofertă gratuită
          </a>
          <a
            href="#galerie"
            className="border border-white/30 text-white font-semibold px-8 py-4 rounded-full text-lg hover:border-brand-teal hover:text-brand-teal transition-colors focus:outline-none focus:ring-2 focus:ring-white/30"
          >
            Vezi galeria
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
