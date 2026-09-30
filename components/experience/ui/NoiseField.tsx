'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

interface NoiseFieldProps {
  // 0 = calm blue flow (With SPS), 1 = jittery static (Without)
  chaos: number
}

type RGB = [number, number, number]

const CALM: RGB[] = [[59, 130, 246], [34, 211, 238], [96, 165, 250]]
const CHAOS: RGB[] = [[248, 113, 113], [251, 191, 36], [148, 163, 184]]

// Full-stage ambient canvas. Particles lerp between drifting blue flow and
// flickering red/amber static as `chaos` changes, so a mode flip "settles" the room.
export default function NoiseField({ chaos }: NoiseFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chaosRef = useRef(chaos)
  const reduce = useReducedMotion()

  useEffect(() => {
    chaosRef.current = chaos
  }, [chaos])

  useEffect(() => {
    if (reduce) return
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0
    let h = 0
    const resize = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const count = w < 640 ? 45 : 110
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      v: 0.25 + Math.random() * 0.8,
      phase: Math.random() * Math.PI * 2,
      r: 0.6 + Math.random() * 1.3,
      tone: Math.floor(Math.random() * 3),
    }))

    let c = chaosRef.current
    let t = 0
    let raf = 0

    const frame = () => {
      t += 1
      c += (chaosRef.current - c) * 0.04
      ctx.clearRect(0, 0, w, h)

      for (const p of particles) {
        const calmDx = p.v
        const calmDy = Math.sin(t * 0.012 + p.phase) * 0.25
        const jx = (Math.random() - 0.5) * 3
        const jy = (Math.random() - 0.5) * 3
        p.x += calmDx * (1 - c) + jx * c
        p.y += calmDy * (1 - c) + jy * c
        if (p.x > w + 20) p.x = -20
        if (p.x < -20) p.x = w + 20
        if (p.y > h + 10) p.y = -10
        if (p.y < -10) p.y = h + 10

        const a = CALM[p.tone]
        const b = CHAOS[p.tone]
        const r = Math.round(a[0] + (b[0] - a[0]) * c)
        const g = Math.round(a[1] + (b[1] - a[1]) * c)
        const bl = Math.round(a[2] + (b[2] - a[2]) * c)
        const flicker = Math.random() < 0.12 * c ? 0 : 1
        const alpha = ((1 - c) * 0.45 + c * 0.32) * flicker

        // Calm particles leave a short streak in the direction of flow
        if (c < 0.6) {
          const tail = p.v * 14 * (1 - c)
          const grad = ctx.createLinearGradient(p.x - tail, p.y, p.x, p.y)
          grad.addColorStop(0, `rgba(${r},${g},${bl},0)`)
          grad.addColorStop(1, `rgba(${r},${g},${bl},${alpha * 0.8})`)
          ctx.strokeStyle = grad
          ctx.lineWidth = p.r
          ctx.beginPath()
          ctx.moveTo(p.x - tail, p.y)
          ctx.lineTo(p.x, p.y)
          ctx.stroke()
        }
        ctx.fillStyle = `rgba(${r},${g},${bl},${alpha})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      // TV static + the occasional glitch scanline
      if (c > 0.05) {
        const n = Math.floor(240 * c)
        ctx.fillStyle = `rgba(255,255,255,${0.05 * c})`
        for (let i = 0; i < n; i++) {
          ctx.fillRect(Math.random() * w, Math.random() * h, 1, 1)
        }
        if (Math.random() < 0.05 * c) {
          ctx.fillStyle = `rgba(248,113,113,${0.07 * c})`
          ctx.fillRect(0, Math.random() * h, w, 1 + Math.random() * 3)
        }
      }

      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [reduce])

  if (reduce) return null
  return <canvas ref={canvasRef} aria-hidden className="absolute inset-0 w-full h-full pointer-events-none" />
}
