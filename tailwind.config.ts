import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sps: {
          navy: '#06163D',
          'navy-mid': '#0A2156',
          blue: '#1851C6',
          'blue-mid': '#2563EB',
          'blue-light': '#60A5FA',
          sky: '#0EA5E9',
          teal: '#0D9488',
          surface: '#F8FAFC',
          'surface-alt': '#EEF2FF',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #06163D 0%, #0A2156 50%, #0F3785 100%)',
        'blue-gradient': 'linear-gradient(135deg, #1851C6 0%, #0EA5E9 100%)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'dash-flow': {
          '0%': { strokeDashoffset: '0' },
          '100%': { strokeDashoffset: '-24' },
        },
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-slower': 'float 12s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
        'dash-flow': 'dash-flow 1s linear infinite',
      },
      boxShadow: {
        'blue-lg': '0 10px 40px -8px rgba(24, 81, 198, 0.4)',
        'blue-xl': '0 20px 60px -12px rgba(24, 81, 198, 0.5)',
        'card': '0 2px 20px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 8px 40px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
};

export default config;
