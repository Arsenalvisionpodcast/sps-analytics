'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { decisionCategories, useCases } from './data';
import SectionLabel from '../ui/SectionLabel';

// One simple inline icon per category
const icons: Record<string, JSX.Element> = {
  inventory: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      <rect x="3" y="4" width="18" height="16" rx="2" strokeOpacity="0.4" />
    </svg>
  ),
  forecasting: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 17l5-5 4 4 8-8M14 8h7v7" />
    </svg>
  ),
  promotions: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l3-3 3 3M9 19l3 3 3-3M5 9L2 12l3 3M19 9l3 3-3 3M12 6v12M6 12h12" />
    </svg>
  ),
  assortment: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-6 h-6">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" strokeOpacity="0.4" strokeDasharray="3 2" />
    </svg>
  ),
  collaboration: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-3.13a4 4 0 11-8 0 4 4 0 018 0zm6 0a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
};

export default function DecisionCategories() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-20 lg:py-28 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionLabel>The Bottom Line</SectionLabel>
          <h2 className="text-3xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-4">
            One foundation. Five decisions, every day.
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed">
            The nine use cases above don&apos;t live in isolation — they roll up to the five
            decision categories that suppliers and brands make every day. SPS Analytics is the
            decision optimization platform that powers all of them.
          </p>
        </motion.div>

        {/* 5 categories in a flex row that wraps on smaller screens */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {decisionCategories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.25 + idx * 0.08 }}
              className="relative bg-gradient-to-br from-slate-50 to-blue-50/40 rounded-2xl p-5 border border-slate-100 hover:border-blue-300 hover:shadow-card transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-4 shadow-md shadow-blue-600/20">
                {icons[cat.id]}
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-slate-900 mb-2 leading-tight">
                {cat.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                {cat.description}
              </p>

              {/* Roll-up use cases */}
              <div className="pt-3 border-t border-slate-200/60">
                <div className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                  Use cases
                </div>
                <div className="flex flex-wrap gap-1">
                  {cat.useCases.slice(0, 6).map((ucId) => {
                    const uc = useCases.find((u) => u.id === ucId);
                    return (
                      <span
                        key={ucId}
                        className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100"
                        title={uc?.short}
                      >
                        {ucId}
                      </span>
                    );
                  })}
                  {cat.useCases.length > 6 && (
                    <span className="text-[10px] font-medium text-slate-400">
                      +{cat.useCases.length - 6}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bridge line into CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <p className="text-base text-slate-500 italic max-w-2xl mx-auto">
            One foundation. Aligned decisions. Better outcomes.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
