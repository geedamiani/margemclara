'use client';

import { useCompany } from '@/lib/company-context';
import { formatCurrency, formatPercent, formatCurrencyPerKm } from '@/lib/format';
import { PageHeader } from '@/components/page-header';
import { MetricCard } from '@/components/metric-card';
import { MarginChart } from '@/components/margin-chart';
import { AlertTriangle, TrendingDown, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function VisaoGeral() {
  const { data } = useCompany();

  return (
    <div>
      <PageHeader
        title="Visão Geral"
        description={`${data.company.name} · Jan–Jun 2025`}
      />

      {/* Hero + Secondary Metrics */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <MetricCard
          label="Clientes com margem negativa"
          value={`${data.percentClientesNegativos}%`}
          subtext={`${data.clientesNegativos} de ${data.totalClientes} clientes estão gerando prejuízo.`}
          variant="hero"
        />
        <MetricCard
          label="Custo real por km"
          value={formatCurrencyPerKm(data.custoRealPorKm)}
          subtext="Média ponderada do período"
        />
        <MetricCard
          label="Margem média geral"
          value={formatPercent(data.margemMediaGeral)}
          subtext="Jan–Jun 2025"
        />
        <MetricCard
          label="Receita mensal média"
          value={formatCurrency(data.faturamentoMensal)}
          subtext="Faturamento bruto"
        />
      </div>

      {/* Risks Section */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-zinc-900 mb-3">Principais riscos agora</h2>
        <div className="space-y-2">
          {data.risks.slice(0, 4).map((risk, i) => (
            <div
              key={i}
              className="flex items-start gap-3 px-4 py-3 rounded-lg border border-zinc-200 bg-white"
            >
              <div className="mt-0.5 flex-shrink-0">
                {risk.severity === 'high' ? (
                  <AlertTriangle size={14} className="text-amber-500" />
                ) : risk.severity === 'medium' ? (
                  <TrendingDown size={14} className="text-zinc-400" />
                ) : (
                  <TrendingDown size={14} className="text-zinc-300" />
                )}
              </div>
              <p className="text-[13px] text-zinc-700">{risk.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Margin Chart */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-zinc-900">Margem mensal</h2>
          <span className="text-[11px] text-zinc-400">Jan–Jun 2025</span>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-5">
          <MarginChart data={data.monthlyData} />
        </div>
      </div>

      {/* CTA */}
      {data.clientesNegativos > 0 && (
        <Link
          href="/clientes?filter=negativa"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-900 text-white text-[13px] font-medium hover:bg-zinc-800 transition-colors"
        >
          Ver clientes com prejuízo
          <ArrowRight size={14} />
        </Link>
      )}
    </div>
  );
}
