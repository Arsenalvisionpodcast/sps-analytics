'use client';

import { motion } from 'framer-motion';

export default function UseCasesHero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-36 lg:pb-24 bg-gradient-to-br from-[#06163D] via-[#0A2156] to-[#0F3785] overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Ambient glows */}
      <motion.div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.08]"
        style={{ background: 'radial-gradient(circle, #60A5FA, transparent 70%)' }}
        animate={{ scale: [1, 1.1, 1], x: [0, 30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, #F59E0B, transparent 70%)' }}
        animate={{ scale: [1, 1.15, 1], y: [0, 20, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            <span className="text-xs font-bold text-sky-300 uppercase tracking-widest">
              Use Cases
            </span>
          </div>

          <h1 className="text-4xl lg:text-6xl font-extrabold text-white leading-[1.05] tracking-tight mb-6">
            Three problems.{' '}
            <span className="text-gradient-hero">Nine use cases.</span>{' '}
            One foundation.
          </h1>

          <p className="text-lg lg:text-xl text-white/70 leading-relaxed max-w-2xl">
            SPS Analytics is a <span className="text-white font-semibold">decision optimization platform</span> for
            brands and suppliers. Every play below — inventory, forecasting, pricing, promotions,
            assortment, buyer conversations — runs on the same foundation: clean, analytics-ready
            sales and inventory data. Below, you can explore how better data from SPS Analytics
            drives better outcomes for your business.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 font-extrabold">
                1
              </div>
              <span>Foundation problem</span>
            </div>
            <div className="w-8 h-px bg-white/20" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-300 font-extrabold">
                2
              </div>
              <span>Outcome problems</span>
            </div>
            <div className="w-8 h-px bg-white/20" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-300 font-extrabold">
                9
              </div>
              <span>Use cases to explore</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
