# Customization Guide — SPS Analytics Site

This document explains where to update key elements of the site when refining for real-world use.

---

## 1. Copy / Messaging

All copy is written directly in the component files under `components/sections/`. Here's where to find each major text element:

| Section | File | Key elements |
|---|---|---|
| Hero headline + subhead | `Hero.tsx` | Lines with "Retail Data, Mastered." |
| Problem pain points | `Problem.tsx` | `painPoints` array |
| Pipeline step descriptions | `Pipeline.tsx` | `steps` array |
| Analytics vs Integration features | `TwoWays.tsx` | `analyticsFeatures` and `integrationFeatures` arrays |
| Granularity stats | `Granularity.tsx` | `stats` array |
| Role messaging | `StopManaging.tsx` | `roles` array |
| AI capabilities | `AIReadiness.tsx` | `aiCapabilities` array |
| Differentiators | `Differentiators.tsx` | `differentiators` array |
| Final CTA headline | `FinalCTA.tsx` | h2 element |

**Tone guidance**: Keep copy concise, executive-friendly, and concrete. Avoid generic phrases like "digital transformation" or "end-to-end solution."

---

## 2. Colors & Branding

### Primary color palette

Defined in `tailwind.config.ts` under `theme.extend.colors.sps`:

```ts
sps: {
  navy: '#06163D',        // Hero and footer backgrounds
  'navy-mid': '#0A2156',  // Secondary dark backgrounds
  blue: '#1851C6',        // Primary brand blue
  'blue-mid': '#2563EB',  // Button hover / accents
  'blue-light': '#60A5FA', // Light accents
  sky: '#0EA5E9',         // Cyan/sky highlights
  teal: '#0D9488',        // Teal accent (integration motion)
  surface: '#F8FAFC',     // Page background
}
```

To update the primary blue brand color:
1. Change `blue: '#1851C6'` in `tailwind.config.ts`
2. Update any hardcoded hex values in component gradients (e.g., `from-blue-600 to-blue-700`)

### Fonts

Currently using **Inter** via `next/font/google`. To change:
- Edit `app/layout.tsx` — swap the `Inter` import for another Google font
- Update `tailwind.config.ts` `fontFamily.sans` if using a different variable name

---

## 3. Real Product Screenshots

The dashboard in `DashboardShowcase.tsx` is entirely SVG/CSS — all mock data. To swap in real screenshots:

1. Add real screenshot files to `public/` (e.g., `public/dashboard-overview.png`)
2. Replace the SVG chart sections in `DashboardShowcase.tsx` with `<Image>` components from `next/image`
3. Use multiple `<Image>` tags for different dashboard views and wire them to the view-switcher tabs

Example:
```tsx
import Image from 'next/image';
// ...
<Image
  src="/dashboard-overview.png"
  alt="SPS Analytics Dashboard"
  width={900}
  height={600}
  className="rounded-xl w-full"
/>
```

---

## 4. Hero Data Flow Visualization

The animated data flow in `Hero.tsx` uses SVG paths and positioned `div`s:

- **Source cards**: Edit the `sources` array to update retailer names, colors, and abbreviations
- **Output destinations**: Edit the `outputs` array for destination names and icons
- **Processor label**: The center box says "SPS Commerce / Data Engine" — update as needed
- **Animation timing**: Adjust the `animStep` timeouts in the `useEffect` for faster/slower reveal

To swap in a real product screenshot instead of the animation, replace the entire `<div className="relative w-full"...>` block with a Next.js `<Image>`.

---

## 5. Navigation Links

Edit the `navLinks` array in `Navigation.tsx` to update the top navigation items:

```ts
const navLinks = [
  { label: 'Analytics Platform', href: '#two-ways' },
  { label: 'Data Integration', href: '#two-ways' },
  // ...
];
```

For multi-page navigation, replace `href="#anchor"` with `href="/page-name"` and ensure routes exist.

---

## 6. CTA Contact Details

The final CTA buttons link to `mailto:sales@spscommerce.com` as a placeholder. Replace with:
- A real Calendly/demo booking link (e.g., `https://calendly.com/...`)
- A Marketo or HubSpot form embed
- An internal contact form route

Look for `href="mailto:..."` in `FinalCTA.tsx`.

---

## 7. Animation Refinement

Animations use Framer Motion with `whileInView`. Key adjustments:

| Behavior | Where to change | Property |
|---|---|---|
| Scroll trigger threshold | Each component's `useInView()` call | `margin` option (e.g., `'-100px'`) |
| Fade-in speed | Each `motion.div` | `transition.duration` |
| Stagger timing | Container variants | `staggerChildren` |
| Hero animation speed | `Hero.tsx` useEffect timeouts | `setTimeout` values |
| SVG path draw speed | `motion.path` elements | `transition.duration` |

To disable animations entirely (for performance testing), set `initial` and `animate` to the same values or remove `motion.` prefixes.

---

## 8. Metadata / SEO

Edit `app/layout.tsx` to update:
- `metadata.title`
- `metadata.description`
- `metadata.keywords`
- `metadata.openGraph`

---

## 9. Adding New Sections

1. Create a new file in `components/sections/YourSection.tsx`
2. Add `"use client"` at the top if using Framer Motion
3. Import and add it to `app/page.tsx` in the correct order
4. Add an `id` attribute for anchor link navigation (e.g., `<section id="your-section">`)

---

## 10. Mobile Responsiveness

All sections use Tailwind responsive prefixes (`sm:`, `md:`, `lg:`). Key breakpoints:
- `md:` — 768px (tablet)
- `lg:` — 1024px (desktop)

The hero visualization is shown on all screen sizes but may be simplified on mobile with CSS `hidden md:block` / `block md:hidden` classes.

---

## Performance Checklist Before Going Live

- [ ] Replace placeholder mock data with real metrics (or remove specific numbers)
- [ ] Swap mock dashboard with real product screenshots
- [ ] Update all CTA links to working URLs
- [ ] Add real logo/favicon to `public/`
- [ ] Update metadata in `app/layout.tsx`
- [ ] Test on iOS Safari and Android Chrome
- [ ] Verify all anchor links navigate correctly
- [ ] Consider adding analytics (Vercel Analytics, Plausible, or GA4)
