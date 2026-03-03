'use client'

import React, { useEffect, useRef } from 'react'

const TUBE_COLORS = ['#4ECDC4', '#7B4FBF', '#4A5BA0']
const LIGHT_COLORS = ['#8BC34A', '#4ECDC4', '#7B4FBF', '#4A5BA0']

interface TubesBackgroundProps {
  children?: React.ReactNode
  className?: string
}

export function TubesBackground({ children, className }: TubesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    let cleanup: (() => void) | undefined

    const init = async () => {
      if (!canvasRef.current) return
      try {
        // webpackIgnore tells webpack to leave this as a runtime browser import
        // @ts-ignore
        const mod = await import(/* webpackIgnore: true */ 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js')
        if (!canvasRef.current) return
        const instance = mod.default(canvasRef.current, {
          tubes: {
            colors: TUBE_COLORS,
            lights: { intensity: 200, colors: LIGHT_COLORS },
          },
        })
        if (instance?.destroy) cleanup = () => instance.destroy()
        else if (instance?.dispose) cleanup = () => instance.dispose()
      } catch (err) {
        console.error('NeonFlow: failed to load tubes', err)
      }
    }

    init()
    return () => { cleanup?.() }
  }, [])

  return (
    <div className={`relative w-full h-full overflow-hidden bg-[#0D0A1A]${className ? ` ${className}` : ''}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
        style={{ touchAction: 'none' }}
      />
      <div className="relative z-10 w-full h-full pointer-events-none">
        {children}
      </div>
    </div>
  )
}

export default TubesBackground
