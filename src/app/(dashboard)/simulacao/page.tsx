'use client';

import { useState } from 'react';
import { useCompany } from '@/lib/company-context';
import { formatPercent, cn } from '@/lib/format';
import { getSimulationResult } from '@/lib/demo-data';
import { PageHeader } from '@/components/page-header';
import { AlertTriangle, Fuel, CircleDollarSign } from 'lucide-react';

export default function SimulacaoPage() {
  const { companyId, data } = useCompany();
  const [diesel, setDiesel] = useState(5);
  const [pedagio, setPedagio] = useState(0);
  const [autoReajuste, setAutoReajuste] = useState(false);

  const result = getSimulationResult(companyId, diesel, pedagio);
  const baseResult = getSimulationResult(companyId, 0, 0);
  const margemDelta = result.margemProjetada - baseResult.margemProjetada;

  return (
    <div>
      <PageHeader
        title="Simulação"
        description="Simule cenários de custo e veja o impacto na margem"
        breadcrumbs={[{ label: 'Visão Geral', href: '/' }, { label: 'Simulação' }]}
      />

      <div className="grid grid-cols-3 gap-6">
        {/* Controls */}
        <div className="col-span-1 space-y-6">
          {/* Diesel slider */}
          <div className="rounded-xl border border-zinc-200 bg-white p-5">
            <div className="flex items-center gap-2 mb-4">
              <Fuel size={16} className="text-zinc-500" />
              <h3 className="text-[13px] font-semibold text-zinc-900">Variação diesel</h3>
            </div>
            <div className="mb-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-semibold text-zinc-900">+{diesel}%</span>
              </div>
            </div>
            <input
              type="range"
              min={0}
              max={10}
              step={1}
              value={diesel}
              onChange={(e) => setDiesel(Number(e.target.value))}
              className="w-full accent-zinc-900"
            />
            <div className="flex items-center justify-between text-[10px] text-zinc-400 mt-1">
              <span>0%</span>
              <span>+10%</span>
            </div>
          </div>

          {/* Pedágio slider */}
          <div className="rounded-xl border border-zinc-200 bg-white p-5">
            <div className="flex items-center gap-2 mb-4">
              <CircleDollarSign size={16} className="text-zinc-500" />
              <h3 className="text-[13px] font-semibold text-zinc-900">Variação pedágio</h3>
            </div>
            <div className="mb-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-semibold text-zinc-900">+{pedagio}%</span>
              </div>
            </div>
            <input
              type="range"
              min={0}
              max={10}
              step={1}
              value={pedagio}
              onChange={(e) => setPedagio(Number(e.target.value))}
              className="w-full accent-zinc-900"
            />
            <div className="flex items-center justify-between text-[10px] text-zinc-400 mt-1">
              <span>0%</span>
              <span>+10%</span>
            </div>
          </div>

          {/* Auto reajuste toggle */}
          <div className="rounded-xl border border-zinc-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[13px] font-medium text-zinc-900">Aplicar reajuste automático</p>
                <p className="text-[11px] text-zinc-400 mt-0.5">Repassa variação proporcional ao frete</p>
              </div>
              <button
                onClick={() => setAutoReajuste(!autoReajuste)}
                className={cn(
                  'w-10 h-5 rounded-full transition-colors relative',
                  autoReajuste ? 'bg-zinc-900' : 'bg-zinc-200',
                )}
              >
                <span className={cn(
                  'absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform shadow-sm',
                  autoReajuste ? 'left-[22px]' : 'left-0.5',
                )} />
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="col-span-2 space-y-4">
          {/* Big result */}
          <div className="rounded-xl border border-zinc-200 bg-white p-6">
            <p className="text-[12px] font-medium text-zinc-500 uppercase tracking-wide mb-2">Margem média projetada</p>
            <div className="flex items-baseline gap-3">
              <span className={cn(
                'text-4xl font-semibold tracking-tight',
                result.margemProjetada < 0 ? 'text-amber-700' : 'text-zinc-900',
              )}>
                {formatPercent(result.margemProjetada)}
              </span>
              <span className={cn(
                'text-[13px] font-medium',
                margemDelta < 0 ? 'text-amber-600' : 'text-zinc-400',
              )}>
                {margemDelta < 0 ? '' : '+'}{margemDelta.toFixed(1).replace('.', ',')}pp vs. atual
              </span>
            </div>
          </div>

          {/* Additional risk clients */}
          {result.clientesAdicionaisRisco > 0 && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle size={14} className="text-amber-600" />
                <p className="text-[13px] font-semibold text-amber-800">
                  {result.clientesAdicionaisRisco} cliente{result.clientesAdicionaisRisco > 1 ? 's' : ''} adiciona{result.clientesAdicionaisRisco > 1 ? 'is' : 'l'} passa{result.clientesAdicionaisRisco > 1 ? 'm' : ''} a operar com margem negativa
                </p>
              </div>
              <p className="text-[12px] text-amber-700 mb-3">
                Neste cenário, {data.clientesNegativos + result.clientesAdicionaisRisco} de {data.totalClientes} clientes estariam com margem negativa ({formatPercent(((data.clientesNegativos + result.clientesAdicionaisRisco) / data.totalClientes) * 100)}).
              </p>
            </div>
          )}

          {/* Risk clients list */}
          {result.clientesRisco.length > 0 && (
            <div className="rounded-xl border border-zinc-200 bg-white p-5">
              <h3 className="text-[12px] font-semibold text-zinc-900 mb-3">Clientes que viram risco com este cenário</h3>
              <div className="space-y-2">
                {result.clientesRisco.map((name, i) => (
                  <div key={i} className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-zinc-50">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                    <span className="text-[13px] text-zinc-700">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {result.clientesAdicionaisRisco === 0 && (
            <div className="rounded-xl border border-zinc-200 bg-white p-5">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <p className="text-[13px] text-zinc-600">Nenhum cliente adicional entra em risco neste cenário.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
