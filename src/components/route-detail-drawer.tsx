'use client';

import { X, Users } from 'lucide-react';
import { Route } from '@/lib/demo-data';
import { formatCurrency, formatPercent, formatCurrencyPerKm, cn } from '@/lib/format';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface RouteDetailDrawerProps {
  route: Route;
  onClose: () => void;
}

export function RouteDetailDrawer({ route, onClose }: RouteDetailDrawerProps) {
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];
  const trendData = route.margemTrend.map((v, i) => ({ month: months[i], margem: v }));
  const isNegative = route.margemPercent < 0;

  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-40" onClick={onClose} />
      <div className="fixed right-0 top-0 bottom-0 w-[480px] bg-white border-l border-zinc-200 z-50 overflow-y-auto shadow-xl">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-zinc-900">{route.origem} → {route.destino}</h2>
              <p className="text-[12px] text-zinc-500 mt-0.5">{route.distanciaKm} km · {route.viagens} viagens · Jan–Jun 2025</p>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-zinc-100 transition-colors">
              <X size={16} className="text-zinc-500" />
            </button>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="rounded-lg bg-zinc-50 p-3">
              <p className="text-[10px] font-medium text-zinc-500 uppercase tracking-wide">Margem</p>
              <p className={cn('text-lg font-semibold mt-0.5', isNegative ? 'text-amber-700' : 'text-zinc-900')}>
                {formatPercent(route.margemPercent)}
              </p>
            </div>
            <div className="rounded-lg bg-zinc-50 p-3">
              <p className="text-[10px] font-medium text-zinc-500 uppercase tracking-wide">R$/km</p>
              <p className="text-lg font-semibold text-zinc-900 mt-0.5">{formatCurrencyPerKm(route.reaisPerKm)}</p>
            </div>
            <div className="rounded-lg bg-zinc-50 p-3">
              <p className="text-[10px] font-medium text-zinc-500 uppercase tracking-wide">Receita</p>
              <p className="text-lg font-semibold text-zinc-900 mt-0.5">{formatCurrency(route.receita)}</p>
            </div>
          </div>

          {/* Below minimum */}
          <div className={cn(
            'rounded-lg p-4 mb-6',
            route.percentAbaixoPrecoMinimo > 30 ? 'bg-amber-50 border border-amber-200' : 'bg-zinc-50 border border-zinc-200',
          )}>
            <p className={cn(
              'text-[12px] font-medium',
              route.percentAbaixoPrecoMinimo > 30 ? 'text-amber-800' : 'text-zinc-700',
            )}>
              {route.percentAbaixoPrecoMinimo}% das viagens abaixo do preço mínimo
            </p>
          </div>

          {/* Margin Trend */}
          <div className="mb-6">
            <h3 className="text-[12px] font-semibold text-zinc-900 mb-3">Tendência de margem</h3>
            <div className="rounded-lg border border-zinc-200 p-4">
              <ResponsiveContainer width="100%" height={160}>
                <AreaChart data={trendData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#a1a1aa' }} dy={4} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#a1a1aa' }} tickFormatter={v => `${v}%`} width={36} />
                  <Tooltip
                    contentStyle={{ background: '#18181b', border: 'none', borderRadius: '8px', padding: '6px 10px', fontSize: '11px', color: '#fff' }}
                    formatter={(value) => [`${Number(value).toFixed(1)}%`, 'Margem']}
                  />
                  <defs>
                    <linearGradient id="routeGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={isNegative ? '#d97706' : '#18181b'} stopOpacity={0.15} />
                      <stop offset="100%" stopColor={isNegative ? '#d97706' : '#18181b'} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="margem"
                    stroke={isNegative ? '#d97706' : '#18181b'}
                    strokeWidth={2}
                    fill="url(#routeGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Period Comparison */}
          <div className="mb-6">
            <h3 className="text-[12px] font-semibold text-zinc-900 mb-3">Comparação por trimestre</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-zinc-200 p-3">
                <p className="text-[10px] font-medium text-zinc-500 uppercase tracking-wide">1º Tri (Jan–Mar)</p>
                <p className={cn(
                  'text-base font-semibold mt-1',
                  ((route.margemTrend[0] + route.margemTrend[1] + route.margemTrend[2]) / 3) < 0 ? 'text-amber-700' : 'text-zinc-900',
                )}>
                  {formatPercent((route.margemTrend[0] + route.margemTrend[1] + route.margemTrend[2]) / 3)}
                </p>
              </div>
              <div className="rounded-lg border border-zinc-200 p-3">
                <p className="text-[10px] font-medium text-zinc-500 uppercase tracking-wide">2º Tri (Abr–Jun)</p>
                <p className={cn(
                  'text-base font-semibold mt-1',
                  ((route.margemTrend[3] + route.margemTrend[4] + route.margemTrend[5]) / 3) < 0 ? 'text-amber-700' : 'text-zinc-900',
                )}>
                  {formatPercent((route.margemTrend[3] + route.margemTrend[4] + route.margemTrend[5]) / 3)}
                </p>
              </div>
            </div>
          </div>

          {/* Top Clients */}
          <div>
            <h3 className="text-[12px] font-semibold text-zinc-900 mb-3">Principais clientes nesta rota</h3>
            <div className="space-y-2">
              {route.topClients.map((client, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-50">
                  <Users size={12} className="text-zinc-400" />
                  <span className="text-[13px] text-zinc-700">{client}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
