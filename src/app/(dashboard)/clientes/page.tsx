'use client';

import { Suspense, useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCompany } from '@/lib/company-context';
import { formatCurrency, formatPercent, cn } from '@/lib/format';
import { PageHeader } from '@/components/page-header';
import { ClientDetailDrawer } from '@/components/client-detail-drawer';
import { SmallTrendChart } from '@/components/margin-chart';
import { Search, X } from 'lucide-react';
import type { Client } from '@/lib/demo-data';

type FilterType = 'todos' | 'negativa' | 'top-receita' | 'maior-risco';

const filterLabels: Record<FilterType, string> = {
  todos: 'Todos',
  negativa: 'Margem negativa',
  'top-receita': 'Top receita',
  'maior-risco': 'Maior risco',
};

function ClientesContent() {
  const { data } = useCompany();
  const searchParams = useSearchParams();
  const initialFilter = (searchParams.get('filter') as FilterType) || 'todos';
  const [filter, setFilter] = useState<FilterType>(initialFilter);
  const [search, setSearch] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [sortField, setSortField] = useState<'receita' | 'margemPercent' | 'viagens'>('receita');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const filtered = useMemo(() => {
    let clients = [...data.clients];

    if (search) {
      const q = search.toLowerCase();
      clients = clients.filter(c => c.name.toLowerCase().includes(q));
    }

    switch (filter) {
      case 'negativa':
        clients = clients.filter(c => c.margemPercent < 0);
        break;
      case 'top-receita':
        clients = clients.sort((a, b) => b.receita - a.receita).slice(0, 5);
        break;
      case 'maior-risco':
        clients = clients.sort((a, b) => a.margemPercent - b.margemPercent).slice(0, 5);
        break;
    }

    clients.sort((a, b) => {
      const mul = sortDir === 'desc' ? -1 : 1;
      return (a[sortField] - b[sortField]) * mul;
    });

    return clients;
  }, [data.clients, filter, search, sortField, sortDir]);

  function toggleSort(field: typeof sortField) {
    if (sortField === field) {
      setSortDir(d => d === 'desc' ? 'asc' : 'desc');
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  }

  const SortIndicator = ({ field }: { field: typeof sortField }) => (
    <span className="text-[10px] text-zinc-300 ml-0.5">
      {sortField === field ? (sortDir === 'desc' ? '↓' : '↑') : ''}
    </span>
  );

  return (
    <div>
      <PageHeader
        title="Clientes"
        description={`${data.totalClientes} clientes · ${data.clientesNegativos} com margem negativa`}
        breadcrumbs={[{ label: 'Visão Geral', href: '/' }, { label: 'Clientes' }]}
      />

      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-1.5">
          {(Object.keys(filterLabels) as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors',
                filter === f
                  ? 'bg-zinc-900 text-white'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200',
              )}
            >
              {filterLabels[f]}
            </button>
          ))}
        </div>
        <div className="flex-1" />
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Buscar cliente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 pr-8 py-1.5 rounded-lg border border-zinc-200 text-[13px] w-56 focus:outline-none focus:ring-2 focus:ring-zinc-200 bg-white"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-2.5 top-1/2 -translate-y-1/2">
              <X size={12} className="text-zinc-400" />
            </button>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-100">
              <th className="text-left text-[11px] font-medium text-zinc-500 uppercase tracking-wide px-5 py-3">Cliente</th>
              <th className="text-left text-[11px] font-medium text-zinc-500 uppercase tracking-wide px-5 py-3">Tendência</th>
              <th
                className="text-right text-[11px] font-medium text-zinc-500 uppercase tracking-wide px-5 py-3 cursor-pointer hover:text-zinc-700"
                onClick={() => toggleSort('receita')}
              >
                Receita <SortIndicator field="receita" />
              </th>
              <th className="text-right text-[11px] font-medium text-zinc-500 uppercase tracking-wide px-5 py-3">Custo est.</th>
              <th className="text-right text-[11px] font-medium text-zinc-500 uppercase tracking-wide px-5 py-3">Margem</th>
              <th
                className="text-right text-[11px] font-medium text-zinc-500 uppercase tracking-wide px-5 py-3 cursor-pointer hover:text-zinc-700"
                onClick={() => toggleSort('margemPercent')}
              >
                % Margem <SortIndicator field="margemPercent" />
              </th>
              <th
                className="text-right text-[11px] font-medium text-zinc-500 uppercase tracking-wide px-5 py-3 cursor-pointer hover:text-zinc-700"
                onClick={() => toggleSort('viagens')}
              >
                Viagens <SortIndicator field="viagens" />
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((client) => (
              <tr
                key={client.id}
                onClick={() => setSelectedClient(client)}
                className="border-b border-zinc-50 last:border-0 hover:bg-zinc-50 cursor-pointer transition-colors"
              >
                <td className="px-5 py-3.5">
                  <span className="text-[13px] font-medium text-zinc-900">{client.name}</span>
                </td>
                <td className="px-5 py-3.5 w-24">
                  <SmallTrendChart data={client.margemTrend} negative={client.margemPercent < 0} />
                </td>
                <td className="px-5 py-3.5 text-right text-[13px] text-zinc-700 tabular-nums">
                  {formatCurrency(client.receita)}
                </td>
                <td className="px-5 py-3.5 text-right text-[13px] text-zinc-500 tabular-nums">
                  {formatCurrency(client.custoEstimado)}
                </td>
                <td className={cn(
                  'px-5 py-3.5 text-right text-[13px] tabular-nums font-medium',
                  client.margem < 0 ? 'text-amber-700' : 'text-zinc-700',
                )}>
                  {formatCurrency(client.margem)}
                </td>
                <td className="px-5 py-3.5 text-right">
                  <span className={cn(
                    'inline-block px-2 py-0.5 rounded text-[12px] font-medium tabular-nums',
                    client.margemPercent < 0
                      ? 'bg-amber-50 text-amber-700'
                      : client.margemPercent < 5
                        ? 'bg-zinc-100 text-zinc-600'
                        : 'bg-emerald-50 text-emerald-700',
                  )}>
                    {formatPercent(client.margemPercent)}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-right text-[13px] text-zinc-500 tabular-nums">
                  {client.viagens}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="px-5 py-12 text-center">
            <p className="text-[13px] text-zinc-400">Nenhum cliente encontrado.</p>
          </div>
        )}
      </div>

      {selectedClient && (
        <ClientDetailDrawer
          client={selectedClient}
          onClose={() => setSelectedClient(null)}
        />
      )}
    </div>
  );
}

export default function ClientesPage() {
  return (
    <Suspense>
      <ClientesContent />
    </Suspense>
  );
}
