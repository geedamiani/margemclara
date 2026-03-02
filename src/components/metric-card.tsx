'use client';

import { cn } from '@/lib/format';

interface MetricCardProps {
  label: string;
  value: string;
  subtext?: string;
  trend?: 'up' | 'down' | 'neutral';
  variant?: 'default' | 'hero' | 'danger';
  className?: string;
}

export function MetricCard({ label, value, subtext, trend, variant = 'default', className }: MetricCardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border p-5',
        variant === 'hero' && 'border-zinc-900 bg-zinc-900',
        variant === 'danger' && 'border-amber-200 bg-amber-50',
        variant === 'default' && 'border-zinc-200 bg-white',
        className,
      )}
    >
      <p
        className={cn(
          'text-[12px] font-medium uppercase tracking-wide',
          variant === 'hero' ? 'text-zinc-400' : 'text-zinc-500',
        )}
      >
        {label}
      </p>
      <p
        className={cn(
          'text-2xl font-semibold mt-1 tracking-tight',
          variant === 'hero' && 'text-white',
          variant === 'danger' && 'text-amber-900',
          variant === 'default' && 'text-zinc-900',
        )}
      >
        {value}
      </p>
      {subtext && (
        <p
          className={cn(
            'text-[12px] mt-1.5',
            variant === 'hero' ? 'text-zinc-400' : 'text-zinc-500',
            trend === 'down' && variant !== 'hero' && 'text-amber-700',
          )}
        >
          {subtext}
        </p>
      )}
    </div>
  );
}
