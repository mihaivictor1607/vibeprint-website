'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const BRAND_COLORS = ['#4ECDC4', '#7B4FBF', '#4A5BA0', '#8BC34A']

interface ParticleFieldProps {
  count?: number
  mouseX?: number
  mouseY?: number
}

export default function ParticleField({ count = 2000, mouseX = 0, mouseY = 0 }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points | null>(null)

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const palette = BRAND_COLORS.map(h => new THREE.Color(h))

    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12
      positions[i * 3 + 2] = (Math.random() - 0.5) * 3

      const c = palette[Math.floor(Math.random() * palette.length)]
      colors[i * 3]     = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }
    return { positions, colors }
  }, [count])

  // Build geometry once with useMemo
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return geo
  }, [positions, colors])

  const material = useMemo(() => {
    return new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
      depthWrite: false,
    })
  }, [])

  useFrame(({ clock }) => {
    if (!pointsRef.current) return
    const t = clock.elapsedTime
    const pos = pointsRef.current.geometry.attributes.position
    const arr = pos.array as Float32Array
    const mx = mouseX * 10
    const my = -mouseY * 6

    for (let i = 0; i < count; i++) {
      const ix = i * 3
      // Sine drift
      arr[ix]     += Math.sin(t * 0.3 + i * 0.07) * 0.003
      arr[ix + 1] += Math.cos(t * 0.2 + i * 0.11) * 0.003

      // Weak mouse attraction within range
      const dx = mx - arr[ix]
      const dy = my - arr[ix + 1]
      const distSq = dx * dx + dy * dy
      if (distSq < 16) { // within 4 units
        arr[ix]     += dx * 0.0004
        arr[ix + 1] += dy * 0.0004
      }

      // Boundary wrap
      if (arr[ix]     >  10) arr[ix]     = -10
      if (arr[ix]     < -10) arr[ix]     =  10
      if (arr[ix + 1] >   6) arr[ix + 1] =  -6
      if (arr[ix + 1] <  -6) arr[ix + 1] =   6
    }
    pos.needsUpdate = true
  })

  return <points ref={pointsRef} geometry={geometry} material={material} />
}
