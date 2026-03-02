'use client';

import { useCompany } from '@/lib/company-context';
import { PageHeader } from '@/components/page-header';

export default function ConfiguracoesPage() {
  const { data } = useCompany();

  return (
    <div>
      <PageHeader
        title="Configurações"
        description="Parâmetros gerais da empresa e do sistema"
        breadcrumbs={[{ label: 'Visão Geral', href: '/' }, { label: 'Configurações' }]}
      />

      <div className="space-y-6">
        {/* Empresa */}
        <section className="rounded-xl border border-zinc-200 bg-white p-6">
          <h2 className="text-[14px] font-semibold text-zinc-900 mb-4">Empresa</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-zinc-500 mb-1.5">Razão social</label>
              <input
                type="text"
                defaultValue={data.company.name}
                className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-[13px] text-zinc-900 bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-200"
                readOnly
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-zinc-500 mb-1.5">CNPJ</label>
              <input
                type="text"
                defaultValue={data.company.cnpj}
                className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-[13px] text-zinc-900 bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-200"
                readOnly
              />
            </div>
          </div>
        </section>

        {/* Parâmetros de custo */}
        <section className="rounded-xl border border-zinc-200 bg-white p-6">
          <h2 className="text-[14px] font-semibold text-zinc-900 mb-4">Parâmetros de custo</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-zinc-500 mb-1.5">Custo fixo mensal</label>
              <input
                type="text"
                defaultValue="R$ 185.000"
                className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-[13px] text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-200"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-zinc-500 mb-1.5">Custo motorista (mensal)</label>
              <input
                type="text"
                defaultValue="R$ 4.800"
                className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-[13px] text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-200"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-zinc-500 mb-1.5">Custo diesel (R$/litro)</label>
              <input
                type="text"
                defaultValue="R$ 6,12"
                className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-[13px] text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-200"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-zinc-500 mb-1.5">Consumo médio (km/litro)</label>
              <input
                type="text"
                defaultValue="2,8"
                className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-[13px] text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-200"
              />
            </div>
          </div>
        </section>

        {/* Meta de margem */}
        <section className="rounded-xl border border-zinc-200 bg-white p-6">
          <h2 className="text-[14px] font-semibold text-zinc-900 mb-4">Meta de margem</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-zinc-500 mb-1.5">Meta de margem mínima</label>
              <input
                type="text"
                defaultValue="12%"
                className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-[13px] text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-200"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-zinc-500 mb-1.5">Moeda</label>
              <select
                defaultValue="BRL"
                className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-[13px] text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-200"
              >
                <option value="BRL">BRL — Real brasileiro</option>
              </select>
            </div>
          </div>
        </section>

        {/* Save (visual only) */}
        <div className="flex justify-end">
          <button className="px-4 py-2 rounded-lg bg-zinc-900 text-white text-[13px] font-medium hover:bg-zinc-800 transition-colors">
            Salvar alterações
          </button>
        </div>
      </div>
    </div>
  );
}
