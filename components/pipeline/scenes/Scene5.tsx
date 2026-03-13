'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const TEAM_NODES = [
  { label: 'Analytics', icon: 'chart', color: '#60A5FA', angle: -90, radius: 175, delay: 0.4 },
  { label: 'Demand Planning', icon: 'trend', color: '#818CF8', angle: -30, radius: 175, delay: 0.65 },
  { label: 'Finance', icon: 'dollar', color: '#34D399', angle: 30, radius: 175, delay: 0.9 },
  { label: 'Sales', icon: 'target', color: '#FBBF24', angle: 90, radius: 175, delay: 1.15 },
  { label: 'Marketing', icon: 'megaphone', color: '#F472B6', angle: 150, radius: 175, delay: 1.4 },
  { label: 'Operations', icon: 'cog', color: '#22D3EE', angle: 210, radius: 175, delay: 1.65 },
]

function angleToXY(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180
  return { x: Math.cos(rad) * radius, y: Math.sin(rad) * radius }
}

function TeamIcon({ icon }: { icon: string }) {
  const paths: Record<string, JSX.Element> = {
    chart: (
      <g>
        <rect x="3" y="9" width="3" height="7" rx="0.5" fill="currentColor" opacity="0.7" />
        <rect x="8" y="6" width="3" height="10" rx="0.5" fill="currentColor" />
        <rect x="13" y="4" width="3" height="12" rx="0.5" fill="currentColor" opacity="0.8" />
      </g>
    ),
    trend: (
      <path d="M3 13L7.5 8.5L10.5 11.5L16.5 5.5M14 5.5H16.5V8" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    ),
    dollar: (
      <g>
        <circle cx="9.5" cy="9.5" r="7" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M9.5 5V14M7 7.5C7 7.5 7 6 9.5 6s2.5 1.5 2.5 2.5S9.5 10 9.5 10s-2.5 0-2.5 1.5S8.5 13 9.5 13s2.5-1 2.5-1.5" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      </g>
    ),
    target: (
      <g>
        <circle cx="9.5" cy="9.5" r="7" stroke="currentColor" strokeWidth="1.3" fill="none" />
        <circle cx="9.5" cy="9.5" r="4" stroke="currentColor" strokeWidth="1.3" fill="none" />
        <circle cx="9.5" cy="9.5" r="1.5" fill="currentColor" />
      </g>
    ),
    megaphone: (
      <path d="M3.5 7.5H7L13 4V15L7 11.5H3.5V7.5ZM7 11.5V15.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    ),
    cog: (
      <g>
        <circle cx="9.5" cy="9.5" r="2.5" stroke="currentColor" strokeWidth="1.3" fill="none" />
        <path d="M9.5 3.5V5.5M9.5 13.5V15.5M3.5 9.5H5.5M13.5 9.5H15.5M5.4 5.4L6.8 6.8M12.2 12.2L13.6 13.6M13.6 5.4L12.2 6.8M6.8 12.2L5.4 13.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </g>
    ),
  }
  return (
    <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
      {paths[icon]}
    </svg>
  )
}

const INTEGRATIONS = [
  { name: 'Snowflake', color: '#60A5FA', logo: 'S' },
  { name: 'Databricks', color: '#FB923C', logo: 'D' },
  { name: 'Delta Share', color: '#34D399', logo: '△' },
]

export default function Scene5() {
  const [showNodes, setShowNodes] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShowNodes(true), 800)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="w-full h-full flex items-center justify-center gap-10 px-8 py-2">

      {/* ── LEFT: CLEAN DATA SUMMARY ── */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="flex flex-col gap-3 w-52 flex-shrink-0"
      >
        <p className="text-xs font-semibold tracking-widest text-slate-600 uppercase">
          Data delivered as
        </p>

        {INTEGRATIONS.map((intg, i) => (
          <motion.div
            key={intg.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.12 }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: `1px solid ${intg.color}30`,
            }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black flex-shrink-0"
              style={{ background: `${intg.color}20`, color: intg.color }}
            >
              {intg.logo}
            </div>
            <div>
              <div className="text-white text-xs font-semibold">{intg.name}</div>
              <div className="text-slate-600 text-[10px]">Live Share</div>
            </div>
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.4 }}
              className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: intg.color }}
            />
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="px-3 py-3 rounded-xl mt-1"
          style={{
            background: 'rgba(52,211,153,0.06)',
            border: '1px solid rgba(52,211,153,0.18)',
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-emerald-400"
            />
            <span className="text-emerald-400 text-xs font-bold">Live — updates daily</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            No manual exports. No file transfers. Data stays current automatically.
          </p>
        </motion.div>
      </motion.div>

      {/* ── CENTER: HUB AND SPOKE ── */}
      <div className="relative flex-shrink-0" style={{ width: 420, height: 420 }}>

        {/* Spoke lines — render under nodes */}
        {showNodes && TEAM_NODES.map((node) => {
          const { x, y } = angleToXY(node.angle, node.radius)
          const len = node.radius - 60
          const ux = x / node.radius
          const uy = y / node.radius
          return (
            <motion.div
              key={`spoke-${node.label}`}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: node.delay - 0.15, duration: 0.35 }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: len,
                height: 1,
                background: `linear-gradient(90deg, ${node.color}60, ${node.color}20)`,
                transformOrigin: '0 0',
                transform: `rotate(${node.angle}deg) translateY(-0.5px)`,
              }}
            />
          )
        })}

        {/* Central warehouse */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 18 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center rounded-2xl z-10"
          style={{
            width: 120,
            height: 120,
            background: 'linear-gradient(135deg, rgba(24,81,198,0.25), rgba(34,211,238,0.15))',
            border: '1.5px solid rgba(99,102,241,0.5)',
            boxShadow: '0 0 60px rgba(37,99,235,0.25), 0 0 20px rgba(34,211,238,0.1)',
          }}
        >
          {/* Outer pulse ring */}
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute rounded-2xl inset-0 pointer-events-none"
            style={{ border: '1px solid rgba(99,102,241,0.4)' }}
          />

          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center mb-1.5"
            style={{ background: 'linear-gradient(135deg, #1851C6, #22D3EE)' }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="3" y="5" width="14" height="10" rx="2" stroke="white" strokeWidth="1.4" fill="none" />
              <path d="M7 5V4M10 5V3.5M13 5V4" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M6 10h8M6 12.5h5" stroke="white" strokeWidth="1.1" strokeLinecap="round" opacity="0.7" />
            </svg>
          </div>
          <div className="text-white text-xs font-bold text-center leading-tight">
            Data<br />Warehouse
          </div>
        </motion.div>

        {/* Team nodes */}
        {TEAM_NODES.map((node) => {
          const { x, y } = angleToXY(node.angle, node.radius)
          return (
            <motion.div
              key={node.label}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={showNodes ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: node.delay, type: 'spring', stiffness: 250, damping: 18 }}
              className="absolute flex flex-col items-center gap-1.5"
              style={{
                top: '50%',
                left: '50%',
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{
                  background: `${node.color}18`,
                  border: `1.5px solid ${node.color}45`,
                  color: node.color,
                  boxShadow: `0 0 16px ${node.color}20`,
                }}
              >
                <TeamIcon icon={node.icon} />
              </div>
              <span
                className="text-xs font-semibold text-center whitespace-nowrap"
                style={{ color: node.color }}
              >
                {node.label}
              </span>
            </motion.div>
          )
        })}
      </div>

      {/* ── RIGHT: OUTCOME CALLOUTS ── */}
      <motion.div
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.0, duration: 0.4 }}
        className="flex flex-col gap-2.5 w-48 flex-shrink-0"
      >
        <p className="text-xs font-semibold tracking-widest text-slate-600 uppercase">
          Teams empowered
        </p>
        {[
          { team: 'Analytics', outcome: 'SKU, store, and channel dashboards always current' },
          { team: 'Demand Planning', outcome: 'Forecast from clean sell-through and inventory signals' },
          { team: 'Finance', outcome: 'Margin and revenue visibility across all retail partners' },
          { team: 'Sales', outcome: 'Retailer scorecards and performance insights for line reviews' },
        ].map((item, i) => (
          <motion.div
            key={item.team}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.1 + i * 0.1 }}
            className="px-3 py-2.5 rounded-xl"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div className="text-white text-xs font-semibold mb-0.5">{item.team}</div>
            <div className="text-slate-500 text-[10px] leading-relaxed">{item.outcome}</div>
          </motion.div>
        ))}
      </motion.div>

    </div>
  )
}
