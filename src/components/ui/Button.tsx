'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'secondary-white';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-6 py-2 text-sm',
  md: 'px-8 py-3.5 text-sm',
  lg: 'px-10 py-4 text-base',
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-[#E07A5F] text-white border-2 border-[#E07A5F] hover:bg-[#C96A50] hover:border-[#C96A50] hover:-translate-y-0.5 hover:shadow-[0_16px_56px_rgba(12,79,106,0.18)] animate-pulse-glow hover:[animation:none]',
  secondary:
    'bg-transparent text-[#0C4F6A] border-2 border-[#0C4F6A] hover:bg-[#0C4F6A] hover:text-white hover:-translate-y-0.5',
  'secondary-white':
    'bg-transparent text-white border-2 border-white/70 hover:bg-white/15 hover:-translate-y-0.5',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  href,
  onClick,
  className,
  type = 'button',
  disabled,
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-full font-body font-semibold transition-all duration-300 cursor-pointer select-none',
    sizeClasses[size],
    variantClasses[variant],
    disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
