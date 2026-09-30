'use client'

import { useState, useEffect } from 'react'

// Ease-out count-up from 0 to `to`, starting after `delay` ms.
// When `enabled` is false the value resets to 0 (used for Without/With flips).
export function useCounter(to: number, delay: number, duration: number = 1200, enabled: boolean = true) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!enabled) {
      setValue(0)
      return
    }
    let raf = 0
    const t = setTimeout(() => {
      const start = Date.now()
      const tick = () => {
        const progress = Math.min((Date.now() - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setValue(Math.round(to * eased))
        if (progress < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, delay)
    return () => {
      clearTimeout(t)
      cancelAnimationFrame(raf)
    }
  }, [to, delay, duration, enabled])
  return value
}
