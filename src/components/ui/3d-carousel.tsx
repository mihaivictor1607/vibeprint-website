'use client'

import { memo, useEffect, useLayoutEffect, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from 'framer-motion'

// SSR-safe layout effect
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

function useMediaQuery(query: string): boolean {
  const getMatches = (): boolean =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false

  const [matches, setMatches] = useState<boolean>(getMatches)

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query)
    setMatches(matchMedia.matches)
    const handler = () => setMatches(matchMedia.matches)
    matchMedia.addEventListener('change', handler)
    return () => matchMedia.removeEventListener('change', handler)
  }, [query])

  return matches
}

const duration = 0.15
const transition = { duration, ease: [0.32, 0.72, 0, 1] as const }
const transitionOverlay = { duration: 0.5, ease: [0.32, 0.72, 0, 1] as const }

interface GalleryItem {
  src: string
  label: string
}

const CarouselInner = memo(function CarouselInner({
  handleClick,
  controls,
  items,
  isCarouselActive,
}: {
  handleClick: (item: GalleryItem, index: number) => void
  controls: ReturnType<typeof useAnimation>
  items: GalleryItem[]
  isCarouselActive: boolean
}) {
  const isSmall = useMediaQuery('(max-width: 640px)')
  const cylinderWidth = isSmall ? 1100 : 1800
  const faceCount = items.length
  const faceWidth = cylinderWidth / faceCount
  const radius = cylinderWidth / (2 * Math.PI)
  const rotation = useMotionValue(0)
  const transform = useTransform(
    rotation,
    (v) => `rotate3d(0, 1, 0, ${v}deg)`
  )

  return (
    <div
      className="flex h-full items-center justify-center"
      style={{ perspective: '1000px', transformStyle: 'preserve-3d', willChange: 'transform' }}
    >
      <motion.div
        drag={isCarouselActive ? 'x' : false}
        className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
        style={{ transform, rotateY: rotation, width: cylinderWidth, transformStyle: 'preserve-3d' }}
        onDrag={(_, info) =>
          isCarouselActive && rotation.set(rotation.get() + info.offset.x * 0.05)
        }
        onDragEnd={(_, info) =>
          isCarouselActive &&
          controls.start({
            rotateY: rotation.get() + info.velocity.x * 0.05,
            transition: { type: 'spring', stiffness: 100, damping: 30, mass: 0.1 },
          })
        }
        animate={controls}
      >
        {items.map((item, i) => (
          <motion.div
            key={`${item.src}-${i}`}
            className="absolute flex h-full origin-center items-center justify-center rounded-2xl p-2"
            style={{
              width: `${faceWidth}px`,
              transform: `rotateY(${i * (360 / faceCount)}deg) translateZ(${radius}px)`,
            }}
            onClick={() => handleClick(item, i)}
          >
            <motion.div
              layoutId={`card-${item.src}`}
              className="w-full rounded-2xl overflow-hidden border border-white/10 hover:border-brand-teal/60 transition-colors duration-300 cursor-pointer bg-brand-surface"
              style={{ aspectRatio: '4/3' }}
              initial={{ filter: 'blur(4px)' }}
              animate={{ filter: 'blur(0px)' }}
              transition={transition}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt={item.label}
                className="w-full h-full object-contain p-4"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-bg/90 to-transparent px-4 py-3">
                <span className="text-white/80 text-sm font-medium">{item.label}</span>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
})

export function ThreeDCarousel({ items }: { items: GalleryItem[] }) {
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null)
  const [isCarouselActive, setIsCarouselActive] = useState(true)
  const controls = useAnimation()

  const handleClick = (item: GalleryItem) => {
    setActiveItem(item)
    setIsCarouselActive(false)
    controls.stop()
  }

  const handleClose = () => {
    setActiveItem(null)
    setIsCarouselActive(true)
  }

  return (
    <motion.div layout className="relative">
      <AnimatePresence mode="sync">
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm"
            transition={transitionOverlay}
          >
            <motion.div
              layoutId={`card-${activeItem.src}`}
              className="relative bg-brand-surface border border-white/20 rounded-3xl overflow-hidden max-w-2xl w-full mx-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeItem.src}
                alt={activeItem.label}
                className="w-full object-contain p-8 max-h-[70vh]"
              />
              <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-white font-semibold text-lg">{activeItem.label}</span>
                <button
                  onClick={handleClose}
                  className="text-brand-text-secondary hover:text-white transition-colors text-sm"
                >
                  Închide ✕
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative h-[420px] w-full overflow-hidden">
        <CarouselInner
          handleClick={handleClick}
          controls={controls}
          items={items}
          isCarouselActive={isCarouselActive}
        />
      </div>
    </motion.div>
  )
}
