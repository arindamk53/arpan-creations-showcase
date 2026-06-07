import { cn } from '@/lib/utils';

interface TrustPillProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'white';
}

export default function TrustPill({ children, className, variant = 'default' }: TrustPillProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-body font-semibold text-xs rounded-full px-4 py-1.5',
        variant === 'default'
          ? 'bg-[#0C4F6A]/10 border border-[#0C4F6A]/15 text-[#0C4F6A]'
          : 'bg-white/15 border border-white/25 text-white',
        className,
      )}
    >
      {children}
    </span>
  );
}
