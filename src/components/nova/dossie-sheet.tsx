import { Mark } from '@/components/nova/mark';
import { formatCurrency } from '@/lib/format';
import { formatSignedBRL, formatSignedPercent } from '@/lib/nova-format';
import { reajusteParaMargem } from '@/lib/freight-margin';
import {
  EXAMPLE_TARGET_MARGIN,
  exampleCarrier,
  exampleSummary,
  marginPercent,
  marginReais,
} from '@/lib/nova-portfolio';

export function DossieSheet() {
  const client = exampleSummary.worst;
  const margin = marginReais(client);
  const percent = marginPercent(client);
  const reajuste = reajusteParaMargem(client.receita, client.custo, EXAMPLE_TARGET_MARGIN);
  const metaPercent = Math.round(EXAMPLE_TARGET_MARGIN * 100);

  return (
    <article className="overflow-hidden rounded-lg border border-zinc-300 bg-white shadow-[0_22px_50px_-28px_rgba(24,24,27,0.4)]">
      <header className="flex items-center justify-between gap-3 bg-zinc-900 px-5 py-4 text-white sm:px-6">
        <div className="flex items-center gap-2.5">
          <Mark size="sm" tone="light" />
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-zinc-400">Margem Clara</p>
            <p className="text-sm font-medium">Dossiê de Repasse</p>
          </div>
        </div>
        <p className="shrink-0 rounded border border-zinc-600 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-300">
          Exemplo
        </p>
      </header>

      <div className="px-5 py-6 sm:px-7 sm:py-8">
        <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-zinc-500">
          Para o comprador do frete
        </p>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900">{client.name}</h3>
        <dl className="mt-3 space-y-1 text-sm text-zinc-600">
          <div className="flex flex-wrap gap-x-2">
            <dt className="text-zinc-500">Transportadora</dt>
            <dd>{exampleCarrier.name} (exemplo)</dd>
          </div>
          <div className="flex flex-wrap gap-x-2">
            <dt className="text-zinc-500">Período</dt>
            <dd>{exampleCarrier.period}</dd>
          </div>
        </dl>

        <dl className="mt-8 divide-y divide-zinc-100 border-y border-zinc-100">
          <SheetRow term="Frete recebido no mês" value={formatCurrency(client.receita)} />
          <SheetRow term="Custo da operação" value={formatCurrency(client.custo)} />
          <SheetRow
            term="Margem"
            value={`${formatSignedBRL(margin)} (${formatSignedPercent(percent)})`}
            negative
          />
        </dl>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-zinc-200 p-4">
            <p className="text-[12px] font-medium uppercase tracking-wide text-zinc-500">Para empatar</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 tabular-nums">
              {reajuste.percentualEmpatar !== null ? formatSignedPercent(reajuste.percentualEmpatar) : 'n/d'}
            </p>
            <p className="mt-2 text-[13px] leading-relaxed text-zinc-600">
              O frete do mês sobe para {formatCurrency(reajuste.empatar)}. Só para sair do prejuízo.
            </p>
          </div>
          <div className="rounded-lg bg-zinc-900 p-4 text-white">
            <p className="text-[12px] font-medium uppercase tracking-wide text-zinc-400">
              Para margem de {metaPercent}%
            </p>
            <p className="mt-2 text-2xl font-semibold tracking-tight tabular-nums">
              {reajuste.percentualMeta !== null ? formatSignedPercent(reajuste.percentualMeta) : 'n/d'}
            </p>
            <p className="mt-2 text-[13px] leading-relaxed text-zinc-300">
              O frete do mês vai a {formatCurrency(reajuste.comMeta)}. Meta usada só neste exemplo.
            </p>
          </div>
        </div>

        <p className="mt-6 text-[12px] leading-relaxed text-zinc-500">
          PDF pronto para enviar por e-mail ou WhatsApp. Documento de exemplo, com números inventados.
          No produto, o arquivo sai com a marca da sua transportadora.
        </p>
      </div>
    </article>
  );
}

function SheetRow({
  term,
  value,
  negative = false,
}: {
  term: string;
  value: string;
  negative?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-3">
      <dt className="text-sm text-zinc-600">{term}</dt>
      <dd className={`text-right text-sm font-medium tabular-nums ${negative ? 'text-amber-800' : 'text-zinc-900'}`}>
        {value}
      </dd>
    </div>
  );
}
