'use client';

import { useMemo, useState } from 'react';
import { freightResult, parseMoney } from '@/lib/freight-margin';
import { formatCurrencyDecimal } from '@/lib/format';
import { cn } from '@/lib/format';
import { formatPerKm, formatSignedBRL, formatSignedPercent } from '@/lib/nova-format';
import { TrialCta } from '@/components/nova/trial-cta';

interface Fields {
  frete: string;
  distancia: string;
  combustivel: string;
  pedagio: string;
  outros: string;
}

const comMargem: Fields = {
  frete: '4.800,00',
  distancia: '640',
  combustivel: '2.150,00',
  pedagio: '486,00',
  outros: '1.420,00',
};

const noPrejuizo: Fields = {
  frete: '3.200,00',
  distancia: '510',
  combustivel: '2.480,00',
  pedagio: '390,00',
  outros: '890,00',
};

const emptyFields: Fields = {
  frete: '',
  distancia: '',
  combustivel: '',
  pedagio: '',
  outros: '',
};

const inputClass =
  'w-full min-h-12 rounded-lg border border-zinc-300 bg-white px-3.5 text-base text-zinc-900 tabular-nums outline-none transition-colors placeholder:text-zinc-400 focus:border-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900';

export function FreightCalculator() {
  const [fields, setFields] = useState<Fields>(comMargem);

  const result = useMemo(
    () =>
      freightResult({
        frete: parseMoney(fields.frete),
        distanciaKm: parseMoney(fields.distancia),
        combustivel: parseMoney(fields.combustivel),
        pedagio: parseMoney(fields.pedagio),
        outros: parseMoney(fields.outros),
      }),
    [fields],
  );

  const preset =
    same(fields, comMargem) ? 'margem' : same(fields, noPrejuizo) ? 'prejuizo' : null;

  function set<K extends keyof Fields>(key: K, value: string) {
    setFields((current) => ({ ...current, [key]: value }));
  }

  const sentence = describe(result);
  const negative = result.margemReais < 0;
  const positive = result.margemReais > 0;

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
      <form
        className="rounded-2xl border border-zinc-200 bg-white p-5 sm:p-7"
        onSubmit={(event) => event.preventDefault()}
        aria-describedby="calculadora-ajuda"
      >
        <div className="flex flex-wrap gap-2" role="group" aria-label="Exemplos de frete">
          <PresetButton pressed={preset === 'margem'} onClick={() => setFields(comMargem)}>
            Frete com margem
          </PresetButton>
          <PresetButton pressed={preset === 'prejuizo'} onClick={() => setFields(noPrejuizo)}>
            Frete no prejuízo
          </PresetButton>
          <button
            type="button"
            onClick={() => setFields(emptyFields)}
            className="inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
          >
            Limpar
          </button>
        </div>
        <p id="calculadora-ajuda" className="mt-4 text-sm leading-relaxed text-zinc-600">
          Totais deste frete, em reais. O resultado muda enquanto você digita. Use vírgula nos centavos, como em 4.800,00.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Field
            id="nova-frete"
            label="Valor do frete"
            suffix="R$"
            value={fields.frete}
            onChange={(value) => set('frete', value)}
            autoComplete="off"
          />
          <Field
            id="nova-distancia"
            label="Distância"
            suffix="km"
            value={fields.distancia}
            onChange={(value) => set('distancia', value)}
            autoComplete="off"
          />
          <Field
            id="nova-combustivel"
            label="Combustível"
            suffix="R$"
            value={fields.combustivel}
            onChange={(value) => set('combustivel', value)}
            autoComplete="off"
          />
          <Field
            id="nova-pedagio"
            label="Pedágio"
            suffix="R$"
            value={fields.pedagio}
            onChange={(value) => set('pedagio', value)}
            autoComplete="off"
          />
          <div className="sm:col-span-2">
            <Field
              id="nova-outros"
              label="Outros custos"
              hint="Motorista, pneu, manutenção, o que você quiser atribuir a este frete."
              suffix="R$"
              value={fields.outros}
              onChange={(value) => set('outros', value)}
              autoComplete="off"
            />
          </div>
        </div>
      </form>

      <div className="rounded-2xl border border-zinc-200 bg-white p-5 sm:p-7 lg:sticky lg:top-24">
        <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-zinc-500">Resultado deste frete</p>
        <p
          aria-live="polite"
          className={cn(
            'mt-3 text-sm font-medium',
            negative && 'text-amber-800',
            positive && 'text-emerald-800',
            !negative && !positive && 'text-zinc-700',
          )}
        >
          {sentence}
        </p>

        <div className="mt-5 grid grid-cols-2 gap-4">
          <div>
            <p className="text-[12px] text-zinc-500">Margem</p>
            <p
              className={cn(
                'mt-1 text-3xl font-semibold tracking-tight tabular-nums',
                negative ? 'text-amber-800' : 'text-zinc-900',
              )}
            >
              {formatSignedBRL(result.margemReais, 2)}
            </p>
          </div>
          <div>
            <p className="text-[12px] text-zinc-500">Margem %</p>
            <p
              className={cn(
                'mt-1 text-3xl font-semibold tracking-tight tabular-nums',
                negative ? 'text-amber-800' : 'text-zinc-900',
              )}
            >
              {result.margemPercent === null ? (
                <span className="text-lg font-medium tracking-normal text-zinc-500">Informe o frete</span>
              ) : (
                formatSignedPercent(result.margemPercent)
              )}
            </p>
          </div>
        </div>

        <dl className="mt-6 space-y-2 border-t border-zinc-100 pt-4 text-sm">
          <ResultRow term="Valor do frete" value={formatCurrencyDecimal(result.frete)} />
          <ResultRow term="Combustível" value={formatCurrencyDecimal(result.combustivel)} />
          <ResultRow term="Pedágio" value={formatCurrencyDecimal(result.pedagio)} />
          <ResultRow term="Outros custos" value={formatCurrencyDecimal(result.outros)} />
          <ResultRow term="Custo do frete" value={formatCurrencyDecimal(result.custo)} strong />
        </dl>

        <p className="mt-4 text-[13px] leading-relaxed text-zinc-600">
          {result.margemPorKm === null
            ? 'Informe a distância para ver a margem por km deste frete.'
            : `Margem por km deste frete: ${formatPerKm(result.margemPorKm)}.`}
          {' '}
          Não é o custo por km da frota.
        </p>

        <div className="mt-6 border-t border-zinc-100 pt-5">
            <p className="text-sm leading-relaxed text-zinc-700">
            Um frete não mostra a carteira. No teste, a Margem Clara faz esta conta para cada cliente, a partir da planilha ou do XML do CT-e.
          </p>
          <div className="mt-4">
            <TrialCta className="w-full sm:w-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}

function describe(result: ReturnType<typeof freightResult>): string {
  if (result.frete <= 0 && result.custo <= 0) {
    return 'Informe o valor do frete para calcular a margem.';
  }
  if (result.margemPercent === null) {
    return `Margem de ${formatSignedBRL(result.margemReais, 2).replace(/^\+/, '')}. Informe o valor do frete para ver o percentual.`;
  }
  if (result.margemReais < 0) {
    return `Este frete está no prejuízo: ${formatCurrencyDecimal(Math.abs(result.margemReais))} a menos, ${formatPercentLabel(result.margemPercent)}.`;
  }
  if (result.margemReais > 0) {
    return `Este frete deixa margem de ${formatCurrencyDecimal(result.margemReais)}, ${formatPercentLabel(result.margemPercent)} do valor.`;
  }
  return 'Este frete empata. A margem é zero.';
}

function formatPercentLabel(value: number): string {
  return formatSignedPercent(value).replace(/^\+/, '');
}

function same(a: Fields, b: Fields): boolean {
  return (
    a.frete === b.frete &&
    a.distancia === b.distancia &&
    a.combustivel === b.combustivel &&
    a.pedagio === b.pedagio &&
    a.outros === b.outros
  );
}

function PresetButton({
  pressed,
  onClick,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(
        'inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900',
        pressed ? 'bg-zinc-900 text-white' : 'border border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-50',
      )}
    >
      {children}
    </button>
  );
}

function Field({
  id,
  label,
  hint,
  suffix,
  value,
  onChange,
  autoComplete,
}: {
  id: string;
  label: string;
  hint?: string;
  suffix: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
}) {
  const hintId = hint ? `${id}-hint` : undefined;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-zinc-800">
        {label}
        <span className="ml-1.5 font-normal text-zinc-500">({suffix})</span>
      </label>
      <input
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        inputMode="decimal"
        autoComplete={autoComplete}
        spellCheck={false}
        aria-describedby={hintId}
        className={inputClass}
      />
      {hint && (
        <p id={hintId} className="mt-1.5 text-[13px] leading-relaxed text-zinc-500">
          {hint}
        </p>
      )}
    </div>
  );
}

function ResultRow({ term, value, strong = false }: { term: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className={strong ? 'font-medium text-zinc-900' : 'text-zinc-600'}>{term}</dt>
      <dd className={cn('tabular-nums', strong ? 'font-medium text-zinc-900' : 'text-zinc-800')}>{value}</dd>
    </div>
  );
}
