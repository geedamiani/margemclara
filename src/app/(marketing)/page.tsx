'use client';

import { MarketingHeader } from '@/components/marketing-header';
import {
  ArrowRight,
  Calculator,
  TrendingDown,
  DollarSign,
  Route,
  Gauge,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

/* ─────────────────────────── Solution card data ─────────────────────────── */

const solutions = [
  {
    icon: DollarSign,
    title: 'Custo real por km',
    description:
      'Diesel, pedágio, manutenção e fixos consolidados em um número por km por veículo.',
  },
  {
    icon: TrendingDown,
    title: 'Margem por cliente',
    description:
      'Receita vs. custo real de cada cliente. Identifique quem gera lucro e quem gera prejuízo.',
  },
  {
    icon: Route,
    title: 'Margem por rota',
    description:
      'Performance financeira rota a rota. Saiba quais corredores sustentam sua operação.',
  },
  {
    icon: Gauge,
    title: 'Simulação de impacto',
    description:
      'Veja como variações de diesel, pedágio ou volume afetam sua margem antes de acontecer.',
  },
];

/* ─────────────────────────── Screenshots ────────────────────────────────── */

const screenshots = [
  {
    src: '/screenshot-dashboard.png',
    title: 'Visão geral',
    caption: 'KPIs, riscos e tendência de margem em um só painel.',
  },
  {
    src: '/screenshot-clientes.png',
    title: 'Clientes',
    caption: 'Margem individual com drill-down por cliente.',
  },
  {
    src: '/screenshot-simulacao.png',
    title: 'Simulação',
    caption: 'Teste cenários antes de tomar a decisão.',
  },
];

/* ─────────────────────────── Page ───────────────────────────────────────── */

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <MarketingHeader />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="pt-32 pb-4 px-6">
        <div className="max-w-3xl mx-auto text-center">
          {/* Pill */}
          <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
            <span className="text-[11px] font-medium text-zinc-500 tracking-wide uppercase">
              Entrada controlada
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-semibold text-zinc-900 tracking-tight leading-[1.1]">
            Inteligência financeira
            <br />
            para transportadoras.
          </h1>

          <p className="mt-5 text-lg text-zinc-500 max-w-xl mx-auto leading-relaxed">
            Clareza real de custo por km e margem por cliente{' '}
            antes da decisão.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/acesso"
              className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-800 transition-colors"
            >
              Solicitar acesso
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/calculadora"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-6 py-3 text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-colors"
            >
              <Calculator size={14} />
              Acessar calculadora técnica
            </Link>
          </div>
        </div>
      </section>

      {/* ── Hero Product Image ────────────────────────────────────────── */}
      <section className="pt-12 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-xl border border-zinc-200 bg-zinc-100 shadow-2xl shadow-zinc-900/10 overflow-hidden">
            <Image
              src="/screenshot-dashboard.png"
              alt="Painel da Margem Clara — visão geral com KPIs, riscos e margem mensal"
              width={1440}
              height={900}
              className="w-full h-auto"
              priority
            />
            {/* Subtle gradient fade at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/60 to-transparent pointer-events-none" />
          </div>
        </div>
      </section>

      {/* ── Problem ───────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-zinc-50 border-y border-zinc-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-zinc-900 tracking-tight">
            Você sabe exatamente quanto ganha por cliente?
          </h2>

          <ul className="mt-8 space-y-4">
            {[
              'Margem descoberta apenas no fechamento mensal.',
              'Diesel e custos variáveis corroem o resultado sem aviso.',
              'Clientes com boa receita podem gerar prejuízo.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-zinc-400 flex-shrink-0" />
                <span className="text-[15px] text-zinc-600 leading-relaxed">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Solution ──────────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-zinc-900 tracking-tight text-center">
            Uma camada analítica sobre sua operação.
          </h2>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {solutions.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.title}
                  className="rounded-xl border border-zinc-100 bg-white p-6 hover:border-zinc-200 transition-colors"
                >
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100">
                    <Icon size={16} className="text-zinc-600" />
                  </div>
                  <h3 className="text-[15px] font-medium text-zinc-900">
                    {s.title}
                  </h3>
                  <p className="mt-1.5 text-[13px] text-zinc-500 leading-relaxed">
                    {s.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Screenshots ───────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-zinc-50 border-y border-zinc-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold text-zinc-900 tracking-tight text-center">
            Visão clara, em segundos.
          </h2>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {screenshots.map((s) => (
              <div key={s.title} className="group">
                <div className="rounded-xl bg-white border border-zinc-200 overflow-hidden group-hover:border-zinc-300 transition-colors shadow-sm">
                  <Image
                    src={s.src}
                    alt={s.title}
                    width={1440}
                    height={900}
                    className="w-full h-auto"
                  />
                </div>
                <h3 className="mt-3 text-[14px] font-medium text-zinc-900">
                  {s.title}
                </h3>
                <p className="mt-0.5 text-[12px] text-zinc-500">{s.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
            <span className="text-[11px] font-medium text-zinc-500 tracking-wide uppercase">
              Acesso restrito
            </span>
          </div>
          <h2 className="text-2xl font-semibold text-zinc-900 tracking-tight">
            Iniciando com um grupo restrito de transportadoras.
          </h2>
          <p className="mt-3 text-sm text-zinc-500 leading-relaxed max-w-md mx-auto">
            A Margem Clara está abrindo acesso inicial para empresas selecionadas.
            Se sua transportadora busca previsibilidade financeira e decisões baseadas em dados, solicite acesso.
          </p>
          <div className="mt-8">
            <Link
              href="/acesso"
              className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-8 py-3 text-sm font-medium text-white hover:bg-zinc-800 transition-colors"
            >
              Solicitar acesso
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────── */}
      <footer className="border-t border-zinc-100 py-8 px-6">
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
