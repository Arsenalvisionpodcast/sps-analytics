'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import SectionLabel from '../ui/SectionLabel';

const differentiators = [
  {
    title: 'People + Process + Technology',
    description:
      'SPS isn\'t just software. Our retail data experts actively manage your data relationships, resolve exceptions, and ensure consistent quality — so you don\'t have to.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    highlight: true,
  },
  {
    title: 'Deep Retail Expertise',
    description:
      'SPS has been working with retail data for over 20 years. We understand the quirks of every major retailer\'s data format, portal, and EDI standard — so you benefit from that institutional knowledge immediately.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
    highlight: false,
  },
  {
    title: 'Full-Service Data Support',
    description:
      'When a retailer changes their file format, updates their portal, or drops a data field — SPS handles it. You don\'t get a support ticket. You get continuity.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.712 4.33a9.027 9.027 0 011.652 1.306c.51.51.944 1.064 1.306 1.652M16.712 4.33l-3.448 4.138m3.448-4.138a9.014 9.014 0 00-9.424 0M19.67 7.288l-4.138 3.448m4.138-3.448a9.014 9.014 0 010 9.424m-4.138-5.976a3.736 3.736 0 00-.88-1.388 3.737 3.737 0 00-1.388-.88m2.268 2.268a3.765 3.765 0 010 2.528m-2.268-4.796a3.765 3.765 0 00-2.528 0m4.796 4.796c-.181.506-.475.982-.88 1.388a3.736 3.736 0 01-1.388.88m2.268-2.268l4.138 3.448m0 0a9.027 9.027 0 01-1.306 1.652c-.51.51-1.064.944-1.652 1.306m0 0l-3.448-4.138m3.448 4.138a9.014 9.014 0 01-9.424 0m5.976-4.138a3.765 3.765 0 01-2.528 0m0 0a3.736 3.736 0 01-1.388-.88 3.737 3.737 0 01-.88-1.388m2.268 2.268L7.288 19.67m0 0a9.024 9.024 0 01-1.652-1.306 9.027 9.027 0 01-1.306-1.652m0 0l4.138-3.448M4.33 16.712a9.014 9.014 0 010-9.424m4.138 5.976a3.765 3.765 0 010-2.528m0 0c.181-.506.475-.982.88-1.388a3.736 3.736 0 011.388-.88m-2.268 2.268L4.33 7.288m6.406 1.18L7.288 4.33m0 0a9.024 9.024 0 00-1.652 1.306A9.025 9.025 0 004.33 7.288" />
      </svg>
    ),
    highlight: false,
  },
  {
    title: 'Business + Technical Audiences',
    description:
      'SPS serves both the VP of Sales who needs a dashboard and the data engineer who needs clean input data for their Snowflake pipeline. One platform. Two audiences. No compromise.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
    highlight: false,
  },
  {
    title: 'The Complete Value Chain',
    description:
      'Most solutions handle one part — dashboards, or data delivery. SPS manages the entire chain from collection to action, with full accountability for data quality at every step.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
      </svg>
    ),
    highlight: false,
  },
  {
    title: 'No Rip-and-Replace',
    description:
      'SPS integrates with your existing tools, data stack, and workflows. You don\'t have to abandon your current investments — you enhance them with trusted retail data.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
    highlight: false,
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

export default function Differentiators() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="differentiators" className="py-24 lg:py-32 bg-sps-surface" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="max-w-2xl mx-auto text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionLabel>Why SPS</SectionLabel>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-4">
            Not Just Dashboards. Not Just Data.
          </h2>
          <p className="text-xl text-slate-500 leading-relaxed">
            SPS delivers the complete value chain — from raw retailer data to confident business decisions.
          </p>
        </motion.div>

        {/* Differentiators grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={container}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {differentiators.map((d) => (
            <motion.div
              key={d.title}
              variants={item}
              className={`rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover ${
                d.highlight
                  ? 'bg-gradient-to-br from-blue-600 to-blue-700 border-blue-500 shadow-blue-lg'
                  : 'bg-white border-slate-100 shadow-card'
              }`}
            >
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${
                  d.highlight
                    ? 'bg-white/20 text-white'
                    : 'bg-blue-50 border border-blue-100 text-blue-600'
                }`}
              >
                {d.icon}
              </div>

              <h3
                className={`text-base font-bold mb-2 ${
                  d.highlight ? 'text-white' : 'text-slate-900'
                }`}
              >
                {d.title}
              </h3>
              <p
                className={`text-sm leading-relaxed ${
                  d.highlight ? 'text-blue-100' : 'text-slate-500'
                }`}
              >
                {d.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA strip */}
        <motion.div
          className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <p className="text-slate-500 text-base text-center sm:text-left">
            Ready to see SPS Commerce in action?
          </p>
          <a
            href="#cta"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl text-sm hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/30"
          >
            Request a Demo
          </a>
        </motion.div>
      </div>
    </section>
  );
}
