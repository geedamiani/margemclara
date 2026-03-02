'use client';

import { useState, useMemo } from 'react';
import { useCompany } from '@/lib/company-context';
import { formatCurrency, formatPercent, formatCurrencyPerKm, cn } from '@/lib/format';
import { PageHeader } from '@/components/page-header';
import { RouteDetailDrawer } from '@/components/route-detail-drawer';
import type { Route } from '@/lib/demo-data';
import { ArrowRight } from 'lucide-react';

type SortField = 'receita' | 'margemPercent' | 'viagens' | 'percentAbaixoPrecoMinimo';

export default function RotasPage() {
  const { data } = useCompany();
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [sortField, setSortField] = useState<SortField>('receita');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const routes = useMemo(() => {
    const sorted = [...data.routes];
    sorted.sort((a, b) => {
      const mul = sortDir === 'desc' ? -1 : 1;
      return (a[sortField] - b[sortField]) * mul;
    });
    return sorted;
  }, [data.routes, sortField, sortDir]);

  function toggleSort(field: SortField) {
    if (sortField === field) {
      setSortDir(d => d === 'desc' ? 'asc' : 'desc');
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  }

  const SortIndicator = ({ field }: { field: SortField }) => (
    <span className="text-[10px] text-zinc-300 ml-0.5">
      {sortField === field ? (sortDir === 'desc' ? '↓' : '↑') : ''}
    </span>
  );

  const negativeRoutes = data.routes.filter(r => r.margemPercent < 0).length;

  return (
    <div>
      <PageHeader
        title="Rotas"
        description={`${data.routes.length} rotas · ${negativeRoutes} com margem negativa`}
        breadcrumbs={[{ label: 'Visão Geral', href: '/' }, { label: 'Rotas' }]}
      />

      <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-100">
              <th className="text-left text-[11px] font-medium text-zinc-500 uppercase tracking-wide px-5 py-3">Rota</th>
              <th
                className="text-right text-[11px] font-medium text-zinc-500 uppercase tracking-wide px-5 py-3 cursor-pointer hover:text-zinc-700"
                onClick={() => toggleSort('viagens')}
              >
                Viagens <SortIndicator field="viagens" />
              </th>
              <th
                className="text-right text-[11px] font-medium text-zinc-500 uppercase tracking-wide px-5 py-3 cursor-pointer hover:text-zinc-700"
                onClick={() => toggleSort('receita')}
              >
                Receita <SortIndicator field="receita" />
              </th>
              <th
                className="text-right text-[11px] font-medium text-zinc-500 uppercase tracking-wide px-5 py-3 cursor-pointer hover:text-zinc-700"
                onClick={() => toggleSort('margemPercent')}
              >
                Margem <SortIndicator field="margemPercent" />
              </th>
              <th className="text-right text-[11px] font-medium text-zinc-500 uppercase tracking-wide px-5 py-3">R$/km</th>
              <th
                className="text-right text-[11px] font-medium text-zinc-500 uppercase tracking-wide px-5 py-3 cursor-pointer hover:text-zinc-700"
                onClick={() => toggleSort('percentAbaixoPrecoMinimo')}
              >
                Abaixo do mín. <SortIndicator field="percentAbaixoPrecoMinimo" />
              </th>
            </tr>
          </thead>
          <tbody>
            {routes.map((route) => (
              <tr
                key={route.id}
                onClick={() => setSelectedRoute(route)}
                className="border-b border-zinc-50 last:border-0 hover:bg-zinc-50 cursor-pointer transition-colors"
              >
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[13px] font-medium text-zinc-900">{route.origem}</span>
                    <ArrowRight size={12} className="text-zinc-300" />
                    <span className="text-[13px] font-medium text-zinc-900">{route.destino}</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-0.5">{route.distanciaKm} km</p>
                </td>
                <td className="px-5 py-3.5 text-right text-[13px] text-zinc-700 tabular-nums">
                  {route.viagens}
                </td>
                <td className="px-5 py-3.5 text-right text-[13px] text-zinc-700 tabular-nums">
                  {formatCurrency(route.receita)}
                </td>
                <td className="px-5 py-3.5 text-right">
                  <span className={cn(
                    'inline-block px-2 py-0.5 rounded text-[12px] font-medium tabular-nums',
                    route.margemPercent < 0
                      ? 'bg-amber-50 text-amber-700'
                      : 'bg-emerald-50 text-emerald-700',
                  )}>
                    {formatPercent(route.margemPercent)}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-right text-[13px] text-zinc-700 tabular-nums">
                  {formatCurrencyPerKm(route.reaisPerKm)}
                </td>
                <td className="px-5 py-3.5 text-right">
                  <span className={cn(
                    'text-[13px] tabular-nums',
                    route.percentAbaixoPrecoMinimo > 40 ? 'text-amber-700 font-medium' : 'text-zinc-500',
                  )}>
                    {route.percentAbaixoPrecoMinimo}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {routes.length === 0 && (
          <div className="px-5 py-12 text-center">
            <p className="text-[13px] text-zinc-400">Nenhuma rota com margem negativa encontrada.</p>
          </div>
        )}
      </div>

      {selectedRoute && (
        <RouteDetailDrawer
          route={selectedRoute}
          onClose={() => setSelectedRoute(null)}
        />
      )}
    </div>
  );
}
