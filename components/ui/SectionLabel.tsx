interface SectionLabelProps {
  children: string;
  variant?: 'blue' | 'white' | 'teal';
}

export default function SectionLabel({
  children,
  variant = 'blue',
}: SectionLabelProps) {
  const variants = {
    blue: 'bg-blue-50 border-blue-100 text-blue-700',
    white: 'bg-white/15 border-white/25 text-white',
    teal: 'bg-teal-50 border-teal-100 text-teal-700',
  };

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-5 ${variants[variant]}`}
    >
      <div
        className={`w-1.5 h-1.5 rounded-full ${
          variant === 'blue'
            ? 'bg-blue-500'
            : variant === 'teal'
            ? 'bg-teal-500'
            : 'bg-white'
        }`}
      />
      <span className="text-xs font-bold uppercase tracking-widest">
        {children}
      </span>
    </div>
  );
}
