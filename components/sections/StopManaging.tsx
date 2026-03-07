'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const roles = [
  {
    role: 'Your Analysts',
    should: 'Analyze performance and surface insights',
    notDoing: 'Downloading retailer files and cleaning spreadsheets',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 1.5l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
  },
  {
    role: 'Your Sales Team',
    should: 'Sell more effectively with data-backed conversations',
    notDoing: 'Waiting days for someone to pull and format retailer data',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
  },
  {
    role: 'Your Planners',
    should: 'Plan replenishment using current, accurate signals',
    notDoing: 'Reconciling last week\'s conflicting retailer spreadsheets',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
  },
  {
    role: 'Your IT / Data Teams',
    should: 'Build strategic data infrastructure and drive innovation',
    notDoing: 'Rebuilding fragile retailer ingestion pipelines every quarter',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
];

export default function StopManaging() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-24 lg:py-32 bg-sps-surface" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Big bold headline block */}
        <motion.div
          className="max-w-4xl mb-20"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-100 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
            <span className="text-xs font-bold text-red-600 uppercase tracking-widest">Time to Refocus</span>
          </div>

          <h2 className="text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.06] tracking-tight mb-6">
            Stop Running a{' '}
            <span className="relative">
              <span className="relative z-10">Data Management</span>
              <motion.span
                className="absolute inset-x-0 bottom-1 h-3 bg-red-100 -z-0"
                initial={{ scaleX: 0, originX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </span>{' '}
            Company.
          </h2>

          <p className="text-xl lg:text-2xl text-slate-500 leading-relaxed font-light max-w-3xl">
            Your business runs on retail data. But collecting, cleaning, and managing that data
            is not your core business. Every hour spent wrangling spreadsheets is an hour
            not spent on strategy, growth, and competitive advantage.
          </p>
        </motion.div>

        {/* Role cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-16">
          {roles.map((item, i) => (
            <motion.div
              key={item.role}
              className="bg-white rounded-2xl p-6 border border-slate-100 shadow-card hover:shadow-card-hover transition-shadow"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.2 + i * 0.1 }}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base mb-3">{item.role}</h3>

                  <div className="space-y-2.5">
                    <div className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-green-600 uppercase tracking-wide mb-0.5">Should be</div>
                        <p className="text-sm text-slate-700 font-medium">{item.should}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-red-500 uppercase tracking-wide mb-0.5">Instead doing</div>
                        <p className="text-sm text-slate-500">{item.notDoing}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bold conclusion */}
        <motion.div
          className="rounded-3xl bg-gradient-to-r from-slate-900 to-[#0A2156] p-8 lg:p-12 text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <p className="text-2xl lg:text-3xl font-bold text-white leading-snug mb-4 max-w-3xl mx-auto">
            SPS absorbs the complexity of retail data management so your organization can focus on what it does best.
          </p>
          <p className="text-blue-300 text-base mb-8 max-w-xl mx-auto">
            You become a smarter, faster consumer of retail data — not a manager of it.
          </p>
          <a
            href="#cta"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-blue-lg text-base"
          >
            See How It Works
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
