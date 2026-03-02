'use client';

import { useState } from 'react';
import { useCompany } from '@/lib/company-context';
import { formatCurrency, formatPercent, cn } from '@/lib/format';
import { PageHeader } from '@/components/page-header';
import { MarginChart } from '@/components/margin-chart';
import { FileText, X, Download, Printer, AlertTriangle, TrendingDown, ArrowRight } from 'lucide-react';

type ReportType = 'financeiro' | 'risco' | 'rotas';

const reports = [
  {
    id: 'financeiro' as ReportType,
    title: 'Resumo financeiro mensal',
    description: 'Receita, custos e margens consolidadas por período',
    updated: 'Atualizado em Jun 2025',
  },
  {
    id: 'risco' as ReportType,
    title: 'Clientes com risco de prejuízo',
    description: 'Lista detalhada de clientes com margem negativa ou em queda',
    updated: 'Atualizado em Jun 2025',
  },
  {
    id: 'rotas' as ReportType,
    title: 'Rotas abaixo do preço mínimo',
    description: 'Análise de rotas com viagens abaixo do custo operacional',
    updated: 'Atualizado em Jun 2025',
  },
];

export default function RelatoriosPage() {
  const { data } = useCompany();
  const [activeReport, setActiveReport] = useState<ReportType | null>(null);

  return (
    <div>
      <PageHeader
        title="Relatórios"
        description="Relatórios analíticos gerados com base nos dados importados"
        breadcrumbs={[{ label: 'Visão Geral', href: '/' }, { label: 'Relatórios' }]}
      />

      {!activeReport ? (
        <div className="grid grid-cols-1 gap-3">
          {reports.map((report) => (
            <button
              key={report.id}
              onClick={() => setActiveReport(report.id)}
              className="flex items-center gap-4 px-5 py-4 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 transition-colors text-left"
            >
              <div className="w-10 h-10 rounded-lg bg-zinc-100 flex items-center justify-center flex-shrink-0">
                <FileText size={18} className="text-zinc-500" />
              </div>
              <div className="flex-1">
                <p className="text-[14px] font-medium text-zinc-900">{report.title}</p>
                <p className="text-[12px] text-zinc-500 mt-0.5">{report.description}</p>
              </div>
              <span className="text-[11px] text-zinc-400 flex-shrink-0">{report.updated}</span>
            </button>
          ))}
        </div>
      ) : (
        <div>
          {/* Report toolbar */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setActiveReport(null)}
              className="flex items-center gap-1.5 text-[13px] text-zinc-500 hover:text-zinc-700 transition-colors"
            >
              <X size={14} />
              Fechar relatório
            </button>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 text-[12px] text-zinc-600 hover:bg-zinc-50 transition-colors">
                <Printer size={13} />
                Imprimir
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 text-[12px] text-zinc-600 hover:bg-zinc-50 transition-colors">
                <Download size={13} />
                Exportar PDF
              </button>
            </div>
          </div>

          {/* Report Content */}
          <div className="rounded-xl border border-zinc-200 bg-white">
            {activeReport === 'financeiro' && (
              <div className="p-8">
                <div className="text-center mb-8 pb-6 border-b border-zinc-100">
                  <h2 className="text-lg font-semibold text-zinc-900">{data.company.name}</h2>
                  <p className="text-[13px] text-zinc-500 mt-1">Resumo Financeiro Mensal · Jan–Jun 2025</p>
                </div>

                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div>
                    <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-wide">Receita total</p>
                    <p className="text-xl font-semibold text-zinc-900 mt-1">
                      {formatCurrency(data.monthlyData.reduce((s, m) => s + m.receita, 0))}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-wide">Custo total</p>
                    <p className="text-xl font-semibold text-zinc-900 mt-1">
                      {formatCurrency(data.monthlyData.reduce((s, m) => s + m.custo, 0))}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-wide">Margem média</p>
                    <p className="text-xl font-semibold text-zinc-900 mt-1">{formatPercent(data.margemMediaGeral)}</p>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-[13px] font-semibold text-zinc-900 mb-3">Evolução da margem</h3>
                  <MarginChart data={data.monthlyData} height={200} />
                </div>

                <div>
                  <h3 className="text-[13px] font-semibold text-zinc-900 mb-3">Detalhamento mensal</h3>
                  <table className="w-full text-[12px]">
                    <thead>
                      <tr className="border-b border-zinc-100">
                        <th className="text-left py-2 font-medium text-zinc-500">Mês</th>
                        <th className="text-right py-2 font-medium text-zinc-500">Receita</th>
                        <th className="text-right py-2 font-medium text-zinc-500">Custo</th>
                        <th className="text-right py-2 font-medium text-zinc-500">Margem</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.monthlyData.map((m) => (
                        <tr key={m.month} className="border-b border-zinc-50">
                          <td className="py-2 text-zinc-700">{m.month} 2025</td>
                          <td className="py-2 text-right text-zinc-700 tabular-nums">{formatCurrency(m.receita)}</td>
                          <td className="py-2 text-right text-zinc-500 tabular-nums">{formatCurrency(m.custo)}</td>
                          <td className="py-2 text-right font-medium tabular-nums">{formatPercent(m.margem)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeReport === 'risco' && (
              <div className="p-8">
                <div className="text-center mb-8 pb-6 border-b border-zinc-100">
                  <h2 className="text-lg font-semibold text-zinc-900">{data.company.name}</h2>
                  <p className="text-[13px] text-zinc-500 mt-1">Clientes com Risco de Prejuízo · Jun 2025</p>
                </div>

                <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-amber-50 border border-amber-200 mb-6">
                  <AlertTriangle size={16} className="text-amber-600 flex-shrink-0" />
                  <p className="text-[13px] text-amber-800">
                    {data.clientesNegativos} de {data.totalClientes} clientes estão operando com margem negativa ({formatPercent(data.percentClientesNegativos)})
                  </p>
                </div>

                <div className="space-y-4">
                  {data.clients.filter(c => c.margemPercent < 0).map((client) => (
                    <div key={client.id} className="rounded-lg border border-zinc-200 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-[14px] font-medium text-zinc-900">{client.name}</h4>
                        <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 text-[12px] font-medium">
                          {formatPercent(client.margemPercent)}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-[12px]">
                        <div>
                          <span className="text-zinc-500">Receita:</span>
                          <span className="text-zinc-700 ml-1.5">{formatCurrency(client.receita)}</span>
                        </div>
                        <div>
                          <span className="text-zinc-500">Custo est.:</span>
                          <span className="text-zinc-700 ml-1.5">{formatCurrency(client.custoEstimado)}</span>
                        </div>
                        <div>
                          <span className="text-zinc-500">Prejuízo:</span>
                          <span className="text-amber-700 ml-1.5 font-medium">{formatCurrency(Math.abs(client.margem))}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {data.clients.filter(c => c.margemPercent < 0).length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-3">
                      <TrendingDown size={18} className="text-emerald-500" />
                    </div>
                    <p className="text-[13px] text-zinc-500">Nenhum cliente com margem negativa no período.</p>
                  </div>
                )}
              </div>
            )}

            {activeReport === 'rotas' && (
              <div className="p-8">
                <div className="text-center mb-8 pb-6 border-b border-zinc-100">
                  <h2 className="text-lg font-semibold text-zinc-900">{data.company.name}</h2>
                  <p className="text-[13px] text-zinc-500 mt-1">Rotas Abaixo do Preço Mínimo · Jun 2025</p>
                </div>

                <table className="w-full text-[12px]">
                  <thead>
                    <tr className="border-b border-zinc-100">
                      <th className="text-left py-2 font-medium text-zinc-500">Rota</th>
                      <th className="text-right py-2 font-medium text-zinc-500">Viagens</th>
                      <th className="text-right py-2 font-medium text-zinc-500">Margem</th>
                      <th className="text-right py-2 font-medium text-zinc-500">R$/km</th>
                      <th className="text-right py-2 font-medium text-zinc-500">% abaixo mín.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.routes
                      .filter(r => r.percentAbaixoPrecoMinimo > 15)
                      .sort((a, b) => b.percentAbaixoPrecoMinimo - a.percentAbaixoPrecoMinimo)
                      .map((route) => (
                        <tr key={route.id} className="border-b border-zinc-50">
                          <td className="py-2.5">
                            <span className="text-zinc-700">{route.origem}</span>
                            <span className="text-zinc-300 mx-1">→</span>
                            <span className="text-zinc-700">{route.destino}</span>
                          </td>
                          <td className="py-2.5 text-right text-zinc-700 tabular-nums">{route.viagens}</td>
                          <td className={cn(
                            'py-2.5 text-right font-medium tabular-nums',
                            route.margemPercent < 0 ? 'text-amber-700' : 'text-zinc-700',
                          )}>
                            {formatPercent(route.margemPercent)}
                          </td>
                          <td className="py-2.5 text-right text-zinc-700 tabular-nums">
                            R$ {route.reaisPerKm.toFixed(2).replace('.', ',')}
                          </td>
                          <td className="py-2.5 text-right">
                            <span className={cn(
                              'font-medium tabular-nums',
                              route.percentAbaixoPrecoMinimo > 40 ? 'text-amber-700' : 'text-zinc-600',
                            )}>
                              {route.percentAbaixoPrecoMinimo}%
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
