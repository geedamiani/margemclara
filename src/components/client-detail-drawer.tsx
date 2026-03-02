'use client';

import { X, MapPin } from 'lucide-react';
import { Client } from '@/lib/demo-data';
import { formatCurrency, formatPercent, formatCurrencyPerKm, cn } from '@/lib/format';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Cell } from 'recharts';

interface ClientDetailDrawerProps {
  client: Client;
  onClose: () => void;
}

export function ClientDetailDrawer({ client, onClose }: ClientDetailDrawerProps) {
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];
  const trendData = client.margemTrend.map((v, i) => ({ month: months[i], margem: v }));
  const isNegative = client.margemPercent < 0;

  const barData = [
    { label: 'Receita', value: client.receita, color: '#18181b' },
    { label: 'Custo', value: client.custoEstimado, color: '#a1a1aa' },
  ];

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/20 z-40" onClick={onClose} />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 w-[480px] bg-white border-l border-zinc-200 z-50 overflow-y-auto shadow-xl">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-zinc-900">{client.name}</h2>
              <p className="text-[12px] text-zinc-500 mt-0.5">{client.viagens} viagens · Jan–Jun 2025</p>
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
                {formatPercent(client.margemPercent)}
              </p>
            </div>
            <div className="rounded-lg bg-zinc-50 p-3">
              <p className="text-[10px] font-medium text-zinc-500 uppercase tracking-wide">Receita</p>
              <p className="text-lg font-semibold text-zinc-900 mt-0.5">{formatCurrency(client.receita)}</p>
            </div>
            <div className="rounded-lg bg-zinc-50 p-3">
              <p className="text-[10px] font-medium text-zinc-500 uppercase tracking-wide">Custo est.</p>
              <p className="text-lg font-semibold text-zinc-900 mt-0.5">{formatCurrency(client.custoEstimado)}</p>
            </div>
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
                    <linearGradient id="marginGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={isNegative ? '#d97706' : '#18181b'} stopOpacity={0.15} />
                      <stop offset="100%" stopColor={isNegative ? '#d97706' : '#18181b'} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="margem"
                    stroke={isNegative ? '#d97706' : '#18181b'}
                    strokeWidth={2}
                    fill="url(#marginGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Revenue vs Cost */}
          <div className="mb-6">
            <h3 className="text-[12px] font-semibold text-zinc-900 mb-3">Receita vs Custo</h3>
            <div className="rounded-lg border border-zinc-200 p-4">
              <ResponsiveContainer width="100%" height={100}>
                <BarChart data={barData} layout="vertical" margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="label" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#71717a' }} width={52} />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                    {barData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="flex items-center justify-between mt-2 text-[11px] text-zinc-500">
                <span>R$ 0</span>
                <span>{formatCurrency(Math.max(client.receita, client.custoEstimado))}</span>
              </div>
            </div>
          </div>

          {/* Top Routes */}
          <div className="mb-6">
            <h3 className="text-[12px] font-semibold text-zinc-900 mb-3">Principais rotas</h3>
            <div className="space-y-2">
              {client.topRoutes.map((route, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-50">
                  <MapPin size={12} className="text-zinc-400" />
                  <span className="text-[13px] text-zinc-700">{route}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendation */}
          <div className="rounded-lg border border-zinc-200 p-4">
            <h3 className="text-[12px] font-semibold text-zinc-900 mb-2">Recomendação</h3>
            {isNegative ? (
              <>
                <p className="text-[13px] text-zinc-600">
                  Este cliente está operando com margem negativa. Considere renegociar o frete ou revisar os custos operacionais para este perfil de carga.
                </p>
                <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-50 border border-amber-200">
                  <p className="text-[12px] text-amber-800 font-medium">
                    Preço mínimo sugerido: {formatCurrencyPerKm(client.precoMinimoSugerido)}
                  </p>
                </div>
              </>
            ) : (
              <>
                <p className="text-[13px] text-zinc-600">
                  Cliente com margem saudável. Mantenha o monitoramento e acompanhe variações no custo de diesel para preservar a rentabilidade.
                </p>
                <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-50">
                  <p className="text-[12px] text-zinc-600 font-medium">
                    Preço mínimo sugerido: {formatCurrencyPerKm(client.precoMinimoSugerido)}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
