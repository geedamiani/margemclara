'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/format';

export function MarketingHeader() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-zinc-900 flex items-center justify-center">
            <span className="text-white font-semibold text-xs">MC</span>
          </div>
          <span className="font-semibold text-zinc-900 text-[15px] tracking-tight">
            Margem Clara
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          <Link
            href="/calculadora"
            className={cn(
              'px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors',
              pathname === '/calculadora'
                ? 'text-zinc-900 bg-zinc-100'
                : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'
            )}
          >
            Calculadora
          </Link>
          <Link
            href="/acesso"
            className="ml-1 px-4 py-1.5 rounded-md text-[13px] font-medium bg-zinc-900 text-white hover:bg-zinc-800 transition-colors whitespace-nowrap"
          >
            Solicitar acesso
          </Link>
        </nav>
      </div>
    </header>
  );
}
