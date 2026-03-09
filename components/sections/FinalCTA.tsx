'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const outcomes = [
  'Eliminate manual retailer data collection',
  'Get item-level, door-level visibility',
  'Deliver earlier and more granular data',
  'Support dashboards and your data stack',
  'Build the clean foundation for AI',
];

export default function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="cta" className="relative py-24 lg:py-36 overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#06163D] via-[#0A2156] to-[#0F3785]" />
      <div className="absolute inset-0 dot-pattern opacity-25" />

      {/* Animated glow orbs */}
      <motion.div
        className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.08]"
        style={{ background: 'radial-gradient(circle, #60A5FA, transparent 70%)' }}
        animate={{ scale: [1, 1.2, 1], y: [0, -30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, #0EA5E9, transparent 70%)' }}
        animate={{ scale: [1, 1.15, 1], y: [0, 20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-8 text-center">
        {/* Eyebrow */}
        <motion.div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 mb-8"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
          <span className="text-xs font-bold text-sky-300 uppercase tracking-widest">Ready to Transform Your Data?</span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          className="text-5xl lg:text-6xl font-extrabold text-white leading-[1.07] tracking-tight mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Stop Managing Messy
          <br />
          <span className="text-gradient-hero">Retail Data Manually.</span>
        </motion.h2>

        {/* Subhead */}
        <motion.p
          className="text-xl text-white/70 leading-relaxed mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          SPS Commerce transforms fragmented retailer and channel data into clean, correlated,
          decision-ready intelligence — for your business teams and your data stack.
        </motion.p>

        {/* Outcomes list */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {outcomes.map((o, i) => (
            <motion.div
              key={o}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.35 + i * 0.07, duration: 0.4 }}
            >
              <svg className="w-3 h-3 text-sky-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
              </svg>
              <span className="text-white/80 text-xs font-medium">{o}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          <a
            href="mailto:ebsmith@spscommerce.com"
            className="px-8 py-4 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-all duration-200 shadow-lg text-base hover:-translate-y-0.5"
          >
            Request a Demo
          </a>
          <a
            href="mailto:ebsmith@spscommerce.com"
            className="px-8 py-4 bg-transparent text-white font-semibold rounded-xl border-2 border-white/40 hover:border-white/70 hover:bg-white/10 transition-all duration-200 text-base hover:-translate-y-0.5"
          >
            Talk to Sales
          </a>
        </motion.div>

        {/* Bottom trust bar */}
        <motion.div
          className="border-t border-white/10 pt-10 grid grid-cols-1 sm:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {[
            {
              value: 'Thousands',
              label: 'Retailers & Distributors',
              desc: 'Mass, grocery, club, specialty, online channels, and distributors covered',
            },
            {
              value: '20+',
              label: 'Years of Retail Expertise',
              desc: 'Deep knowledge of every major retailer\'s data format and portal',
            },
            {
              value: 'Day 1',
              label: 'Time to Value',
              desc: 'Business teams get answers fast. Data teams get clean pipelines',
            },
          ].map((stat) => (
            <div key={stat.value} className="text-center">
              <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
              <div className="text-sky-300 text-xs font-bold uppercase tracking-widest mb-2">{stat.label}</div>
              <p className="text-white/50 text-xs leading-relaxed">{stat.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
