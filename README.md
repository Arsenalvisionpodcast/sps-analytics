# SPS Commerce Analytics — Marketing Website

A polished, production-ready marketing microsite for the SPS Commerce Analytics and Data Integration solution. Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

---

## Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Deployment**: Vercel (no backend, no database, static-friendly)

---

## Quick Start

### Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm

### 1. Install dependencies

```bash
cd sps-analytics
npm install
```

### 2. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for production

```bash
npm run build
npm run start
```

---

## Deploy to Vercel

### Option A: Vercel CLI (fastest)

```bash
npm install -g vercel
vercel
```

Follow the prompts. Vercel auto-detects Next.js and handles everything.

### Option B: GitHub + Vercel Dashboard

1. Push this project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repository
4. Vercel auto-detects Next.js — no configuration needed
5. Click **Deploy**

### Option C: Static export (if needed)

Uncomment `output: 'export'` in `next.config.ts`, then:

```bash
npm run build
# Static files will be in the `out/` directory
```

---

## Project Structure

```
sps-analytics/
├── app/
│   ├── layout.tsx          # Root layout with metadata + fonts
│   ├── page.tsx            # Main page (composes all sections)
│   └── globals.css         # Global styles + Tailwind directives
├── components/
│   ├── Navigation.tsx      # Fixed top navigation with scroll behavior
│   ├── Footer.tsx          # Site footer
│   ├── ui/
│   │   ├── Button.tsx      # Reusable button component
│   │   └── SectionLabel.tsx # Section eyebrow label chip
│   └── sections/
│       ├── Hero.tsx               # Hero with animated SVG data flow
│       ├── Problem.tsx            # Pain point grid
│       ├── Pipeline.tsx           # 6-step data pipeline + before/after table
│       ├── TwoWays.tsx            # Analytics Platform vs Data Integration
│       ├── Granularity.tsx        # UPC/door-level data value props
│       ├── StopManaging.tsx       # Bold role-based messaging
│       ├── AIReadiness.tsx        # AI strategy + data quality stack
│       ├── Differentiators.tsx    # Why SPS differentiators
│       ├── DashboardShowcase.tsx  # Mock product dashboard with SVG charts
│       └── FinalCTA.tsx           # Closing CTA section
├── public/                 # Static assets (add logos, images here)
├── package.json
├── next.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── README.md
└── NOTES.md
```

---

## Customization

See `NOTES.md` for detailed guidance on:
- Where to update copy
- Where to swap in real product screenshots
- Where to adjust colors and branding
- Where to refine animations

---

## Performance Notes

- All animations use Framer Motion with `whileInView` for scroll-triggered reveals (animations only run once)
- SVG charts are rendered client-side with `"use client"` components
- No external APIs, no heavy dependencies, no video assets
- Inter font loaded via `next/font/google` (optimized)
- Images are SVG/CSS only — no external image fetching

---

## Browser Support

Tested on modern Chrome, Firefox, Safari, and Edge. Requires CSS Grid and CSS Custom Properties support (all modern browsers).
