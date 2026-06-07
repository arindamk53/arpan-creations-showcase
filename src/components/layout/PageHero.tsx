import KineticText from '@/components/animations/KineticText';
import { cn } from '@/lib/utils';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode; // for trust pills, breadcrumbs, etc.
  className?: string;
}

export default function PageHero({ title, subtitle, children, className }: PageHeroProps) {
  return (
    <section
      className={cn('relative min-h-[42vh] flex flex-col justify-end pb-0 overflow-hidden', className)}
      style={{
        background: 'linear-gradient(-45deg, #0C4F6A, #0E6688, #083848, #1A7A9A)',
        backgroundSize: '400% 400%',
        animation: 'gradient-shift 12s ease infinite',
      }}
    >
      {/* Decorative radial glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 60% at 70% 40%, rgba(26,122,154,0.35) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 w-full pt-20 sm:pt-32 pb-0 relative z-10">
        {/* Glass content card */}
        <div
          className="inline-flex flex-col gap-4 sm:gap-5 rounded-2xl sm:rounded-3xl px-6 py-6 sm:px-10 sm:py-8 mb-0 max-w-3xl"
          style={{
            background: 'rgba(255,255,255,0.07)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.14)',
            boxShadow: '0 8px 48px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.18)',
          }}
        >
          {/* shimmer top line */}
          <div
            aria-hidden="true"
            className="absolute top-0 left-10 w-48 h-px rounded-full"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }}
          />

          <KineticText
            text={title}
            delay={0.1}
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight"
          />

          {subtitle && (
            <p className="font-body text-sm sm:text-base text-white/70 leading-relaxed">{subtitle}</p>
          )}

          {children && (
            <div>{children}</div>
          )}
        </div>
      </div>

      {/* Bottom glass wave */}
      <div
        aria-hidden="true"
        className="h-8 flex-shrink-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(245,240,232,0.08) 100%)',
        }}
      />
    </section>
  );
}
