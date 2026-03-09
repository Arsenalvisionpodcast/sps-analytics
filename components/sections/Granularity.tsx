'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import SectionLabel from '../ui/SectionLabel';

const stats = [
  {
    value: 'UPC',
    label: 'Item-Level Data',
    description: 'Every scan at the UPC level — not aggregated to category, not rounded to brand. Precise, granular product performance data.',
  },
  {
    value: 'Door',
    label: 'Store-Level Visibility',
    description: 'Performance by individual store or location — not just by retailer or region. Know what\'s happening in each door.',
  },
  {
    value: 'Earlier',
    label: 'Faster Delivery',
    description: 'SPS delivers data faster than manual processes allow — often days ahead. Earlier data enables earlier decisions.',
  },
  {
    value: 'Thousands',
    label: 'Retailers & Distributors',
    description: 'Coverage across thousands of retail trading partners and distributors — mass, grocery, club, specialty, and online channels.',
  },
];

const useCases = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
    title: 'Forecasting Accuracy',
    description: 'Feed door-level sellthrough data into your planning models. Replace guesswork with precision.',
    color: 'text-blue-600 bg-blue-50',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
    title: 'Inventory Optimization',
    description: 'See overstock and understock at the store level before it becomes a write-off or lost sale.',
    color: 'text-sky-600 bg-sky-50',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
    title: 'Out-of-Stock Detection',
    description: 'Identify voids by item and store within days — not after the next quarterly review.',
    color: 'text-red-500 bg-red-50',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 1.5l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
    title: 'Assortment Insight',
    description: 'Understand which items are truly selling in which doors — and which are just taking up shelf space.',
    color: 'text-purple-600 bg-purple-50',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
    title: 'Retailer Conversations',
    description: 'Walk into retailer meetings with specific, data-backed observations — by item, by store, by week.',
    color: 'text-green-600 bg-green-50',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Sales Opportunity ID',
    description: 'Spot distribution gaps, underperforming doors, and emerging velocity trends before your competitors do.',
    color: 'text-orange-500 bg-orange-50',
  },
];

export default function Granularity() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-24 lg:py-32 bg-gradient-to-br from-[#06163D] via-[#0A2156] to-[#0F3785] relative overflow-hidden" ref={ref}>
      {/* Background elements */}
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <motion.div
        className="absolute -right-40 top-0 w-[600px] h-[600px] rounded-full opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, #60A5FA, transparent 70%)' }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 18, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          className="max-w-2xl mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionLabel variant="white">Granularity Matters</SectionLabel>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
            The Data Detail That Changes Everything
          </h2>
          <p className="text-xl text-blue-200 leading-relaxed">
            Aggregated data tells you what happened. Granular data tells you where, which item,
            which store — and early enough to act.
          </p>
        </motion.div>

        {/* Big stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.value}
              className="rounded-2xl glass-dark p-6"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1 }}
            >
              <div className="text-4xl lg:text-5xl font-black text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sky-300 text-xs font-bold uppercase tracking-widest mb-3">
                {stat.label}
              </div>
              <p className="text-blue-200 text-xs leading-relaxed">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Use cases */}
        <motion.h3
          className="text-white font-bold text-lg mb-6 opacity-60 uppercase tracking-widest text-xs"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.6 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          What granularity unlocks
        </motion.h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {useCases.map((uc, i) => (
            <motion.div
              key={uc.title}
              className="rounded-2xl glass-dark p-5 hover:bg-white/10 transition-colors group"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
            >
              <div className={`w-9 h-9 rounded-xl ${uc.color} flex items-center justify-center mb-3`}>
                {uc.icon}
              </div>
              <h4 className="text-white font-semibold text-sm mb-1.5">{uc.title}</h4>
              <p className="text-blue-200 text-xs leading-relaxed">{uc.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
