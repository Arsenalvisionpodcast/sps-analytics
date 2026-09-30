'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface NudgeProps {
  active: boolean // shake periodically until the visitor interacts
  delay?: number // seconds before the first shake, so it doesn't compete with the chapter's entrance
  className?: string
  children: ReactNode
}

// Gentle periodic shake that says "try clicking this". Transform-only, so
// MotionConfig reducedMotion="user" in the shell turns it off automatically.
export default function Nudge({ active, delay = 2.5, className = '', children }: NudgeProps) {
  return (
    <motion.div
      className={className}
      animate={active ? { x: [0, -5, 5, -4, 4, -2, 0], rotate: [0, -1.5, 1.5, -1, 1, 0, 0] } : { x: 0, rotate: 0 }}
      transition={
        active
          ? { duration: 0.6, delay, repeat: Infinity, repeatDelay: 2.8, ease: 'easeInOut' }
          : { duration: 0.2 }
      }
    >
      {children}
    </motion.div>
  )
}
