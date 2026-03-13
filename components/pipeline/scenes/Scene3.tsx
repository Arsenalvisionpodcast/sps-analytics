'use client'

import { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'

// Metric variants that get normalized
const SALES_VARIANTS = [
  { label: 'Pcs Sold', color: '#60A5FA', x: -160, y: -40 },
  { label: 'Qty Sold', color: '#818CF8', x: -80, y: -60 },
  { label: '# Sold', color: '#A78BFA', x: 20, y: -55 },
  { label: 'Each', color: '#C084FC', x: 100, y: -38 },
  { label: 'Pieces', color: '#E879F9', x: -140, y: 20 },
  { label: 'Units', color: '#60A5FA', x: 110, y: 25 },
]

const INV_VARIANTS = [
  { label: 'On Hand', color: '#22D3EE', x: -150, y: -38 },
  { label: 'Inv OH', color: '#34D399', x: -70, y: -55 },
  { label: 'OH Units', color: '#4ADE80', x: 30, y: -48 },
  { label: 'Curr Inv', color: '#22D3EE', x: 110, y: -32 },
  { label: 'Stock', color: '#86EFAC', x: -130, y: 22 },
]

// Geographic and product granularity levels
const GEO_LEVELS = [
  { label: 'National', icon: '◉', color: '#60A5FA', delay: 0.2 },
  { label: 'Regional', icon: '◎', color: '#818CF8', delay: 0.4 },
  { label: 'State', icon: '○', color: '#A78BFA', delay: 0.6 },
  { label: 'Store', icon: '●', color: '#C084FC', delay: 0.8 },
  { label: 'Door', icon: '·', color: '#E879F9', delay: 1.0 },
]

const PRODUCT_LEVELS = [
  { label: 'Brand', icon: '◉', color: '#22D3EE', delay: 0.25 },
  { label: 'Category', icon: '◎', color: '#34D399', delay: 0.45 },
  { label: 'Style', icon: '○', color: '#4ADE80', delay: 0.65 },
  { label: 'Color / Size', icon: '●', color: '#22D3EE', delay: 0.85 },
  { label: 'UPC', icon: '▪', color: '#86EFAC', delay: 1.05 },
]

function MetricChip({
  label,
  color,
  delay,
  targetX,
  targetY,
}: {
  label: string
  color: string
  delay: number
  targetX: number
  targetY: number
}) {
  const controls = useAnimation()

  useEffect(() => {
    const run = async () => {
      await new Promise(r => setTimeout(r, delay * 1000))
      await controls.start({ opacity: 1, x: targetX, y: targetY, scale: 1, transition: { duration: 0.35 } })
      await new Promise(r => setTimeout(r, 800))
      await controls.start({ opacity: 0, x: 0, y: 0, scale: 0.3, transition: { duration: 0.45, ease: 'easeIn' } })
    }
    run()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <motion.div
      initial={{ opacity: 0, x: targetX, y: targetY, scale: 0.7 }}
      animate={controls}
      className="absolute text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap"
      style={{
        color,
        background: `${color}18`,
        border: `1px solid ${color}40`,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      {label}
    </motion.div>
  )
}

function GranularityTree({
  levels,
  title,
  delay,
}: {
  levels: typeof GEO_LEVELS
  title: string
  delay: number
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase mb-2">{title}</p>
      {levels.map((level, i) => (
        <motion.div
          key={level.label}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + level.delay, duration: 0.3 }}
          className="flex flex-col items-center"
        >
          {i > 0 && (
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: delay + level.delay - 0.05 }}
              className="w-px h-3"
              style={{
                background: `linear-gradient(to bottom, ${levels[i - 1].color}50, ${level.color}50)`,
                transformOrigin: 'top',
              }}
            />
          )}
          <div
            className="px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5"
            style={{
              background: `${level.color}12`,
              border: `1px solid ${level.color}30`,
              color: level.color,
            }}
          >
            <span style={{ fontSize: 8 }}>{level.icon}</span>
            {level.label}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default function Scene3() {
  return (
    <div className="w-full h-full flex flex-col gap-4 px-10 py-2">

      {/* ── TOP HALF: METRIC NORMALIZATION ── */}
      <div className="flex gap-6 flex-1 min-h-0">

        {/* Sales metrics */}
        <div className="flex-1 flex flex-col items-center justify-center relative">
          <p className="text-xs font-semibold tracking-widest text-slate-600 uppercase mb-4 z-10">
            Sales Metrics
          </p>

          {/* Scattered chips */}
          <div className="relative w-full" style={{ height: 160 }}>
            {SALES_VARIANTS.map((v, i) => (
              <MetricChip
                key={v.label}
                label={v.label}
                color={v.color}
                delay={0.1 + i * 0.1}
                targetX={v.x}
                targetY={v.y}
              />
            ))}

            {/* Target standard — appears after chips converge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.6, type: 'spring', stiffness: 200 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10"
            >
              <div
                className="px-5 py-2.5 rounded-xl text-sm font-bold"
                style={{
                  color: '#60A5FA',
                  background: 'rgba(59,130,246,0.12)',
                  border: '2px solid rgba(59,130,246,0.4)',
                  boxShadow: '0 0 24px rgba(59,130,246,0.2)',
                }}
              >
                Units Sold
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.9 }}
                className="text-[10px] text-slate-500 mt-1"
              >
                single standard metric
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="w-px self-stretch my-4"
          style={{ background: 'rgba(255,255,255,0.06)' }}
        />

        {/* Inventory metrics */}
        <div className="flex-1 flex flex-col items-center justify-center relative">
          <p className="text-xs font-semibold tracking-widest text-slate-600 uppercase mb-4 z-10">
            Inventory Metrics
          </p>

          <div className="relative w-full" style={{ height: 160 }}>
            {INV_VARIANTS.map((v, i) => (
              <MetricChip
                key={v.label}
                label={v.label}
                color={v.color}
                delay={0.15 + i * 0.1}
                targetX={v.x}
                targetY={v.y}
              />
            ))}

            {/* Target standard */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.7, type: 'spring', stiffness: 200 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10"
            >
              <div
                className="px-5 py-2.5 rounded-xl text-sm font-bold"
                style={{
                  color: '#22D3EE',
                  background: 'rgba(34,211,238,0.1)',
                  border: '2px solid rgba(34,211,238,0.35)',
                  boxShadow: '0 0 24px rgba(34,211,238,0.15)',
                }}
              >
                On Hand Units
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.0 }}
                className="text-[10px] text-slate-500 mt-1"
              >
                single standard metric
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Right side context */}
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.1 }}
          className="w-48 flex flex-col justify-center gap-3 flex-shrink-0"
        >
          <div
            className="px-3 py-3 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="text-white text-xs font-semibold mb-1">1,300+ metrics</div>
            <div className="text-slate-500 text-xs leading-relaxed">
              standardized across every retailer in the SPS network
            </div>
          </div>
          <div
            className="px-3 py-3 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="text-white text-xs font-semibold mb-1">All sales + inventory</div>
            <div className="text-slate-500 text-xs leading-relaxed">
              sell-through, on-hand, in-transit, weeks of supply, and more
            </div>
          </div>
        </motion.div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)' }} />

      {/* ── BOTTOM HALF: GRANULARITY DEPTH ── */}
      <div className="flex items-start justify-center gap-16 pb-2" style={{ minHeight: 180 }}>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <GranularityTree levels={GEO_LEVELS} title="Geographic Depth" delay={0} />
        </motion.div>

        {/* Center label */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="flex flex-col items-center justify-center gap-2 pt-8"
        >
          <div
            className="px-4 py-2 rounded-full text-xs font-bold tracking-wide"
            style={{
              color: '#F8FAFC',
              background: 'linear-gradient(135deg, rgba(24,81,198,0.3), rgba(34,211,238,0.2))',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            Granularity preserved at every level
          </div>
          <p className="text-xs text-slate-600 text-center max-w-[140px] leading-relaxed">
            Down to individual store door and UPC barcode
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <GranularityTree levels={PRODUCT_LEVELS} title="Product Depth" delay={0.1} />
        </motion.div>
      </div>

    </div>
  )
}
