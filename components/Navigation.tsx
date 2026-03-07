'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Analytics Platform', href: '#two-ways' },
  { label: 'Data Integration', href: '#two-ways' },
  { label: 'Why SPS', href: '#differentiators' },
  { label: 'AI Readiness', href: '#ai-readiness' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/96 backdrop-blur-lg shadow-sm border-b border-slate-200/60'
            : 'bg-transparent'
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-md shadow-blue-600/30 group-hover:shadow-blue-600/50 transition-shadow">
              <svg viewBox="0 0 20 20" fill="white" className="w-4 h-4">
                <path d="M3 3h6v6H3V3zm8 0h6v6h-6V3zM3 11h6v6H3v-6zm8 0h6v6h-6v-6z" />
              </svg>
            </div>
            <div>
              <span
                className={`font-bold text-base tracking-tight transition-colors ${
                  scrolled ? 'text-slate-900' : 'text-white'
                }`}
              >
                SPS Commerce
              </span>
              <span
                className={`block text-[10px] font-medium leading-none transition-colors ${
                  scrolled ? 'text-blue-600' : 'text-blue-300'
                }`}
              >
                Analytics
              </span>
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  scrolled
                    ? 'text-slate-600 hover:text-blue-700'
                    : 'text-white/75 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#cta"
              className={`text-sm font-medium transition-colors ${
                scrolled ? 'text-slate-600 hover:text-blue-700' : 'text-white/75 hover:text-white'
              }`}
            >
              Contact Sales
            </a>
            <a
              href="#cta"
              className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md shadow-blue-600/30 hover:shadow-lg hover:shadow-blue-600/40 hover:-translate-y-0.5"
            >
              Request a Demo
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              scrolled ? 'text-slate-700 hover:bg-slate-100' : 'text-white hover:bg-white/10'
            }`}
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed top-16 inset-x-0 z-40 bg-white border-b border-slate-200 shadow-lg md:hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="py-2.5 text-sm font-medium text-slate-700 hover:text-blue-700 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 mt-2 border-t border-slate-100">
                <a
                  href="#cta"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full text-center py-3 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Request a Demo
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
