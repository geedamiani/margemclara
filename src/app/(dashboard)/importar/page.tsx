'use client';

import { useState } from 'react';
import { useCompany } from '@/lib/company-context';
import { PageHeader } from '@/components/page-header';
import { cn } from '@/lib/format';
import { Upload, FileSpreadsheet, Check, ChevronRight, AlertCircle, Loader2, X, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const steps = [
  { id: 1, label: 'Enviar planilha' },
  { id: 2, label: 'Mapear campos' },
  { id: 3, label: 'Prévia' },
  { id: 4, label: 'Concluir' },
];

const fieldMappings = [
  { source: 'cliente_nome', target: 'Cliente', confidence: 98, locked: false },
  { source: 'data_viagem', target: 'Data', confidence: 95, locked: false },
  { source: 'valor_frete', target: 'Receita (frete)', confidence: 92, locked: false },
  { source: 'km_percorrido', target: 'KM', confidence: 88, locked: false },
  { source: 'custo_diesel', target: 'Diesel', confidence: 85, locked: false },
  { source: 'valor_pedagio', target: 'Pedágio', confidence: 0, locked: true },
];

const targetOptions = ['Cliente', 'Data', 'Receita (frete)', 'KM', 'Diesel', 'Pedágio', 'Origem', 'Destino', 'Motorista', 'Placa', 'Ignorar'];

const previewRows = [
  { cliente: 'Distribuidora Norte Sul', data: '2025-01-05', frete: 'R$ 4.200', km: '580', diesel: 'R$ 1.850', pedagio: '—' },
  { cliente: 'Grupo Cargill Transportes', data: '2025-01-06', frete: 'R$ 3.800', km: '410', diesel: 'R$ 1.620', pedagio: '—' },
  { cliente: 'Atacadão Logística', data: '2025-01-07', frete: 'R$ 5.100', km: '880', diesel: 'R$ 2.200', pedagio: '—' },
  { cliente: 'Delta Log', data: '2025-01-08', frete: 'R$ 2.900', km: '580', diesel: 'R$ 1.780', pedagio: '—' },
  { cliente: 'Ambev Distribuição', data: '2025-01-09', frete: 'R$ 4.500', km: '650', diesel: 'R$ 1.920', pedagio: '—' },
  { cliente: 'Frete Express', data: '2025-01-10', frete: 'R$ 1.800', km: '', diesel: 'R$ 1.100', pedagio: '—' },
  { cliente: 'Rodoviário São Paulo', data: '2025-01-11', frete: 'R$ 3.200', km: '430', diesel: 'R$ 1.450', pedagio: '—' },
  { cliente: 'TransBrasil Carga', data: '2025-01-12', frete: 'R$ 2.600', km: '', diesel: 'R$ 1.280', pedagio: '—' },
  { cliente: 'Cooperativa Agrícola', data: '2025-01-13', frete: 'R$ 4.800', km: '920', diesel: 'R$ 2.050', pedagio: '—' },
  { cliente: 'Martins Atacado', data: '2025-01-14', frete: 'R$ 3.100', km: '', diesel: 'R$ 1.380', pedagio: '—' },
];

export default function ImportarPage() {
  const { data } = useCompany();
  const [step, setStep] = useState(1);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [mappings, setMappings] = useState(fieldMappings);
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);

  const fileName = `${data.company.shortName.toLowerCase().replace(/ /g, '_')}_operacao_jan-jun.xlsx`;

  function handleUpload() {
    setFileUploaded(true);
  }

  function handleNext() {
    if (step === 3) {
      setProcessing(true);
      setTimeout(() => {
        setProcessing(false);
        setDone(true);
        setStep(4);
      }, 2500);
    } else {
      setStep(s => s + 1);
    }
  }

  function handleBack() {
    setStep(s => Math.max(1, s - 1));
  }

  function updateMapping(index: number, target: string) {
    setMappings(prev => prev.map((m, i) => i === index ? { ...m, target } : m));
  }

  const overallConfidence = Math.round(
    mappings.filter(m => m.confidence > 0).reduce((s, m) => s + m.confidence, 0) /
    mappings.filter(m => m.confidence > 0).length
  );

  return (
    <div>
      <PageHeader
        title="Importar Dados"
        description="Envie uma planilha com os dados operacionais da sua transportadora"
        breadcrumbs={[{ label: 'Visão Geral', href: '/' }, { label: 'Importar Dados' }]}
      />

      {/* Stepper */}
      <div className="flex items-center gap-0 mb-8">
        {steps.map((s, i) => (
          <div key={s.id} className="flex items-center">
            <div className="flex items-center gap-2">
              <div className={cn(
                'w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-medium transition-colors',
                step > s.id ? 'bg-zinc-900 text-white' :
                step === s.id ? 'bg-zinc-900 text-white' :
                'bg-zinc-100 text-zinc-400',
              )}>
                {step > s.id ? <Check size={14} /> : s.id}
              </div>
              <span className={cn(
                'text-[13px] font-medium',
                step >= s.id ? 'text-zinc-900' : 'text-zinc-400',
              )}>
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={cn(
                'w-12 h-px mx-3',
                step > s.id ? 'bg-zinc-900' : 'bg-zinc-200',
              )} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="rounded-xl border border-zinc-200 bg-white">
        {/* Step 1: Upload */}
        {step === 1 && (
          <div className="p-8">
            {!fileUploaded ? (
              <div
                onClick={handleUpload}
                className="border-2 border-dashed border-zinc-200 rounded-xl p-12 text-center cursor-pointer hover:border-zinc-300 hover:bg-zinc-50 transition-colors"
              >
                <Upload size={32} className="text-zinc-300 mx-auto mb-4" />
                <p className="text-[14px] font-medium text-zinc-700 mb-1">Arraste sua planilha aqui</p>
                <p className="text-[12px] text-zinc-400">ou clique para selecionar · .xlsx, .csv</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-zinc-50 border border-zinc-200">
                  <FileSpreadsheet size={20} className="text-emerald-600" />
                  <div className="flex-1">
                    <p className="text-[13px] font-medium text-zinc-900">{fileName}</p>
                    <p className="text-[11px] text-zinc-400">248 KB · 1.247 linhas · 8 colunas</p>
                  </div>
                  <button
                    onClick={() => setFileUploaded(false)}
                    className="p-1 rounded hover:bg-zinc-200 transition-colors"
                  >
                    <X size={14} className="text-zinc-400" />
                  </button>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 text-white text-[13px] font-medium hover:bg-zinc-800 transition-colors"
                  >
                    Continuar
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Map Fields */}
        {step === 2 && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-[14px] font-semibold text-zinc-900">Mapeamento de campos</h3>
                <p className="text-[12px] text-zinc-500 mt-0.5">Confirme a correspondência entre as colunas da planilha e os campos do sistema</p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-[12px] font-medium text-emerald-700">Confiança do mapeamento: {overallConfidence}%</span>
              </div>
            </div>

            <div className="space-y-2 mb-6">
              {mappings.map((m, i) => (
                <div key={i} className="flex items-center gap-4 px-4 py-3 rounded-lg bg-zinc-50">
                  <div className="w-40">
                    <code className="text-[12px] text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded">{m.source}</code>
                  </div>
                  <ArrowRight size={14} className="text-zinc-300 flex-shrink-0" />
                  <div className="w-44">
                    <select
                      value={m.target}
                      onChange={(e) => updateMapping(i, e.target.value)}
                      className="w-full text-[13px] px-3 py-1.5 rounded-lg border border-zinc-200 bg-white focus:outline-none focus:ring-2 focus:ring-zinc-200"
                    >
                      {targetOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1" />
                  {m.confidence > 0 ? (
                    <span className={cn(
                      'text-[11px] font-medium px-2 py-0.5 rounded',
                      m.confidence >= 90 ? 'bg-emerald-50 text-emerald-600' :
                      m.confidence >= 80 ? 'bg-amber-50 text-amber-600' :
                      'bg-zinc-100 text-zinc-500',
                    )}>
                      {m.confidence}%
                    </span>
                  ) : (
                    <span className="text-[11px] text-zinc-300">opcional</span>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={handleBack}
                className="px-4 py-2 rounded-lg text-[13px] font-medium text-zinc-500 hover:text-zinc-700 transition-colors"
              >
                Voltar
              </button>
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 text-white text-[13px] font-medium hover:bg-zinc-800 transition-colors"
              >
                Continuar
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Preview */}
        {step === 3 && !processing && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-[14px] font-semibold text-zinc-900">Prévia dos dados</h3>
                <p className="text-[12px] text-zinc-500 mt-0.5">Verifique uma amostra dos dados antes de importar</p>
              </div>
            </div>

            {/* Warnings */}
            <div className="space-y-2 mb-5">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-50 border border-amber-200">
                <AlertCircle size={13} className="text-amber-500 flex-shrink-0" />
                <span className="text-[12px] text-amber-700">3 linhas sem KM — serão estimadas com base na rota</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-50 border border-amber-200">
                <AlertCircle size={13} className="text-amber-500 flex-shrink-0" />
                <span className="text-[12px] text-amber-700">2 clientes com nomes inconsistentes — &quot;TransBrasil Carga&quot; vs &quot;TransBrasil Cargas&quot;</span>
              </div>
            </div>

            {/* Preview table */}
            <div className="rounded-lg border border-zinc-200 overflow-x-auto mb-6">
              <table className="w-full text-[12px]">
                <thead>
                  <tr className="border-b border-zinc-100 bg-zinc-50">
                    <th className="text-left px-3 py-2 font-medium text-zinc-500">Cliente</th>
                    <th className="text-left px-3 py-2 font-medium text-zinc-500">Data</th>
                    <th className="text-right px-3 py-2 font-medium text-zinc-500">Frete</th>
                    <th className="text-right px-3 py-2 font-medium text-zinc-500">KM</th>
                    <th className="text-right px-3 py-2 font-medium text-zinc-500">Diesel</th>
                    <th className="text-right px-3 py-2 font-medium text-zinc-500">Pedágio</th>
                  </tr>
                </thead>
                <tbody>
                  {previewRows.map((row, i) => (
                    <tr key={i} className="border-b border-zinc-50 last:border-0">
                      <td className="px-3 py-2 text-zinc-700">{row.cliente}</td>
                      <td className="px-3 py-2 text-zinc-500">{row.data}</td>
                      <td className="px-3 py-2 text-right text-zinc-700 tabular-nums">{row.frete}</td>
                      <td className={cn('px-3 py-2 text-right tabular-nums', row.km ? 'text-zinc-700' : 'text-amber-500')}>
                        {row.km || '—'}
                      </td>
                      <td className="px-3 py-2 text-right text-zinc-700 tabular-nums">{row.diesel}</td>
                      <td className="px-3 py-2 text-right text-zinc-400">{row.pedagio}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-[11px] text-zinc-400 mb-5">Mostrando 10 de 1.247 linhas</p>

            <div className="flex items-center justify-between">
              <button
                onClick={handleBack}
                className="px-4 py-2 rounded-lg text-[13px] font-medium text-zinc-500 hover:text-zinc-700 transition-colors"
              >
                Voltar
              </button>
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 text-white text-[13px] font-medium hover:bg-zinc-800 transition-colors"
              >
                Importar dados
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3/4: Processing */}
        {processing && (
          <div className="p-12 text-center">
            <Loader2 size={32} className="text-zinc-400 mx-auto mb-4 animate-spin" />
            <p className="text-[14px] font-medium text-zinc-700 mb-1">Processando dados...</p>
            <p className="text-[12px] text-zinc-400">Validando, normalizando e calculando margens</p>
          </div>
        )}

        {/* Step 4: Done */}
        {step === 4 && done && (
          <div className="p-12 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
              <Check size={24} className="text-emerald-600" />
            </div>
            <h3 className="text-[16px] font-semibold text-zinc-900 mb-1">Dados importados com sucesso</h3>
            <p className="text-[13px] text-zinc-500 mb-6">1.247 registros processados · 18 clientes identificados · 10 rotas mapeadas</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-900 text-white text-[13px] font-medium hover:bg-zinc-800 transition-colors"
            >
              Ir para Visão Geral
              <ArrowRight size={14} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
