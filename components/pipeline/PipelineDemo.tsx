'use client'

import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Scene1 from './scenes/Scene1'
import Scene2 from './scenes/Scene2'
import Scene3 from './scenes/Scene3'
import Scene4 from './scenes/Scene4'
import Scene5 from './scenes/Scene5'
import Scene6 from './scenes/Scene6'

const SCENES = [
  {
    step: 1,
    tag: 'The Problem',
    title: 'Retail data arrives from everywhere.',
    subtitle: 'Each retailer delivers data differently — different portals, formats, schedules, and naming conventions. Your team spends hours collecting before any analysis can begin.',
  },
  {
    step: 2,
    tag: 'The Engine',
    title: 'Every record is validated and cleaned.',
    subtitle: 'The SPS Data Engine ingests raw retailer data, removes duplicates, resolves check-digit errors, fills gaps, and validates every record before it moves forward.',
  },
  {
    step: 3,
    tag: 'Normalization',
    title: 'One standard. Every metric. Every level.',
    subtitle: '"Pcs Sold," "Qty Sold," "# Pieces" — all resolved to a single standard. Granularity preserved from national level all the way down to UPC and individual door.',
  },
  {
    step: 4,
    tag: 'Correlation',
    title: 'Retailer naming mapped to your world.',
    subtitle: 'Your item file is the key. Every retailer\'s product hierarchy and naming convention is translated into your internal taxonomy — so data across all partners speaks the same language.',
  },
  {
    step: 5,
    tag: 'Delivery',
    title: 'Clean data. Live. Everywhere it needs to be.',
    subtitle: 'Normalized, correlated data delivered directly into your data warehouse as a live share — powering analytics, demand planning, finance, sales, and more in real time.',
  },
  {
    step: 6,
    tag: 'Resilience',
    title: 'When things change, SPS handles it.',
    subtitle: 'Retailer gaps, map changes, restatements, new locations, item updates — events that cripple manual pipelines. SPS resolves all of it automatically, at no additional cost.',
  },
]

const SceneComponents = [Scene1, Scene2, Scene3, Scene4, Scene5, Scene6]

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 32 : -32,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -32 : 32,
    opacity: 0,
  }),
}

export default function PipelineDemo() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  const goNext = useCallback(() => {
    if (current < SCENES.length - 1) {
      setDirection(1)
      setCurrent(c => c + 1)
    }
  }, [current])

  const goPrev = useCallback(() => {
    if (current > 0) {
      setDirection(-1)
      setCurrent(c => c - 1)
    }
  }, [current])

  const goTo = useCallback((i: number) => {
    setDirection(i > current ? 1 : -1)
    setCurrent(i)
  }, [current])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goNext()
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goPrev()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [goNext, goPrev])

  const ActiveScene = SceneComponents[current]
  const scene = SCENES[current]

  return (
    <div
      className="relative w-full h-screen overflow-hidden flex flex-col"
      style={{ background: '#030B18' }}
    >
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-20%',
          left: '30%',
          width: '40%',
          height: '60%',
          background: 'radial-gradient(ellipse, rgba(37,99,235,0.08) 0%, transparent 70%)',
        }}
      />

      {/* ── TOP BAR ── */}
      <div className="relative z-10 flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4 flex-shrink-0">
        <a href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-md shadow-blue-400/20 group-hover:shadow-blue-400/40 transition-shadow overflow-hidden flex-shrink-0">
            <img src="/sps-logo-mark.png" alt="SPS Commerce" className="w-6 h-6 object-contain" />
          </div>
          <div>
            <span className="text-white font-bold text-base tracking-tight group-hover:text-blue-300 transition-colors">
              SPS Commerce
            </span>
            <span className="block text-[10px] font-medium leading-none text-blue-400">
              Analytics
            </span>
          </div>
        </a>

        {/* Progress dots */}
        <div className="flex items-center gap-2">
          {SCENES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="transition-all duration-300 rounded-full"
              style={{
                height: 6,
                width: i === current ? 28 : 6,
                background: i === current
                  ? 'linear-gradient(90deg, #3B82F6, #22D3EE)'
                  : i < current
                  ? 'rgba(59,130,246,0.4)'
                  : 'rgba(255,255,255,0.12)',
              }}
            />
          ))}
        </div>

        <span className="text-slate-600 text-xs font-mono tabular-nums">
          {current + 1} / {SCENES.length}
        </span>
      </div>

      {/* ── SCENE TITLE AREA ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`title-${current}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative z-10 text-center px-4 sm:px-8 pb-2 sm:pb-3 flex-shrink-0"
        >
          <div
            className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-2 sm:mb-3"
            style={{
              color: '#60A5FA',
              background: 'rgba(59,130,246,0.1)',
              border: '1px solid rgba(59,130,246,0.2)',
            }}
          >
            Step {scene.step} of {SCENES.length} &nbsp;·&nbsp; {scene.tag}
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2 leading-tight">
            {scene.title}
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed hidden sm:block">
            {scene.subtitle}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* ── MAIN SCENE AREA ── */}
      <div className="relative flex-1 overflow-hidden min-h-0">
        <AnimatePresence custom={direction}>
          <motion.div
            key={`scene-${current}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <ActiveScene />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── BOTTOM NAV ── */}
      <div className="relative z-10 flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4 flex-shrink-0">
        <button
          onClick={goPrev}
          disabled={current === 0}
          className="flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 disabled:opacity-25 disabled:cursor-not-allowed"
          style={{
            color: '#94A3B8',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)')}
          onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
        >
          ← Previous
        </button>

        <span className="text-slate-700 text-xs hidden sm:inline">
          ← → arrow keys to navigate
        </span>

        <button
          onClick={goNext}
          disabled={current === SCENES.length - 1}
          className="flex items-center gap-2 px-4 sm:px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 disabled:opacity-25 disabled:cursor-not-allowed text-white"
          style={{
            background: current === SCENES.length - 1
              ? 'rgba(255,255,255,0.1)'
              : 'linear-gradient(135deg, #1851C6, #2563EB)',
            boxShadow: current === SCENES.length - 1
              ? 'none'
              : '0 4px 20px rgba(37,99,235,0.4)',
          }}
        >
          {current === SCENES.length - 1 ? 'Complete' : 'Next →'}
        </button>
      </div>
    </div>
  )
}
