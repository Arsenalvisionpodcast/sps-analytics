'use client'

import { motion } from 'framer-motion'

const SALES_VARIANTS = [
  { label: 'Pcs Sold', color: '#60A5FA' },
  { label: 'Qty Sold', color: '#818CF8' },
  { label: '# Sold', color: '#A78BFA' },
  { label: 'Each', color: '#C084FC' },
  { label: 'Pieces', color: '#E879F9' },
  { label: 'Units', color: '#93C5FD' },
]

const INV_VARIANTS = [
  { label: 'On Hand', color: '#22D3EE' },
  { label: 'Inv OH', color: '#34D399' },
  { label: 'OH Units', color: '#4ADE80' },
  { label: 'Curr Inv', color: '#2DD4BF' },
  { label: 'Stock', color: '#86EFAC' },
]

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
  { label: 'Color / Size', icon: '●', color: '#2DD4BF', delay: 0.85 },
  { label: 'UPC', icon: '▪', color: '#86EFAC', delay: 1.05 },
]

function FunnelPanel({
  title,
  variants,
  standardLabel,
  standardColor,
  outputDelay,
}: {
  title: string
  variants: { label: string; color: string }[]
  standardLabel: string
  standardColor: string
  outputDelay: number
}) {
  const svgW = 230
  const svgH = 38

  return (
    <div className="flex flex-col items-center flex-1 min-w-0">
      <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase mb-2.5">{title}</p>

      {/* Input chips — always visible once appeared */}
      <div className="flex flex-wrap justify-center gap-1.5 px-2 w-full">
        {variants.map((v, i) => (
          <motion.div
            key={v.label}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08, duration: 0.3 }}
            className="text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap"
            style={{
              color: v.color,
              background: `${v.color}18`,
              border: `1px solid ${v.color}40`,
            }}
          >
            {v.label}
          </motion.div>
        ))}
      </div>

      {/* Converging lines */}
      <svg
        width={svgW}
        height={svgH}
        viewBox={`0 0 ${svgW} ${svgH}`}
        className="mt-1.5 flex-shrink-0"
      >
        {variants.map((v, i) => {
          const startX = variants.length > 1
            ? (svgW / (variants.length - 1)) * i
            : svgW / 2
          return (
            <motion.line
              key={v.label}
              x1={startX}
              y1={0}
              x2={svgW / 2}
              y2={svgH}
              stroke={v.color}
              strokeWidth={1.3}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.65 }}
              transition={{ delay: outputDelay - 0.35 + i * 0.05, duration: 0.4 }}
            />
          )
        })}
      </svg>

      {/* Standard output — persistent once appeared */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: outputDelay, type: 'spring', stiffness: 220, damping: 18 }}
        className="text-center mt-0.5"
      >
        <div
          className="px-5 py-2 rounded-xl text-sm font-bold"
          style={{
            color: standardColor,
            background: `${standardColor}14`,
            border: `2px solid ${standardColor}45`,
            boxShadow: `0 0 20px ${standardColor}20`,
          }}
        >
          {standardLabel}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: outputDelay + 0.25 }}
          className="text-[10px] text-slate-500 mt-1"
        >
          SPS standard metric
        </motion.div>
      </motion.div>
    </div>
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
    <div className="w-full h-full flex flex-col gap-3 px-10 py-2">

      {/* ── TOP HALF: PERSISTENT FUNNEL ── */}
      <div className="flex gap-4 flex-1 min-h-0 items-start pt-2 overflow-hidden">

        <FunnelPanel
          title="Sales Metrics"
          variants={SALES_VARIANTS}
          standardLabel="Units Sold"
          standardColor="#60A5FA"
          outputDelay={0.8}
        />

        <div
          className="w-px self-stretch my-2 flex-shrink-0"
          style={{ background: 'rgba(255,255,255,0.06)' }}
        />

        <FunnelPanel
          title="Inventory Metrics"
          variants={INV_VARIANTS}
          standardLabel="On Hand Units"
          standardColor="#22D3EE"
          outputDelay={0.9}
        />

        {/* Right context panel */}
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.3 }}
          className="w-44 flex flex-col justify-center gap-3 flex-shrink-0 pt-6"
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
      <div
        style={{
          height: 1,
          flexShrink: 0,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)',
        }}
      />

      {/* ── BOTTOM HALF: GRANULARITY DEPTH ── */}
      <div className="flex items-start justify-center gap-16 pb-2" style={{ minHeight: 180 }}>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <GranularityTree levels={GEO_LEVELS} title="Geographic Depth" delay={0} />
        </motion.div>

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

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <GranularityTree levels={PRODUCT_LEVELS} title="Product Depth" delay={0.1} />
        </motion.div>
      </div>

    </div>
  )
}
