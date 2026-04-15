'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function UseCasesCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="cta"
      className="relative py-20 lg:py-28 bg-gradient-to-br from-[#06163D] via-[#0A2156] to-[#0F3785] overflow-hidden"
      ref={ref}
    >
      <div className="absolute inset-0 grid-bg opacity-40" />
      <motion.div
        className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.08]"
        style={{ background: 'radial-gradient(circle, #60A5FA, transparent 70%)' }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
            Ready to solve these{' '}
            <span className="text-gradient-hero">problems together?</span>
          </h2>
          <p className="text-lg text-white/70 leading-relaxed max-w-2xl mx-auto mb-10">
            Pick the use case that resonates most — or tell me the one that isn't here. Either
            way, let's turn retail data from a weekly burden into a strategic advantage.
          </p>

          <a
            href="mailto:ebsmith@spscommerce.com?subject=SPS%20Analytics%20-%20Demo%20Request"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-700 font-bold rounded-xl text-base hover:bg-blue-50 transition-all shadow-xl shadow-blue-900/30 hover:-translate-y-0.5"
          >
            Request a Demo
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
