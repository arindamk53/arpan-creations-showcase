import { cn } from '@/lib/utils';

interface SectionLabelProps {
  text: string;
  className?: string;
  variant?: 'default' | 'white';
}

export default function SectionLabel({ text, className, variant = 'default' }: SectionLabelProps) {
  return (
    <span
      className={cn(
        'font-body font-semibold text-xs tracking-widest uppercase',
        variant === 'default' ? 'text-[#C9A84C]' : 'text-white/70',
        className,
      )}
    >
      — {text} —
    </span>
  );
}
