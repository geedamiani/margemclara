'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Mark } from '@/components/nova/mark';
import { TrialCta } from '@/components/nova/trial-cta';

const links = [
  { href: '#carteira', label: 'Carteira' },
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#dossie', label: 'Dossiê' },
  { href: '#reforma', label: 'Reforma' },
  { href: '#calculadora', label: 'Um frete' },
  { href: '#preco', label: 'Preço' },
];

export function NovaHeader() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;
    firstLinkRef.current?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  function close() {
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-[#fafafa]">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-3">
          <Link href="/nova" className="flex min-w-0 items-center gap-2.5 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900">
            <Mark />
            <span className="truncate text-[15px] font-semibold tracking-tight text-zinc-900 max-sm:sr-only">
              Margem Clara
            </span>
          </Link>

          <nav aria-label="Nesta página" className="hidden items-center gap-0.5 xl:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-md px-2.5 py-1.5 text-[13px] font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="sm:hidden">
              <TrialCta size="sm" />
            </div>
            <div className="hidden sm:block">
              <TrialCta />
            </div>
            <button
              ref={buttonRef}
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-lg text-zinc-800 hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 xl:hidden"
              aria-expanded={open}
              aria-controls="nova-menu"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X aria-hidden size={18} /> : <Menu aria-hidden size={18} />}
            </button>
          </div>
        </div>
      </div>

      <div
        id="nova-menu"
        className={open ? 'border-t border-zinc-200 xl:hidden' : 'hidden'}
      >
        <nav aria-label="Nesta página" className="mx-auto flex max-w-6xl flex-col px-3 py-2 sm:px-4">
          {links.map((link, index) => (
            <a
              key={link.href}
              ref={index === 0 ? firstLinkRef : undefined}
              href={link.href}
              onClick={close}
              className="flex min-h-11 items-center rounded-lg px-2 text-sm font-medium text-zinc-800 hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
