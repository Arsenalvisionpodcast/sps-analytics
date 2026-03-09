'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Button from '../ui/Button';

// Data sources that feed into SPS
const sources = [
  { label: 'Walmart Portal', sub: 'Web Portal / EDI', color: '#0071CE', initials: 'WMT' },
  { label: 'Target Feeds', sub: 'EDI 852 / ARA', color: '#CC0000', initials: 'TGT' },
  { label: 'Kroger Reports', sub: 'SFTP / Flat File', color: '#004E9E', initials: 'KR' },
  { label: 'Amazon VC', sub: 'ARA + Vendor Central', color: '#FF9900', initials: 'AMZ' },
  { label: 'Costco Data', sub: 'Email / SFTP', color: '#E31837', initials: 'COST' },
  { label: 'Regional Chains', sub: '20+ formats', color: '#6366F1', initials: 'REG' },
];

// Output destinations
const outputs = [
  {
    label: 'Analytics Dashboards',
    sub: 'Business insights, ready now',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
        <path d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm8-6a6 6 0 100 12A6 6 0 0010 4zm0 2a4 4 0 110 8 4 4 0 010-8z" />
        <path d="M10 6v4l3 3-1.5 1.5L8 11V6h2z" />
      </svg>
    ),
    color: '#2563EB',
    isAnalytics: true,
  },
  {
    label: 'Snowflake',
    sub: 'Data Warehouse',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2l2.5 4.5H9.5L12 2zm0 20l-2.5-4.5h5L12 22zm-8-10L.5 9.5 5 7l-1 5zm16 0l1 5-4.5-2.5L22 12zm-13.46-4.54L3.5 4.5 8 5.54 6.54 7.46zm10.92 9.08l3.04 2.96L19.46 16.54l1.46-1.92zM4.54 16.54L1.5 19.5l2.96-3.04 1.92 1.46zM19.46 7.46L21 5.54 18.46 8.5l-1.92-1.46z" />
      </svg>
    ),
    color: '#29B5E8',
    isAnalytics: false,
  },
  {
    label: 'Databricks',
    sub: 'Data Lakehouse',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    color: '#FF3621',
    isAnalytics: false,
  },
  {
    label: 'Azure / GCP',
    sub: 'Cloud Platforms',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M6.763 10.036c.41-.977 1.4-1.648 2.387-1.68l6.87-6.36c-.345-.283-.79-.44-1.263-.44H3.48c-1.105 0-2 .895-2 2v14c0 1.105.895 2 2 2h11.377c.474 0 .918-.157 1.263-.44L9.25 13.24c-1.286-.046-2.39-.962-2.487-2.249v-.955z" />
        <path d="M22.52 11.174l-3.857-3.566-4.38 4.06 4.38 3.887 3.826-3.436c.435-.39.435-1.055.031-1.945z" />
      </svg>
    ),
    color: '#0078D4',
    isAnalytics: false,
  },
];

// SVG path data for connecting lines
// ViewBox: 0 0 540 400
// Sources: x=0..148, centers y=[30, 88, 146, 204, 262, 320]
// Processor: x=210..330, y=130..270, center=(270,200)
// Outputs: x=392..540, centers y=[60, 140, 220, 300]

const sourceCenterYs = [30, 88, 146, 204, 262, 320];
const outputCenterYs = [60, 140, 220, 300];

function buildSourcePath(sy: number): string {
  // From right edge of source (x=148) to left edge of processor (x=210)
  const cx1 = 180;
  return `M 148 ${sy} C ${cx1} ${sy}, ${cx1} 200, 210 200`;
}

function buildOutputPath(dy: number): string {
  // From right edge of processor (x=330) to left edge of output (x=392)
  const cx1 = 362;
  return `M 330 200 C ${cx1} 200, ${cx1} ${dy}, 392 ${dy}`;
}

export default function Hero() {
  const [animStep, setAnimStep] = useState(0);

  useEffect(() => {
    // Drive animation sequence
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setAnimStep(1), 300));   // sources appear
    timers.push(setTimeout(() => setAnimStep(2), 1100));  // source paths draw
    timers.push(setTimeout(() => setAnimStep(3), 2200));  // processor glows
    timers.push(setTimeout(() => setAnimStep(4), 3000));  // output paths draw
    timers.push(setTimeout(() => setAnimStep(5), 4000));  // outputs appear
    return () => timers.forEach(clearTimeout);
  }, []);

  const ArrowIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-gradient-to-br from-[#06163D] via-[#0A2156] to-[#0F3785]">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Animated background blobs */}
      <motion.div
        className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full opacity-[0.07]"
        style={{ background: 'radial-gradient(circle, #60A5FA, transparent 70%)' }}
        animate={{ scale: [1, 1.1, 1], x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, #0EA5E9, transparent 70%)' }}
        animate={{ scale: [1, 1.15, 1], x: [0, -20, 0], y: [0, 20, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Nav spacer */}
      <div className="h-16 flex-shrink-0" />

      {/* Main hero content */}
      <div className="flex-1 max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12 py-12 lg:py-16">
        {/* Left: Copy */}
        <div className="flex-1 max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              <span className="text-xs font-bold text-sky-300 uppercase tracking-widest">
                Retail Data Intelligence
              </span>
            </div>
          </motion.div>

          <motion.h1
            className="text-5xl lg:text-6xl font-extrabold text-white leading-[1.08] tracking-tight mb-6"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Retail Data,{' '}
            <span className="text-gradient-hero">Mastered.</span>
          </motion.h1>

          <motion.p
            className="text-lg text-white/70 leading-relaxed mb-8 max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            SPS Commerce eliminates the burden of manual retailer data collection — cleaning,
            normalizing, and correlating fragmented channel data so your teams get trusted insights
            and your data stack gets fuel-grade input.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <Button variant="primary" size="lg" href="#two-ways" icon={<ArrowIcon />}>
              Explore Analytics Platform
            </Button>
            <Button variant="outline-white" size="lg" href="#two-ways">
              See Data Integration
            </Button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            className="flex flex-wrap items-center gap-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            {[
              { icon: '🔗', label: 'Thousands of retailers & distributors' },
              { icon: '📦', label: 'Item & store-level data' },
              { icon: '❄️', label: 'Snowflake / Databricks ready' },
            ].map((badge) => (
              <div key={badge.label} className="flex items-center gap-1.5 text-white/50 text-xs font-medium">
                <span>{badge.icon}</span>
                <span>{badge.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: Animated data flow visualization */}
        <div className="flex-1 w-full max-w-[580px]">
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* SVG visualization container */}
            <div className="relative w-full" style={{ paddingBottom: '74%' }}>
              <svg
                viewBox="0 0 540 400"
                className="absolute inset-0 w-full h-full"
                style={{ overflow: 'visible' }}
              >
                {/* --- SOURCE PATHS (drawn when animStep >= 2) --- */}
                {animStep >= 2 &&
                  sourceCenterYs.map((sy, i) => (
                    <g key={`src-path-${i}`}>
                      {/* Glowing base line */}
                      <motion.path
                        d={buildSourcePath(sy)}
                        stroke="#3B82F6"
                        strokeWidth="1.5"
                        fill="none"
                        opacity={0.3}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.7, delay: i * 0.08, ease: 'easeInOut' }}
                      />
                      {/* Animated flow dash */}
                      <motion.path
                        d={buildSourcePath(sy)}
                        stroke="#60A5FA"
                        strokeWidth="1.5"
                        fill="none"
                        strokeDasharray="4 8"
                        initial={{ pathLength: 0, strokeDashoffset: 0 }}
                        animate={{
                          pathLength: 1,
                          strokeDashoffset: [0, -24],
                        }}
                        transition={{
                          pathLength: { duration: 0.7, delay: i * 0.08 },
                          strokeDashoffset: { duration: 0.8, repeat: Infinity, ease: 'linear', delay: 0.7 + i * 0.08 },
                        }}
                      />
                    </g>
                  ))}

                {/* --- OUTPUT PATHS (drawn when animStep >= 4) --- */}
                {animStep >= 4 &&
                  outputCenterYs.map((dy, i) => (
                    <g key={`out-path-${i}`}>
                      <motion.path
                        d={buildOutputPath(dy)}
                        stroke="#0EA5E9"
                        strokeWidth="1.5"
                        fill="none"
                        opacity={0.3}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeInOut' }}
                      />
                      <motion.path
                        d={buildOutputPath(dy)}
                        stroke="#38BDF8"
                        strokeWidth="1.5"
                        fill="none"
                        strokeDasharray="4 8"
                        initial={{ pathLength: 0, strokeDashoffset: 0 }}
                        animate={{
                          pathLength: 1,
                          strokeDashoffset: [0, -24],
                        }}
                        transition={{
                          pathLength: { duration: 0.6, delay: i * 0.1 },
                          strokeDashoffset: { duration: 0.8, repeat: Infinity, ease: 'linear', delay: 0.6 + i * 0.1 },
                        }}
                      />
                    </g>
                  ))}
              </svg>

              {/* --- SOURCE CARDS (left column) --- */}
              <div className="absolute left-0 top-0 flex flex-col gap-2.5" style={{ width: 148 }}>
                {sources.map((src, i) => (
                  <motion.div
                    key={src.label}
                    className="glass-dark rounded-xl px-3 py-2 flex items-center gap-2.5"
                    initial={{ opacity: 0, x: -20 }}
                    animate={animStep >= 1 ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.45, delay: i * 0.07, ease: 'easeOut' }}
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-black text-[9px] tracking-tight"
                      style={{ background: src.color }}
                    >
                      {src.initials}
                    </div>
                    <div className="min-w-0">
                      <div className="text-white text-[11px] font-semibold truncate leading-tight">
                        {src.label}
                      </div>
                      <div className="text-white/40 text-[9px] truncate">{src.sub}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* --- SPS PROCESSOR (center) --- */}
              <div
                className="absolute"
                style={{
                  left: '38%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 130,
                }}
              >
                <motion.div
                  className="rounded-2xl p-4 text-center border border-blue-400/40"
                  style={{
                    background: 'linear-gradient(135deg, rgba(24,81,198,0.85) 0%, rgba(37,99,235,0.9) 100%)',
                    backdropFilter: 'blur(12px)',
                  }}
                  animate={
                    animStep >= 3
                      ? {
                          boxShadow: [
                            '0 0 20px rgba(59,130,246,0.3)',
                            '0 0 50px rgba(59,130,246,0.6)',
                            '0 0 20px rgba(59,130,246,0.3)',
                          ],
                        }
                      : {}
                  }
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {/* Logo mark */}
                  <div className="w-10 h-10 rounded-xl bg-white/20 mx-auto mb-2.5 flex items-center justify-center">
                    <svg viewBox="0 0 20 20" fill="white" className="w-5 h-5">
                      <path d="M3 3h6v6H3V3zm8 0h6v6h-6V3zM3 11h6v6H3v-6zm8 0h6v6h-6v-6z" />
                    </svg>
                  </div>

                  <div className="text-white font-bold text-[11px] leading-tight mb-0.5">SPS Commerce</div>
                  <div className="text-blue-200 text-[9px] font-medium mb-3">Data Engine</div>

                  {/* Processing steps */}
                  {['Collect', 'Cleanse', 'Normalize', 'Deliver'].map((step, i) => (
                    <motion.div
                      key={step}
                      className="flex items-center gap-1.5 py-0.5"
                      initial={{ opacity: 0 }}
                      animate={animStep >= 3 ? { opacity: 1 } : {}}
                      transition={{ delay: i * 0.15, duration: 0.4 }}
                    >
                      <div className="w-1 h-1 rounded-full bg-sky-400" />
                      <span className="text-blue-100 text-[9px] font-medium">{step}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* --- OUTPUT CARDS (right column) --- */}
              <div
                className="absolute right-0 top-0 flex flex-col gap-2.5"
                style={{ width: 148 }}
              >
                {outputs.map((out, i) => (
                  <motion.div
                    key={out.label}
                    className={`rounded-xl px-3 py-2 flex items-center gap-2.5 border ${
                      out.isAnalytics
                        ? 'bg-blue-600/30 border-blue-400/40'
                        : 'glass-dark'
                    }`}
                    style={{ marginTop: i === 0 ? 39 : 0 }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={animStep >= 5 ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.45, delay: i * 0.1, ease: 'easeOut' }}
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-white"
                      style={{ background: out.color }}
                    >
                      {out.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="text-white text-[11px] font-semibold truncate leading-tight">
                        {out.label}
                      </div>
                      <div className="text-white/40 text-[9px] truncate">{out.sub}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Caption */}
            <p className="text-center text-white/30 text-xs mt-2">
              Fragmented retailer data → Clean, correlated intelligence
            </p>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="flex flex-col items-center gap-2 pb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-white/30 text-xs tracking-wider">Scroll to explore</span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent"
          animate={{ scaleY: [0, 1, 0], y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
