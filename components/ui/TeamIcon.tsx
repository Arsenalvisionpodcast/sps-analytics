// Small line icons for team nodes (shared by /pipeline Scene 5 and /experience).

export default function TeamIcon({ icon }: { icon: string }) {
  const paths: Record<string, React.ReactElement> = {
    chart: (
      <g>
        <rect x="3" y="9" width="3" height="7" rx="0.5" fill="currentColor" opacity="0.7" />
        <rect x="8" y="6" width="3" height="10" rx="0.5" fill="currentColor" />
        <rect x="13" y="4" width="3" height="12" rx="0.5" fill="currentColor" opacity="0.8" />
      </g>
    ),
    trend: (
      <path d="M3 13L7.5 8.5L10.5 11.5L16.5 5.5M14 5.5H16.5V8" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    ),
    dollar: (
      <g>
        <circle cx="9.5" cy="9.5" r="7" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M9.5 5V14M12 7.5C12 7.5 12 6 9.5 6S7 7.5 7 8.5 9.5 10 9.5 10s2.5 0 2.5 1.5S10.5 13 9.5 13s-2.5-1-2.5-1.5" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      </g>
    ),
    target: (
      <g>
        <circle cx="9.5" cy="9.5" r="7" stroke="currentColor" strokeWidth="1.3" fill="none" />
        <circle cx="9.5" cy="9.5" r="4" stroke="currentColor" strokeWidth="1.3" fill="none" />
        <circle cx="9.5" cy="9.5" r="1.5" fill="currentColor" />
      </g>
    ),
    megaphone: (
      <path d="M3.5 7.5H7L13 4V15L7 11.5H3.5V7.5ZM7 11.5V15.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    ),
    cog: (
      <g>
        <circle cx="9.5" cy="9.5" r="2.5" stroke="currentColor" strokeWidth="1.3" fill="none" />
        <path d="M9.5 3.5V5.5M9.5 13.5V15.5M3.5 9.5H5.5M13.5 9.5H15.5M5.4 5.4L6.8 6.8M12.2 12.2L13.6 13.6M13.6 5.4L12.2 6.8M6.8 12.2L5.4 13.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </g>
    ),
  }
  return (
    <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
      {paths[icon]}
    </svg>
  )
}
