'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline-white';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  className?: string;
  icon?: ReactNode;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  icon,
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 cursor-pointer select-none';

  const variants = {
    primary:
      'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 hover:-translate-y-0.5',
    secondary:
      'bg-white text-blue-700 hover:bg-blue-50 border border-blue-100 shadow-card hover:shadow-card-hover hover:-translate-y-0.5',
    ghost:
      'bg-white/10 text-white hover:bg-white/20 border border-white/20 hover:-translate-y-0.5',
    'outline-white':
      'bg-transparent text-white border-2 border-white/70 hover:bg-white hover:text-blue-700 hover:-translate-y-0.5',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      {children}
      {icon && <span className="ml-0.5">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileTap={{ scale: 0.98 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={classes}
      whileTap={{ scale: 0.98 }}
    >
      {content}
    </motion.button>
  );
}
