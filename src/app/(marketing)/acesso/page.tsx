'use client';

import { MarketingHeader } from '@/components/marketing-header';
import { LeadForm } from '@/components/lead-form';
import Link from 'next/link';

export default function AcessoPage() {
  return (
    <div className="min-h-screen bg-white">
      <MarketingHeader />

      <section className="pt-28 pb-20 px-6">
        <div className="max-w-xl mx-auto">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-[12px] text-zinc-400 hover:text-zinc-600 transition-colors mb-8"
          >
            ← Voltar
          </Link>

          {/* Header */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
              <span className="text-[11px] font-medium text-zinc-500 tracking-wide uppercase">
                Entrada controlada
              </span>
            </div>
            <h1 className="text-3xl font-semibold text-zinc-900 tracking-tight">
              Solicitar acesso
            </h1>
            <p className="mt-3 text-[15px] text-zinc-500 leading-relaxed">
              A Margem Clara está abrindo acesso inicial para empresas selecionadas.
              Preencha os dados abaixo e entraremos em contato quando houver disponibilidade.
            </p>
          </div>

          {/* Form */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-sm">
            <LeadForm source="landing" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-100 py-8 px-6 mt-auto">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-zinc-900 flex items-center justify-center">
              <span className="text-white font-semibold text-[8px]">MC</span>
            </div>
            <span className="text-[12px] text-zinc-400">
              © {new Date().getFullYear()} Margem Clara
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/calculadora"
              className="text-[12px] text-zinc-400 hover:text-zinc-600 transition-colors"
            >
              Calculadora técnica
            </Link>
            <Link
              href="/painel"
              className="text-[12px] text-zinc-400 hover:text-zinc-600 transition-colors"
            >
              Demo
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
