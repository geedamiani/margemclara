/** Fictional carrier used only on the /nova prototype. Not a real company. */

export type Exposure = 'alta' | 'media' | 'baixa';

export function marginReais(client: { receita: number; custo: number }): number {
  return client.receita - client.custo;
}

export function marginPercent(client: { receita: number; custo: number }): number {
  if (client.receita === 0) return 0;
  return (marginReais(client) / client.receita) * 100;
}

export interface PortfolioClient {
  id: string;
  name: string;
  receita: number;
  custo: number;
  viagens: number;
  exposure: Exposure;
  /** Margin percent over six months, ending at the current month. */
  trend: number[];
}

export const exampleCarrier = {
  name: 'Transportes Ribeira',
  trucks: 14,
  period: 'março de 2026',
};

export const EXAMPLE_TARGET_MARGIN = 0.08;

export const exposureLabel: Record<Exposure, string> = {
  alta: 'Alta',
  media: 'Média',
  baixa: 'Baixa',
};

const exposureRank: Record<Exposure, number> = {
  alta: 0,
  media: 1,
  baixa: 2,
};

export const exampleClients: PortfolioClient[] = [
  {
    id: 'laticinios',
    name: 'Laticínios Campos Altos',
    receita: 96400,
    custo: 118900,
    viagens: 41,
    exposure: 'alta',
    trend: [-8.4, -11.2, -14.6, -17.1, -20.4, -23.3],
  },
  {
    id: 'bebidas',
    name: 'Bebidas Três Cachoeiras',
    receita: 128600,
    custo: 141200,
    viagens: 56,
    exposure: 'media',
    trend: [-1.2, -3.4, -5.1, -6.8, -8.4, -9.8],
  },
  {
    id: 'metalurgica',
    name: 'Metalúrgica Rio Fundo',
    receita: 74200,
    custo: 86050,
    viagens: 33,
    exposure: 'alta',
    trend: [-4.5, -7.2, -9.8, -12.1, -14.4, -16],
  },
  {
    id: 'ceramica',
    name: 'Cerâmica Serra Dourada',
    receita: 61800,
    custo: 64900,
    viagens: 22,
    exposure: 'baixa',
    trend: [3.2, 1.4, -0.6, -2.1, -3.8, -5],
  },
  {
    id: 'atacado',
    name: 'Atacado Leste Mineiro',
    receita: 154000,
    custo: 149200,
    viagens: 70,
    exposure: 'media',
    trend: [8.4, 7.1, 6.2, 5, 4.1, 3.1],
  },
  {
    id: 'quimica',
    name: 'Química Pinhal',
    receita: 88500,
    custo: 79100,
    viagens: 29,
    exposure: 'baixa',
    trend: [7.8, 8.6, 9.1, 9.8, 10.2, 10.6],
  },
  {
    id: 'frigorifico',
    name: 'Frigorífico Pampa Verde',
    receita: 210400,
    custo: 176800,
    viagens: 84,
    exposure: 'media',
    trend: [13.4, 14.2, 15.1, 15.6, 15.9, 16],
  },
  {
    id: 'cooperativa',
    name: 'Cooperativa Grãos do Vale',
    receita: 186200,
    custo: 141700,
    viagens: 63,
    exposure: 'baixa',
    trend: [19.2, 20.4, 21.6, 22.5, 23.2, 23.9],
  },
];

export function rankedClients(clients: PortfolioClient[]): PortfolioClient[] {
  return [...clients].sort(
    (a, b) => marginReais(a) - marginReais(b) || a.name.localeCompare(b.name, 'pt-BR'),
  );
}

export function clientsByExposure(clients: PortfolioClient[]): PortfolioClient[] {
  return [...clients].sort((a, b) => {
    const byExposure = exposureRank[a.exposure] - exposureRank[b.exposure];
    if (byExposure !== 0) return byExposure;
    return marginReais(a) - marginReais(b);
  });
}

export const rankedExampleClients = rankedClients(exampleClients);

export function portfolioSummary(clients: PortfolioClient[]) {
  const ranked = rankedClients(clients);
  const margin = clients.reduce((sum, client) => sum + marginReais(client), 0);
  const losingCount = clients.filter((client) => marginReais(client) < 0).length;

  return {
    count: clients.length,
    losingCount,
    margin,
    worst: ranked[0],
  };
}

export const exampleSummary = portfolioSummary(exampleClients);
