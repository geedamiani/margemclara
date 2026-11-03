import { Mark } from '@/components/nova/mark';
import { ExposureBadge } from '@/components/nova/exposure-badge';
import { formatCurrency } from '@/lib/format';
import { cn } from '@/lib/format';
import { formatSignedBRL, formatSignedPercent } from '@/lib/nova-format';
import {
  exampleCarrier,
  exampleSummary,
  marginPercent,
  marginReais,
  rankedExampleClients,
  type PortfolioClient,
} from '@/lib/nova-portfolio';

function Sparkline({ values, negative }: { values: number[]; negative: boolean }) {
  const width = 76;
  const height = 22;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const points = values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * width;
      const y = height - ((value - min) / span) * (height - 2) - 1;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden
      className="overflow-visible"
    >
      <polyline
        fill="none"
        stroke={negative ? '#d97706' : '#18181b'}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        points={points}
      />
    </svg>
  );
}

function PercentPill({ value }: { value: number }) {
  const negative = value < 0;
  const thin = value >= 0 && value < 5;
  return (
    <span
      className={cn(
        'inline-flex min-w-[4.25rem] justify-center rounded px-2 py-0.5 text-[12px] font-medium tabular-nums',
        negative && 'bg-amber-50 text-amber-800',
        thin && 'bg-zinc-100 text-zinc-600',
        !negative && !thin && 'bg-emerald-50 text-emerald-800',
      )}
    >
      {formatSignedPercent(value)}
    </span>
  );
}

function ClientName({
  client,
  rank,
  showRank = false,
}: {
  client: PortfolioClient;
  rank: number;
  showRank?: boolean;
}) {
  return (
    <div className="min-w-0">
      <p className="text-[13px] font-medium text-zinc-900">
        {showRank && <span className="mr-2 font-mono text-[11px] text-zinc-400">{rank}</span>}
        {client.name}
      </p>
      {rank === 1 && (
        <a
          href="#dossie"
          className="mt-1 inline-flex text-[12px] font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
        >
          Abrir dossiê
        </a>
      )}
    </div>
  );
}

const navItems = [
  { label: 'Carteira', active: true },
  { label: 'Dossiês', active: false },
  { label: 'Reforma', active: false },
  { label: 'Importar', active: false },
];

export function PortfolioMock() {
  const clients = rankedExampleClients;

  return (
    <figure className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-[0_24px_70px_-36px_rgba(24,24,27,0.45)]">
      <figcaption className="flex items-center gap-3 border-b border-zinc-200 bg-zinc-50 px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-zinc-300" />
          <span className="size-2.5 rounded-full bg-zinc-300" />
          <span className="size-2.5 rounded-full bg-zinc-300" />
        </span>
        <span className="truncate text-[12px] text-zinc-500">carteira · clientes</span>
        <span className="ml-auto shrink-0 rounded border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-amber-800">
          Exemplo fictício
        </span>
      </figcaption>

      <div className="flex bg-[#fafafa]">
        <div aria-hidden className="hidden w-48 shrink-0 flex-col border-r border-zinc-200 bg-white xl:flex">
          <div className="flex items-center gap-2 px-4 pb-3 pt-5">
            <Mark size="sm" />
            <span className="text-[13px] font-semibold tracking-tight text-zinc-900">Margem Clara</span>
          </div>
          <div className="px-3 pb-3">
            <div className="rounded-lg px-2.5 py-2">
              <p className="truncate text-[13px] font-medium text-zinc-900">{exampleCarrier.name}</p>
              <p className="text-[11px] text-zinc-500">{exampleCarrier.trucks} caminhões</p>
            </div>
          </div>
          <ul className="space-y-0.5 px-3">
            {navItems.map((item) => (
              <li
                key={item.label}
                className={cn(
                  'rounded-lg px-2.5 py-2 text-[13px] font-medium',
                  item.active ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-500',
                )}
              >
                {item.label}
              </li>
            ))}
          </ul>
          <div className="mt-auto px-3 pb-4">
            <div className="rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-2">
              <p className="text-[11px] font-medium text-amber-800">Exemplo fictício</p>
              <p className="mt-0.5 text-[10px] leading-snug text-amber-700">
                Dados inventados para mostrar a tela.
              </p>
            </div>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="border-b border-amber-200 bg-amber-50 px-4 py-2.5 text-[12px] leading-relaxed text-amber-950 sm:px-5 xl:hidden">
            Exemplo fictício. {exampleCarrier.name} e estes clientes não existem.
          </div>

          <div className="px-4 py-5 sm:px-5">
            <p className="text-[12px] text-zinc-500">Carteira / Clientes</p>
            <div className="mt-1 flex flex-wrap items-end justify-between gap-2">
              <h3 className="text-lg font-semibold tracking-tight text-zinc-900">Clientes</h3>
              <p className="text-[12px] text-zinc-500">{exampleCarrier.period}</p>
            </div>
            <p className="mt-1 text-[13px] text-zinc-600">
              {exampleCarrier.name} · {exampleSummary.count} clientes · {exampleSummary.losingCount} com margem negativa
            </p>

            <div className="mt-5 grid grid-cols-1 gap-3 min-[420px]:grid-cols-3">
              <div className="rounded-xl border border-zinc-200 bg-white p-3.5">
                <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">Margem da carteira</p>
                <p className="mt-1 text-xl font-semibold tracking-tight text-zinc-900 tabular-nums">
                  {formatSignedBRL(exampleSummary.margin)}
                </p>
              </div>
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-3.5">
                <p className="text-[11px] font-medium uppercase tracking-wide text-amber-800">No prejuízo</p>
                <p className="mt-1 text-xl font-semibold tracking-tight text-amber-950 tabular-nums">
                  {exampleSummary.losingCount} de {exampleSummary.count}
                </p>
              </div>
              <div className="rounded-xl border border-zinc-200 bg-white p-3.5">
                <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">Pior cliente</p>
                <p className="mt-1 text-xl font-semibold tracking-tight text-amber-800 tabular-nums">
                  {formatSignedBRL(marginReais(exampleSummary.worst))}
                </p>
                <p className="mt-1 truncate text-[12px] text-zinc-600">{exampleSummary.worst.name}</p>
              </div>
            </div>

            <p className="mt-5 text-[12px] text-zinc-500">Ordenado pela margem, do prejuízo ao lucro.</p>

            <ol className="mt-3 divide-y divide-zinc-200 overflow-hidden rounded-xl border border-zinc-200 bg-white lg:hidden">
              {clients.map((client, index) => {
                const margin = marginReais(client);
                const percent = marginPercent(client);
                const negative = margin < 0;
                return (
                  <li key={client.id} className={cn('px-4 py-4', negative && 'bg-amber-50/40')}>
                    <ClientName client={client} rank={index + 1} showRank />
                    <p
                      className={cn(
                        'mt-2 text-lg font-semibold tabular-nums tracking-tight',
                        negative ? 'text-amber-800' : 'text-zinc-900',
                      )}
                    >
                      {formatSignedBRL(margin)}
                      <span className="ml-2 align-middle">
                        <PercentPill value={percent} />
                      </span>
                    </p>
                    <p className="mt-1.5 text-[12px] leading-relaxed text-zinc-600">
                      Receita {formatCurrency(client.receita)} · Custo {formatCurrency(client.custo)} · {client.viagens} fretes
                    </p>
                    <p className="mt-2 flex items-center gap-2 text-[12px] text-zinc-600">
                      Reforma
                      <ExposureBadge exposure={client.exposure} />
                    </p>
                  </li>
                );
              })}
            </ol>

            <div className="mt-3 hidden overflow-x-auto rounded-xl border border-zinc-200 bg-white lg:block">
              <table className="w-full min-w-[760px] border-collapse">
                <caption className="sr-only">
                  Exemplo fictício da carteira de {exampleCarrier.name}, ordenado pela margem, do prejuízo ao lucro.
                </caption>
                <thead>
                  <tr className="border-b border-zinc-100">
                    <th scope="col" className="px-4 py-3 text-left text-[11px] font-medium uppercase tracking-wide text-zinc-500">#</th>
                    <th scope="col" className="px-3 py-3 text-left text-[11px] font-medium uppercase tracking-wide text-zinc-500">Cliente</th>
                    <th scope="col" className="px-3 py-3 text-left text-[11px] font-medium uppercase tracking-wide text-zinc-500">
                      Tendência
                      <span className="sr-only"> nos últimos seis meses</span>
                    </th>
                    <th scope="col" className="px-3 py-3 text-right text-[11px] font-medium uppercase tracking-wide text-zinc-500">Receita</th>
                    <th scope="col" className="px-3 py-3 text-right text-[11px] font-medium uppercase tracking-wide text-zinc-500">Custo est.</th>
                    <th scope="col" className="px-3 py-3 text-right text-[11px] font-medium uppercase tracking-wide text-zinc-500">Margem</th>
                    <th scope="col" className="px-3 py-3 text-right text-[11px] font-medium uppercase tracking-wide text-zinc-500">% margem</th>
                    <th scope="col" className="px-4 py-3 text-left text-[11px] font-medium uppercase tracking-wide text-zinc-500">Reforma</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client, index) => {
                    const margin = marginReais(client);
                    const percent = marginPercent(client);
                    const negative = margin < 0;
                    return (
                      <tr key={client.id} className={cn('border-b border-zinc-50 last:border-0', negative && 'bg-amber-50/50')}>
                        <td className="px-4 py-3.5 font-mono text-[12px] text-zinc-400">{index + 1}</td>
                        <td className="px-3 py-3.5">
                          <ClientName client={client} rank={index + 1} />
                        </td>
                        <td className="px-3 py-3.5">
                          <Sparkline values={client.trend} negative={negative} />
                        </td>
                        <td className="px-3 py-3.5 text-right text-[13px] tabular-nums text-zinc-700">
                          {formatCurrency(client.receita)}
                        </td>
                        <td className="px-3 py-3.5 text-right text-[13px] tabular-nums text-zinc-500">
                          {formatCurrency(client.custo)}
                        </td>
                        <td
                          className={cn(
                            'px-3 py-3.5 text-right text-[13px] font-medium tabular-nums',
                            negative ? 'text-amber-800' : 'text-zinc-800',
                          )}
                        >
                          {formatSignedBRL(margin)}
                        </td>
                        <td className="px-3 py-3.5 text-right">
                          <PercentPill value={percent} />
                        </td>
                        <td className="px-4 py-3.5">
                          <ExposureBadge exposure={client.exposure} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}
