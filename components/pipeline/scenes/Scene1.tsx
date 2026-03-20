'use client'

import { motion } from 'framer-motion'

const RETAILERS = [
  { name: 'Walmart', format: 'Retail Link Portal', tag: 'PORTAL', color: '#60A5FA', delay: 0 },
  { name: 'Target', format: 'Manual Excel Download', tag: 'XLS', color: '#818CF8', delay: 0.1 },
  { name: 'Amazon', format: 'Vendor Central API', tag: 'API', color: '#A78BFA', delay: 0.2 },
  { name: 'Home Depot', format: 'EDI Data Feed', tag: 'EDI', color: '#22D3EE', delay: 0.3 },
  { name: 'REI', format: 'Email Spreadsheet', tag: 'EMAIL', color: '#34D399', delay: 0.4 },
  { name: "Dick's Sporting", format: 'FTP Manual Extract', tag: 'FTP', color: '#FBBF24', delay: 0.5 },
]

const PAIN_POINTS = [
  {
    value: '12+',
    label: 'hours per week',
    detail: 'spent collecting and reformatting retailer data before any analysis begins',
  },
  {
    value: '6+',
    label: 'separate portals',
    detail: 'each with different logins, formats, and delivery schedules',
  },
  {
    value: '0',
    label: 'shared standard',
    detail: 'no two retailers define metrics, product fields, or store codes the same way',
  },
]

// Particles that flow across the lane channels
function FlowParticle({ color, delay, width }: { color: string; delay: number; width: number }) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        height: 3,
        width,
        top: '50%',
        translateY: '-50%',
        background: `linear-gradient(90deg, transparent, ${color} 40%, ${color} 60%, transparent)`,
        left: 0,
      }}
      animate={{ x: [-width, 320] }}
      transition={{
        duration: 1.6,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  )
}

export default function Scene1() {
  return (
    <div className="w-full h-full flex items-center justify-center gap-3 sm:gap-6 px-4 sm:px-10 py-2">

      {/* ── LEFT: RETAILER SOURCES ── */}
      <div className="flex flex-col gap-2 w-1/2 sm:w-[34%]">
        <p className="text-xs font-semibold tracking-widest text-slate-600 uppercase mb-1">
          Data Sources
        </p>
        {RETAILERS.map((r, i) => (
          <motion.div
            key={r.name}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: r.delay, duration: 0.35 }}
            className="flex items-center justify-between px-3 py-2.5 rounded-lg"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <div className="flex items-center gap-2.5">
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: r.color, boxShadow: `0 0 6px ${r.color}80` }}
              />
              <span className="text-white text-sm font-medium">{r.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-500 text-xs hidden sm:block">{r.format}</span>
              <span
                className="text-xs font-mono font-bold px-1.5 py-0.5 rounded text-[10px]"
                style={{
                  color: r.color,
                  background: `${r.color}18`,
                  border: `1px solid ${r.color}35`,
                }}
              >
                {r.tag}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── CENTER: FLOW CHANNELS ── */}
      <div className="hidden sm:flex flex-col w-[18%] gap-2">
        <p className="text-xs font-semibold tracking-widest text-slate-900 uppercase mb-1 select-none">
          &nbsp;
        </p>
        {RETAILERS.map((r, i) => (
          <motion.div
            key={r.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 + r.delay }}
            className="relative overflow-hidden rounded"
            style={{ height: 38 }}
          >
            {/* Static base line */}
            <div
              className="absolute w-full rounded-full"
              style={{
                height: 1,
                top: '50%',
                transform: 'translateY(-50%)',
                background: `linear-gradient(90deg, ${r.color}30, ${r.color}10)`,
              }}
            />
            {/* Three staggered particles per lane */}
            <FlowParticle color={r.color} delay={0 + i * 0.12} width={48} />
            <FlowParticle color={r.color} delay={0.55 + i * 0.12} width={32} />
            <FlowParticle color={r.color} delay={1.1 + i * 0.12} width={40} />
          </motion.div>
        ))}
      </div>

      {/* ── RIGHT: PAIN POINTS ── */}
      <motion.div
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.0, duration: 0.4 }}
        className="flex flex-col gap-2 sm:gap-3 w-1/2 sm:w-[44%]"
      >
        <p className="text-xs font-semibold tracking-widest text-slate-600 uppercase mb-1">
          The Cost of Manual Collection
        </p>

        {PAIN_POINTS.map((p, i) => (
          <motion.div
            key={p.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 + i * 0.15 }}
            className="px-3 sm:px-4 py-2 sm:py-3 rounded-xl"
            style={{
              background: 'rgba(239,68,68,0.07)',
              border: '1px solid rgba(239,68,68,0.18)',
            }}
          >
            <div className="flex items-baseline gap-2 mb-0.5">
              <span className="text-xl sm:text-2xl font-bold" style={{ color: '#F87171' }}>
                {p.value}
              </span>
              <span className="text-xs sm:text-sm font-semibold" style={{ color: '#FCA5A5' }}>
                {p.label}
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">{p.detail}</p>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="hidden sm:block px-4 py-3 rounded-xl mt-1"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <p className="text-xs text-slate-400 leading-relaxed">
            Every retailer formats data differently. Before your team can answer a single business question, someone has to collect it, clean it, and stitch it together — manually, every week.
          </p>
        </motion.div>
      </motion.div>

    </div>
  )
}
