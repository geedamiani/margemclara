import Link from 'next/link';
import { DossieSheet } from '@/components/nova/dossie-sheet';
import { ExposureBadge } from '@/components/nova/exposure-badge';
import { FreightCalculator } from '@/components/nova/freight-calculator';
import { Mark } from '@/components/nova/mark';
import { NovaHeader } from '@/components/nova/nova-header';
import { PortfolioMock } from '@/components/nova/portfolio-mock';
import { SecondaryAnchor, TrialCta } from '@/components/nova/trial-cta';
import { formatSignedBRL, formatSignedPercent } from '@/lib/nova-format';
import {
  clientsByExposure,
  exampleCarrier,
  exampleClients,
  marginPercent,
  marginReais,
  type Exposure,
} from '@/lib/nova-portfolio';

const steps = [
  {
    number: '01',
    title: 'Envie os fretes',
    body: 'Uma planilha ou o XML do CT-e. Sem trocar o sistema que emite o documento e sem cadastrar caminhão por caminhão.',
  },
  {
    number: '02',
    title: 'Veja quem come a margem',
    body: 'No primeiro acesso, a carteira aparece ranqueada. Receita, custo e margem de cada cliente, em reais e em percentual.',
  },
  {
    number: '03',
    title: 'Peça o reajuste com o PDF',
    body: 'O Dossiê de Repasse junta a conta daquele embarcador. Você baixa e manda para quem compra o frete.',
  },
];

const trialIncludes = [
  'Planilha ou XML do CT-e',
  'Ranking de margem por cliente',
  'Dossiê de Repasse em PDF',
  'Exposição de cada cliente à reforma',
];

const exposureNote: Record<Exposure, string> = {
  alta: 'Tende a perder crédito e pedir desconto.',
  media: 'O efeito depende do regime do cliente.',
  baixa: 'Pouco motivo, pela reforma, para apertar o preço.',
};

export default function NovaLandingPage() {
  const byExposure = clientsByExposure(exampleClients);

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 selection:bg-zinc-900 selection:text-white">
      <a
        href="#conteudo"
        className="absolute left-4 top-4 z-[60] -translate-y-20 rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white focus:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
      >
        Ir para o conteúdo
      </a>
      <NovaHeader />

      <main id="conteudo" tabIndex={-1}>
        <section className="px-5 pb-8 pt-14 sm:px-6 sm:pt-20 lg:pt-24">
          <div className="mx-auto max-w-6xl">
            <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-zinc-500">
              Para transportadoras de 5 a 30 caminhões
            </p>
            <h1 className="mt-5 max-w-[12em] text-[2.65rem] font-semibold leading-[1.02] tracking-[-0.035em] text-zinc-950 sm:text-6xl lg:text-[4.25rem]">
              Descubra quais clientes estão comendo sua margem
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-700 text-pretty">
              A Margem Clara mostra a margem real de cada embarcador. Quem deixa dinheiro na operação e quem tira. Você envia uma planilha ou o XML do CT-e e vê o ranking no primeiro acesso.
            </p>
            <p className="mt-6 max-w-xl border-l-2 border-zinc-900 pl-4 text-[15px] font-medium leading-relaxed text-zinc-900">
              Não é uma calculadora de custo por km. É a carteira de clientes, com margem em reais.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <TrialCta className="w-full sm:w-auto" />
              <SecondaryAnchor href="#calculadora" className="w-full sm:w-auto">
                Calcular um frete
              </SecondaryAnchor>
            </div>
            <ul className="mt-8 flex max-w-3xl flex-col gap-2 text-sm text-zinc-600 sm:flex-row sm:items-center sm:gap-0 sm:divide-x sm:divide-zinc-300">
              <li className="sm:pr-4">14 dias grátis. Depois, plano pago.</li>
              <li className="sm:px-4">Boleto e Pix.</li>
              <li className="sm:pl-4">Sem agendar demonstração.</li>
            </ul>
          </div>
        </section>

        <section id="carteira" className="scroll-mt-24 px-5 pb-20 pt-6 sm:px-6 sm:pb-28">
          <div className="mx-auto max-w-6xl">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="text-xl font-semibold tracking-tight text-zinc-950 sm:text-2xl">
                Ranking por margem
              </h2>
              <p className="max-w-md text-sm leading-relaxed text-zinc-600">
                Exemplo fictício. {exampleCarrier.name} não existe. {exampleCarrier.trucks} caminhões, {exampleCarrier.period}.
              </p>
            </div>
            <PortfolioMock />
          </div>
        </section>

        <section id="como-funciona" className="scroll-mt-24 border-t border-zinc-200 bg-white px-5 py-20 sm:px-6 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-zinc-500">Como funciona</p>
            <h2 className="mt-4 max-w-[18ch] text-3xl font-semibold tracking-[-0.03em] text-zinc-950 sm:text-4xl">
              Três passos. O ranking sai no primeiro acesso.
            </h2>
            <ol className="mt-14 grid gap-12 md:grid-cols-3 md:gap-8">
              {steps.map((step) => (
                <li key={step.number} className="border-t border-zinc-300 pt-6">
                  <span className="font-mono text-sm text-zinc-500">{step.number}</span>
                  <h3 className="mt-4 text-xl font-semibold tracking-tight text-zinc-950">{step.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-zinc-700 text-pretty">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="dossie" className="scroll-mt-24 px-5 py-20 sm:px-6 sm:py-28">
          <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-zinc-500">Dossiê de Repasse</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-zinc-950 sm:text-4xl text-balance">
                Um PDF para justificar o aumento
              </h2>
              <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-zinc-700">
                <p>
                  Quem compra o frete não vê o seu custo. O dossiê coloca a conta daquele cliente numa página: quanto entrou, quanto custou, quanto ficou de margem e qual reajuste tira a operação do prejuízo.
                </p>
                <p>
                  Você baixa o PDF e manda por e-mail ou WhatsApp. Sem montar planilha na véspera da conversa.
                </p>
              </div>
            </div>
            <DossieSheet />
          </div>
        </section>

        <section id="reforma" className="scroll-mt-24 border-t border-zinc-200 bg-white px-5 py-20 sm:px-6 sm:py-28">
          <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-zinc-500">Reforma tributária</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-zinc-950 sm:text-4xl text-balance">
                A exposição de cada cliente em 2026 e 2027
              </h2>
              <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-zinc-700">
                <p>
                  IBS e CBS começam a mudar o crédito de quem paga o frete. Tem embarcador que vai sentir isso no bolso e sentar para pedir desconto. Tem embarcador que não muda nada.
                </p>
                <p>
                  A Margem Clara marca a exposição de cada cliente: alta, média ou baixa. Você entra na negociação sabendo quem vai apertar o preço.
                </p>
                <p className="text-sm text-zinc-500">
                  A lista ao lado é um exemplo fictício. A leitura do produto é indicativa e não substitui o seu contador.
                </p>
              </div>
              <ul className="mt-8 space-y-3">
                {(Object.keys(exposureNote) as Exposure[]).map((level) => (
                  <li key={level} className="flex items-start gap-3 text-sm leading-relaxed text-zinc-700">
                    <ExposureBadge exposure={level} />
                    <span>{exposureNote[level]}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="overflow-hidden rounded-xl border border-zinc-200 bg-[#fafafa]">
              <div className="flex items-center justify-between gap-3 border-b border-zinc-200 px-5 py-4">
                <p className="text-sm font-medium text-zinc-900">Exposição no exemplo</p>
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-amber-800">Fictício</p>
              </div>
              <ul className="divide-y divide-zinc-200">
                {byExposure.map((client) => {
                  const margin = marginReais(client);
                  return (
                    <li key={client.id} className="flex items-center justify-between gap-4 bg-white px-5 py-3.5">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-zinc-900">{client.name}</p>
                        <p className="mt-0.5 text-[12px] tabular-nums text-zinc-500">
                          Margem {formatSignedBRL(margin)} ({formatSignedPercent(marginPercent(client))})
                        </p>
                      </div>
                      <ExposureBadge exposure={client.exposure} />
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>

        <section id="calculadora" className="scroll-mt-24 px-5 py-20 sm:px-6 sm:py-28" aria-labelledby="calculadora-titulo">
          <div className="mx-auto max-w-6xl">
            <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-zinc-500">Um frete, agora</p>
            <h2 id="calculadora-titulo" className="mt-4 max-w-[18ch] text-3xl font-semibold tracking-[-0.03em] text-zinc-950 sm:text-4xl">
              Calcule a margem de um frete
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-zinc-700">
              Uma conta rápida, sem cadastro. A carteira inteira, com todos os embarcadores, fica no teste grátis.
            </p>
            <div className="mt-12">
              <FreightCalculator />
            </div>
          </div>
        </section>

        <section id="preco" className="scroll-mt-24 border-t border-zinc-200 bg-white px-5 py-20 sm:px-6 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-zinc-500">Preço</p>
            <h2 className="mt-4 max-w-[16ch] text-3xl font-semibold tracking-[-0.03em] text-zinc-950 sm:text-4xl">
              14 dias grátis. O plano pago está a definir.
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-zinc-700">
              Você usa a carteira por 14 dias. No dia 15, o plano segue pago. O valor ainda não está fechado. Quando estiver, a cobrança aceita boleto e Pix.
            </p>

            <div className="mt-12 grid gap-4 lg:grid-cols-2">
              <article className="flex flex-col rounded-2xl bg-zinc-900 p-7 text-white sm:p-8">
                <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-zinc-400">Teste grátis</p>
                <p className="mt-4 text-5xl font-semibold tracking-tight tabular-nums">R$ 0</p>
                <p className="mt-2 text-sm text-zinc-300">por 14 dias</p>
                <ul className="mt-8 space-y-3 text-sm text-zinc-200">
                  {trialIncludes.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-white" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <TrialCta tone="light" />
                </div>
              </article>

              <article className="flex flex-col rounded-2xl border border-zinc-300 bg-[#fafafa] p-7 sm:p-8">
                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-zinc-500">Plano pago</p>
                  <p className="rounded-full border border-zinc-900 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-900">
                    a definir
                  </p>
                </div>
                <p className="mt-4 text-5xl font-semibold tracking-tight text-zinc-950">a definir</p>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-600">
                  O valor depois dos 14 dias ainda não foi fechado.
                </p>
                <p className="mt-6 text-sm font-medium text-zinc-900">Boleto e Pix, quando o plano entrar.</p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                  Sem falar com vendedor. Você começa pelo teste.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="px-5 py-20 sm:px-6 sm:py-28">
          <div className="mx-auto grid max-w-6xl items-end gap-8 border-t border-zinc-200 pt-16 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16">
            <h2 className="text-4xl font-semibold tracking-[-0.03em] text-zinc-950 sm:text-5xl text-balance">
              A sua carteira, no primeiro acesso.
            </h2>
            <div>
              <p className="text-[15px] leading-relaxed text-zinc-700">
                Envie a planilha ou o XML do CT-e. Veja quais clientes estão comendo a margem.
              </p>
              <div className="mt-6">
                <TrialCta />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200 px-5 py-8 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            <Mark size="sm" />
            <p className="text-[13px] text-zinc-500">
              Margem Clara · {new Date().getFullYear()}
            </p>
          </div>
          <p className="max-w-md text-[12px] leading-relaxed text-zinc-500">
            Protótipo da nova página. A página inicial atual continua no ar.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-[13px] text-zinc-600 underline decoration-zinc-300 underline-offset-4 hover:text-zinc-900 hover:decoration-zinc-900">
              Página inicial
            </Link>
            <Link href="/acesso" className="text-[13px] text-zinc-600 underline decoration-zinc-300 underline-offset-4 hover:text-zinc-900 hover:decoration-zinc-900">
              Acesso
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
