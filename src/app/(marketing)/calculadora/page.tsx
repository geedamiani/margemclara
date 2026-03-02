'use client';

import { useState, useMemo } from 'react';
import { MarketingHeader } from '@/components/marketing-header';
import { LeadForm } from '@/components/lead-form';
import { cn } from '@/lib/format';
import { ChevronDown, ArrowRight } from 'lucide-react';
import Link from 'next/link';

/* ─────────────────────────── Helpers ────────────────────────────────────── */

function formatBRL(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatBRLPerKm(value: number): string {
  return `R$ ${value.toFixed(2).replace('.', ',')}/km`;
}

/* ─────────────────────────── Input styling ──────────────────────────────── */

const inputBase =
  'w-full rounded-lg border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition-colors focus:border-zinc-400 focus:ring-1 focus:ring-zinc-200 tabular-nums';
const labelBase = 'block text-[13px] font-medium text-zinc-700 mb-1.5';

/* ─────────────────────────── Page ───────────────────────────────────────── */

export default function CalculadoraPage() {
  /* ── Form state ─────────────────────────────────────────────────── */
  const [dieselPrice, setDieselPrice] = useState<string>('6.30');
  const [kmPerLiter, setKmPerLiter] = useState<string>('2.8');
  const [monthlyKm, setMonthlyKm] = useState<string>('12000');
  const [fixedCost, setFixedCost] = useState<string>('8500');

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [tollMonthly, setTollMonthly] = useState<string>('');
  const [maintMonthly, setMaintMonthly] = useState<string>('');

  /* ── Parse inputs ───────────────────────────────────────────────── */
  function parseNum(value: string): number {
    const cleaned = value.replace(/\./g, '').replace(',', '.');
    return parseFloat(cleaned) || 0;
  }

  /* ── Calculations ───────────────────────────────────────────────── */
  const calc = useMemo(() => {
    const dp = parseNum(dieselPrice);
    const kpl = parseNum(kmPerLiter);
    const mkm = parseNum(monthlyKm);
    const fc = parseNum(fixedCost);
    const toll = parseNum(tollMonthly);
    const maint = parseNum(maintMonthly);

    if (kpl === 0 || mkm === 0) {
      return null;
    }

    const dieselPerKm = dp / kpl;
    const fixedPerKm = fc / mkm;
    const tollPerKm = toll > 0 ? toll / mkm : 0;
    const maintPerKm = maint > 0 ? maint / mkm : 0;

    const costPerKm = dieselPerKm + fixedPerKm + tollPerKm + maintPerKm;
    const minPrice = costPerKm / (1 - 0.12);

    return {
      dieselPerKm,
      fixedPerKm,
      tollPerKm,
      maintPerKm,
      costPerKm,
      minPrice,
      totalMonthly: costPerKm * mkm,
    };
  }, [dieselPrice, kmPerLiter, monthlyKm, fixedCost, tollMonthly, maintMonthly]);

  const hasResults = calc !== null;

  return (
    <div className="min-h-screen bg-white">
      <MarketingHeader />

      {/* ── Header ────────────────────────────────────────────────────── */}
      <section className="pt-28 pb-2 px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-[12px] text-zinc-400 hover:text-zinc-600 transition-colors mb-6"
          >
            ← Voltar
          </Link>
          <h1 className="text-3xl font-semibold text-zinc-900 tracking-tight">
            Calculadora técnica de custo por km
          </h1>
          <p className="mt-2 text-[15px] text-zinc-500 leading-relaxed max-w-xl">
            Estimativa rápida para entender seu custo real por km e seu preço mínimo sugerido.
          </p>
        </div>
      </section>

      {/* ── Calculator ────────────────────────────────────────────────── */}
      <section className="py-10 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* ── Inputs (3 cols) ─────────────────────────────────────── */}
            <div className="md:col-span-3">
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 space-y-5">
                <h3 className="text-[13px] font-semibold text-zinc-500 uppercase tracking-wider">
                  Parâmetros
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelBase}>Preço do diesel (R$/L)</label>
                    <input
                      type="text"
                      inputMode="decimal"
                      value={dieselPrice}
                      onChange={(e) => setDieselPrice(e.target.value)}
                      className={inputBase}
                    />
                  </div>
                  <div>
                    <label className={labelBase}>Consumo médio (km/L)</label>
                    <input
                      type="text"
                      inputMode="decimal"
                      value={kmPerLiter}
                      onChange={(e) => setKmPerLiter(e.target.value)}
                      className={inputBase}
                    />
                  </div>
                  <div>
                    <label className={labelBase}>KM médio por mês</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={monthlyKm}
                      onChange={(e) => setMonthlyKm(e.target.value)}
                      className={inputBase}
                    />
                  </div>
                  <div>
                    <label className={labelBase}>Custo fixo mensal (R$)</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={fixedCost}
                      onChange={(e) => setFixedCost(e.target.value)}
                      className={inputBase}
                    />
                  </div>
                </div>

                {/* ── Advanced toggle ──────────────────────────────────── */}
                <button
                  type="button"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex items-center gap-1.5 text-[13px] text-zinc-500 hover:text-zinc-700 transition-colors"
                >
                  <ChevronDown
                    size={14}
                    className={cn(
                      'transition-transform',
                      showAdvanced && 'rotate-180'
                    )}
                  />
                  Custos adicionais
                </button>

                {showAdvanced && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div>
                      <label className={labelBase}>
                        Pedágio médio mensal (R$)
                      </label>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={tollMonthly}
                        onChange={(e) => setTollMonthly(e.target.value)}
                        placeholder="0"
                        className={inputBase}
                      />
                    </div>
                    <div>
                      <label className={labelBase}>
                        Manutenção média mensal (R$)
                      </label>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={maintMonthly}
                        onChange={(e) => setMaintMonthly(e.target.value)}
                        placeholder="0"
                        className={inputBase}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ── Results (2 cols) ────────────────────────────────────── */}
            <div className="md:col-span-2">
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 space-y-5 sticky top-20">
                <h3 className="text-[13px] font-semibold text-zinc-500 uppercase tracking-wider">
                  Resultado
                </h3>

                {hasResults ? (
                  <>
                    {/* Primary result */}
                    <div className="rounded-xl bg-white border border-zinc-200 p-4">
                      <p className="text-[12px] text-zinc-500 mb-1">
                        Custo estimado por km
                      </p>
                      <p className="text-2xl font-semibold text-zinc-900 tabular-nums">
                        {formatBRLPerKm(calc.costPerKm)}
                      </p>
                    </div>

                    <div className="rounded-xl bg-zinc-900 text-white p-4">
                      <p className="text-[12px] text-zinc-400 mb-1">
                        Preço mínimo sugerido
                        <span className="text-zinc-500 ml-1">(margem 12%)</span>
                      </p>
                      <p className="text-2xl font-semibold tabular-nums">
                        {formatBRLPerKm(calc.minPrice)}
                      </p>
                    </div>

                    {/* Breakdown */}
                    <div className="space-y-2 pt-1">
                      <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                        Composição
                      </p>
                      <div className="space-y-1.5">
                        <Row label="Diesel" value={calc.dieselPerKm} />
                        <Row label="Custos fixos" value={calc.fixedPerKm} />
                        {calc.tollPerKm > 0 && (
                          <Row label="Pedágio" value={calc.tollPerKm} />
                        )}
                        {calc.maintPerKm > 0 && (
                          <Row label="Manutenção" value={calc.maintPerKm} />
                        )}
                        <div className="border-t border-zinc-200 pt-1.5 mt-1.5">
                          <Row
                            label="Total mensal estimado"
                            value={null}
                            display={formatBRL(calc.totalMonthly)}
                            bold
                          />
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-sm text-zinc-400">
                      Preencha os parâmetros para ver o resultado.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Lead capture CTA ──────────────────────────────────────────── */}
      <section className="py-16 px-6">
        <div className="max-w-xl mx-auto">
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-zinc-900 tracking-tight">
              Quer ver margem por cliente e por rota?
            </h3>
            <p className="mt-2 text-sm text-zinc-500 leading-relaxed mb-6">
              Solicite acesso à Margem Clara para análises completas com dados da sua operação.
            </p>
            <LeadForm source="calculadora" compact />
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
              href="/"
              className="text-[12px] text-zinc-400 hover:text-zinc-600 transition-colors"
            >
              Página inicial
            </Link>
            <a
              href="/acesso"
              className="text-[12px] text-zinc-400 hover:text-zinc-600 transition-colors"
            >
              Solicitar acesso
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ─────────────────────────── Row component ──────────────────────────────── */

function Row({
  label,
  value,
  display,
  bold,
}: {
  label: string;
  value: number | null;
  display?: string;
  bold?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span
        className={cn(
          'text-[13px]',
          bold ? 'font-medium text-zinc-900' : 'text-zinc-500'
        )}
      >
        {label}
      </span>
      <span
        className={cn(
          'text-[13px] tabular-nums',
          bold ? 'font-medium text-zinc-900' : 'text-zinc-700'
        )}
      >
        {display ?? `R$ ${(value ?? 0).toFixed(2).replace('.', ',')}/km`}
      </span>
    </div>
  );
}
