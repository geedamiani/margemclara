import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/format';

const base =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-lg py-2.5 font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2';

export function TrialCta({
  className,
  tone = 'dark',
  size = 'md',
}: {
  className?: string;
  tone?: 'dark' | 'light';
  size?: 'sm' | 'md';
}) {
  return (
    <Link
      href="/acesso"
      className={cn(
        base,
        size === 'sm' ? 'px-3 text-[13px]' : 'px-5 text-sm',
        tone === 'dark'
          ? 'bg-zinc-900 text-white hover:bg-zinc-800 focus-visible:outline-zinc-900'
          : 'bg-white text-zinc-900 hover:bg-zinc-100 focus-visible:outline-white',
        className,
      )}
    >
      Começar teste grátis
      <ArrowRight aria-hidden size={16} />
    </Link>
  );
}

export function SecondaryAnchor({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        base,
        'border border-zinc-300 bg-white px-5 text-sm text-zinc-900 hover:bg-zinc-50 focus-visible:outline-zinc-900',
        className,
      )}
    >
      {children}
    </a>
  );
}
