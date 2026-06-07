import CountUp from '@/components/animations/CountUp';
import { cn } from '@/lib/utils';

interface StatBadgeProps {
  target: number;
  suffix?: string;
  label: string;
  className?: string;
}

export default function StatBadge({ target, suffix = '', label, className }: StatBadgeProps) {
  return (
    <div className={cn('flex flex-col items-start', className)}>
      <p className="font-display text-5xl font-bold text-[#0C4F6A] leading-none">
        <CountUp target={target} suffix={suffix} />
      </p>
      <p className="font-body text-sm text-[#4A6572] mt-2">{label}</p>
    </div>
  );
}
