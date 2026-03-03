'use client'

import { memo, useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from 'framer-motion'

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

const transitionOverlay = { duration: 0.4, ease: [0.32, 0.72, 0, 1] as const }

export interface GalleryItem {
  src: string
  label: string
}

// Degrees per frame for 1.5s per face at 60fps
// 360° / (faceCount * 1.5s) / 60fps
const DEG_PER_SECOND = (faceCount: number) => 360 / (faceCount * 1.5)

const CarouselInner = memo(function CarouselInner({
  handleClick,
  controls,
  items,
  isCarouselActive,
}: {
  handleClick: (item: GalleryItem) => void
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
  const transform = useTransform(rotation, (v) => `rotate3d(0, 1, 0, ${v}deg)`)

  const isDragging = useRef(false)
  const frameRef = useRef<number | null>(null)
  const degPerSec = DEG_PER_SECOND(faceCount)

  useEffect(() => {
    if (!isCarouselActive) {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
      return
    }

    let lastTime: number | null = null

    const tick = (time: number) => {
      if (lastTime !== null && !isDragging.current) {
        const delta = time - lastTime
        rotation.set(rotation.get() + (degPerSec * delta) / 1000)
      }
      lastTime = time
      frameRef.current = requestAnimationFrame(tick)
    }

    frameRef.current = requestAnimationFrame(tick)
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [isCarouselActive, degPerSec, rotation])

  return (
    <div
      className="flex h-full items-center justify-center"
      style={{ perspective: '1000px', transformStyle: 'preserve-3d', willChange: 'transform' }}
    >
      <motion.div
        drag={isCarouselActive ? 'x' : false}
        className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
        style={{ transform, rotateY: rotation, width: cylinderWidth, transformStyle: 'preserve-3d' }}
        onDragStart={() => { isDragging.current = true }}
        onDrag={(_, info) => {
          rotation.set(rotation.get() + info.offset.x * 0.05)
        }}
        onDragEnd={(_, info) => {
          isDragging.current = false
          controls.start({
            rotateY: rotation.get() + info.velocity.x * 0.05,
            transition: { type: 'spring', stiffness: 100, damping: 30, mass: 0.1 },
          })
        }}
        animate={controls}
      >
        {items.map((item, i) => (
          <motion.div
            key={`${item.src}-${i}`}
            className="absolute flex h-full origin-center items-center justify-center p-2"
            style={{
              width: `${faceWidth}px`,
              transform: `rotateY(${i * (360 / faceCount)}deg) translateZ(${radius}px)`,
            }}
            onClick={() => handleClick(item)}
          >
            <motion.div
              layoutId={`card-${item.src}`}
              className="w-full rounded-2xl overflow-hidden border border-white/10 hover:border-brand-teal/60 transition-colors duration-300 cursor-pointer bg-brand-surface"
              style={{ aspectRatio: '4/3' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt={item.label}
                className="w-full h-full object-cover"
              />
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
            className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 backdrop-blur-sm"
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
                className="w-full object-contain max-h-[80vh]"
              />
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-white/60 hover:text-white bg-black/40 hover:bg-black/60 rounded-full w-8 h-8 flex items-center justify-center transition-colors text-sm"
                aria-label="Închide"
              >
                ✕
              </button>
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
