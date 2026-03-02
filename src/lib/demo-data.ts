// ============================================================
// Margem Clara — Single source of truth for all demo data
// ============================================================

export type CompanyId = 'atlas' | 'serra-azul' | 'horizonte';

export interface Company {
  id: CompanyId;
  name: string;
  cnpj: string;
  shortName: string;
}

export interface Client {
  id: string;
  name: string;
  receita: number;
  custoEstimado: number;
  margem: number;
  margemPercent: number;
  viagens: number;
  margemTrend: number[]; // 6 months Jan–Jun
  topRoutes: string[];
  precoMinimoSugerido: number; // R$/km
}

export interface Route {
  id: string;
  origem: string;
  destino: string;
  viagens: number;
  receita: number;
  margem: number;
  margemPercent: number;
  reaisPerKm: number;
  percentAbaixoPrecoMinimo: number;
  margemTrend: number[];
  topClients: string[];
  distanciaKm: number;
}

export interface MonthlyData {
  month: string;
  margem: number;
  receita: number;
  custo: number;
}

export interface RiskItem {
  severity: 'high' | 'medium' | 'low';
  text: string;
}

export interface SimulationResult {
  margemProjetada: number;
  clientesAdicionaisRisco: number;
  clientesRisco: string[];
}

export interface CompanyData {
  company: Company;
  faturamentoMensal: number;
  custoRealPorKm: number;
  margemMediaGeral: number;
  percentClientesNegativos: number;
  totalClientes: number;
  clientesNegativos: number;
  clients: Client[];
  routes: Route[];
  monthlyData: MonthlyData[];
  risks: RiskItem[];
  simulationResults: Record<string, SimulationResult>;
}

// ============================================================
// Companies
// ============================================================

export const companies: Company[] = [
  { id: 'atlas', name: 'Transportadora Atlas Log', cnpj: '12.345.678/0001-90', shortName: 'Atlas Log' },
  { id: 'serra-azul', name: 'Transportadora Serra Azul', cnpj: '23.456.789/0001-01', shortName: 'Serra Azul' },
  { id: 'horizonte', name: 'Transportadora Horizonte', cnpj: '34.567.890/0001-12', shortName: 'Horizonte' },
];

// ============================================================
// Atlas Log — PRIMARY (healthy but hidden losses)
// ============================================================

const atlasClients: Client[] = [
  {
    id: 'c1', name: 'Distribuidora Norte Sul',
    receita: 248000, custoEstimado: 214000, margem: 34000, margemPercent: 13.7, viagens: 142,
    margemTrend: [12.1, 13.5, 14.2, 13.8, 14.0, 13.7],
    topRoutes: ['SP → MG', 'SP → RJ'], precoMinimoSugerido: 5.10,
  },
  {
    id: 'c2', name: 'Grupo Cargill Transportes',
    receita: 312000, custoEstimado: 274000, margem: 38000, margemPercent: 12.2, viagens: 198,
    margemTrend: [11.0, 11.8, 12.5, 12.0, 12.4, 12.2],
    topRoutes: ['SP → PR', 'SP → SC'], precoMinimoSugerido: 4.95,
  },
  {
    id: 'c3', name: 'Atacadão Logística',
    receita: 186000, custoEstimado: 160000, margem: 26000, margemPercent: 14.0, viagens: 96,
    margemTrend: [13.2, 13.8, 14.5, 14.1, 14.3, 14.0],
    topRoutes: ['SP → MG', 'MG → BA'], precoMinimoSugerido: 5.20,
  },
  {
    id: 'c4', name: 'Delta Log',
    receita: 156000, custoEstimado: 164580, margem: -8580, margemPercent: -5.5, viagens: 88,
    margemTrend: [-2.1, -3.4, -4.0, -4.8, -5.2, -5.5],
    topRoutes: ['SP → MG', 'MG → RJ'], precoMinimoSugerido: 5.85,
  },
  {
    id: 'c5', name: 'Supermercados BH',
    receita: 94000, custoEstimado: 82000, margem: 12000, margemPercent: 12.8, viagens: 52,
    margemTrend: [11.5, 12.0, 12.5, 12.8, 12.6, 12.8],
    topRoutes: ['MG → MG'], precoMinimoSugerido: 4.80,
  },
  {
    id: 'c6', name: 'Ambev Distribuição',
    receita: 278000, custoEstimado: 245000, margem: 33000, margemPercent: 11.9, viagens: 164,
    margemTrend: [10.5, 11.2, 11.8, 11.5, 12.0, 11.9],
    topRoutes: ['SP → PR', 'SP → MG', 'MG → BA'], precoMinimoSugerido: 5.05,
  },
  {
    id: 'c7', name: 'Frete Express',
    receita: 67000, custoEstimado: 69690, margem: -2690, margemPercent: -4.0, viagens: 38,
    margemTrend: [-1.2, -2.0, -2.8, -3.2, -3.6, -4.0],
    topRoutes: ['RJ → SP'], precoMinimoSugerido: 5.65,
  },
  {
    id: 'c8', name: 'Rodoviário São Paulo',
    receita: 145000, custoEstimado: 127000, margem: 18000, margemPercent: 12.4, viagens: 78,
    margemTrend: [11.8, 12.0, 12.3, 12.5, 12.2, 12.4],
    topRoutes: ['SP → SP', 'SP → RJ'], precoMinimoSugerido: 4.90,
  },
  {
    id: 'c9', name: 'TransBrasil Cargas',
    receita: 52000, custoEstimado: 53300, margem: -1300, margemPercent: -2.5, viagens: 28,
    margemTrend: [0.5, -0.2, -0.8, -1.5, -2.0, -2.5],
    topRoutes: ['SP → GO'], precoMinimoSugerido: 5.45,
  },
  {
    id: 'c10', name: 'Cooperativa Agrícola Central',
    receita: 198000, custoEstimado: 176000, margem: 22000, margemPercent: 11.1, viagens: 112,
    margemTrend: [10.2, 10.8, 11.0, 11.2, 11.0, 11.1],
    topRoutes: ['GO → SP', 'MT → SP'], precoMinimoSugerido: 5.15,
  },
  {
    id: 'c11', name: 'Martins Atacado',
    receita: 124000, custoEstimado: 108000, margem: 16000, margemPercent: 12.9, viagens: 68,
    margemTrend: [12.0, 12.3, 12.8, 12.7, 13.0, 12.9],
    topRoutes: ['MG → MG', 'SP → MG'], precoMinimoSugerido: 4.85,
  },
  {
    id: 'c12', name: 'Ceará Logística',
    receita: 86000, custoEstimado: 75000, margem: 11000, margemPercent: 12.8, viagens: 44,
    margemTrend: [11.5, 12.0, 12.2, 12.5, 12.8, 12.8],
    topRoutes: ['SP → CE', 'MG → CE'], precoMinimoSugerido: 5.30,
  },
  {
    id: 'c13', name: 'Bunge Alimentos',
    receita: 210000, custoEstimado: 185000, margem: 25000, margemPercent: 11.9, viagens: 118,
    margemTrend: [11.0, 11.5, 11.8, 12.0, 11.8, 11.9],
    topRoutes: ['PR → SP', 'GO → SP'], precoMinimoSugerido: 5.00,
  },
  {
    id: 'c14', name: 'Frigorífico Minerva',
    receita: 165000, custoEstimado: 148000, margem: 17000, margemPercent: 10.3, viagens: 92,
    margemTrend: [9.5, 10.0, 10.2, 10.5, 10.2, 10.3],
    topRoutes: ['GO → SP', 'MT → SP'], precoMinimoSugerido: 5.10,
  },
  {
    id: 'c15', name: 'JBS Transportes',
    receita: 134000, custoEstimado: 131680, margem: 2320, margemPercent: 1.7, viagens: 74,
    margemTrend: [4.2, 3.5, 2.8, 2.2, 1.9, 1.7],
    topRoutes: ['GO → SP', 'MS → SP'], precoMinimoSugerido: 5.40,
  },
  {
    id: 'c16', name: 'Raízen Combustíveis',
    receita: 92000, custoEstimado: 94760, margem: -2760, margemPercent: -3.0, viagens: 48,
    margemTrend: [-0.5, -1.2, -1.8, -2.2, -2.6, -3.0],
    topRoutes: ['SP → SP', 'SP → MG'], precoMinimoSugerido: 5.55,
  },
  {
    id: 'c17', name: 'Porto Seguro Cargas',
    receita: 78000, custoEstimado: 67000, margem: 11000, margemPercent: 14.1, viagens: 42,
    margemTrend: [13.0, 13.5, 13.8, 14.0, 14.2, 14.1],
    topRoutes: ['SP → BA'], precoMinimoSugerido: 4.75,
  },
  {
    id: 'c18', name: 'Flex Entregas',
    receita: 55000, custoEstimado: 48000, margem: 7000, margemPercent: 12.7, viagens: 30,
    margemTrend: [11.5, 12.0, 12.3, 12.5, 12.8, 12.7],
    topRoutes: ['SP → SP'], precoMinimoSugerido: 4.70,
  },
];

const atlasRoutes: Route[] = [
  {
    id: 'r1', origem: 'São Paulo', destino: 'Minas Gerais', viagens: 248, receita: 520000,
    margem: 58000, margemPercent: 11.2, reaisPerKm: 4.95, percentAbaixoPrecoMinimo: 38,
    margemTrend: [10.0, 10.8, 11.5, 11.2, 11.4, 11.2],
    topClients: ['Distribuidora Norte Sul', 'Delta Log', 'Atacadão Logística', 'Martins Atacado'],
    distanciaKm: 580,
  },
  {
    id: 'r2', origem: 'São Paulo', destino: 'Paraná', viagens: 186, receita: 380000,
    margem: 48000, margemPercent: 12.6, reaisPerKm: 5.15, percentAbaixoPrecoMinimo: 22,
    margemTrend: [11.5, 12.0, 12.8, 12.5, 12.8, 12.6],
    topClients: ['Grupo Cargill Transportes', 'Ambev Distribuição'],
    distanciaKm: 410,
  },
  {
    id: 'r3', origem: 'São Paulo', destino: 'Rio de Janeiro', viagens: 164, receita: 310000,
    margem: 34000, margemPercent: 11.0, reaisPerKm: 4.85, percentAbaixoPrecoMinimo: 31,
    margemTrend: [10.2, 10.5, 11.0, 10.8, 11.2, 11.0],
    topClients: ['Distribuidora Norte Sul', 'Rodoviário São Paulo'],
    distanciaKm: 430,
  },
  {
    id: 'r4', origem: 'Goiás', destino: 'São Paulo', viagens: 198, receita: 420000,
    margem: 46000, margemPercent: 11.0, reaisPerKm: 4.90, percentAbaixoPrecoMinimo: 28,
    margemTrend: [9.8, 10.5, 11.0, 10.8, 11.2, 11.0],
    topClients: ['Cooperativa Agrícola Central', 'Frigorífico Minerva', 'JBS Transportes'],
    distanciaKm: 920,
  },
  {
    id: 'r5', origem: 'Minas Gerais', destino: 'Bahia', viagens: 92, receita: 185000,
    margem: 24000, margemPercent: 13.0, reaisPerKm: 5.25, percentAbaixoPrecoMinimo: 15,
    margemTrend: [12.0, 12.5, 13.0, 12.8, 13.2, 13.0],
    topClients: ['Atacadão Logística', 'Ambev Distribuição'],
    distanciaKm: 1050,
  },
  {
    id: 'r6', origem: 'Rio de Janeiro', destino: 'São Paulo', viagens: 52, receita: 98000,
    margem: -3200, margemPercent: -3.3, reaisPerKm: 4.60, percentAbaixoPrecoMinimo: 62,
    margemTrend: [-1.0, -1.8, -2.5, -2.8, -3.0, -3.3],
    topClients: ['Frete Express'],
    distanciaKm: 430,
  },
  {
    id: 'r7', origem: 'São Paulo', destino: 'Santa Catarina', viagens: 78, receita: 156000,
    margem: 19000, margemPercent: 12.2, reaisPerKm: 5.10, percentAbaixoPrecoMinimo: 18,
    margemTrend: [11.2, 11.8, 12.0, 12.2, 12.5, 12.2],
    topClients: ['Grupo Cargill Transportes'],
    distanciaKm: 700,
  },
  {
    id: 'r8', origem: 'São Paulo', destino: 'Goiás', viagens: 44, receita: 86000,
    margem: -2500, margemPercent: -2.9, reaisPerKm: 4.55, percentAbaixoPrecoMinimo: 55,
    margemTrend: [0.2, -0.5, -1.2, -1.8, -2.4, -2.9],
    topClients: ['TransBrasil Cargas'],
    distanciaKm: 920,
  },
  {
    id: 'r9', origem: 'São Paulo', destino: 'Ceará', viagens: 44, receita: 110000,
    margem: 14000, margemPercent: 12.7, reaisPerKm: 5.30, percentAbaixoPrecoMinimo: 12,
    margemTrend: [11.5, 12.0, 12.5, 12.5, 12.8, 12.7],
    topClients: ['Ceará Logística'],
    distanciaKm: 2800,
  },
  {
    id: 'r10', origem: 'São Paulo', destino: 'Bahia', viagens: 42, receita: 96000,
    margem: 13500, margemPercent: 14.1, reaisPerKm: 5.40, percentAbaixoPrecoMinimo: 8,
    margemTrend: [13.0, 13.5, 13.8, 14.0, 14.2, 14.1],
    topClients: ['Porto Seguro Cargas'],
    distanciaKm: 1500,
  },
];

const atlasMonthly: MonthlyData[] = [
  { month: 'Jan', margem: 9.8, receita: 1180000, custo: 1064400 },
  { month: 'Fev', margem: 10.5, receita: 1220000, custo: 1091900 },
  { month: 'Mar', margem: 11.2, receita: 1300000, custo: 1154400 },
  { month: 'Abr', margem: 11.8, receita: 1310000, custo: 1155420 },
  { month: 'Mai', margem: 11.6, receita: 1290000, custo: 1140360 },
  { month: 'Jun', margem: 11.4, receita: 1280000, custo: 1134080 },
];

const atlasRisks: RiskItem[] = [
  { severity: 'high', text: 'Cliente Delta Log com margem -5,5% nas últimas 6 semanas' },
  { severity: 'high', text: 'Diesel +5% coloca +3 clientes em margem negativa' },
  { severity: 'medium', text: 'Rota SP → MG abaixo do preço mínimo em 38% das viagens' },
  { severity: 'medium', text: 'Rota RJ → SP com margem negativa consolidada (-3,3%)' },
  { severity: 'low', text: 'JBS Transportes com margem em queda: de 4,2% para 1,7% em 6 meses' },
];

const atlasSimulations: Record<string, SimulationResult> = {
  '0-0': { margemProjetada: 11.4, clientesAdicionaisRisco: 0, clientesRisco: [] },
  '5-0': { margemProjetada: 8.2, clientesAdicionaisRisco: 3, clientesRisco: ['JBS Transportes', 'TransBrasil Cargas', 'Raízen Combustíveis'] },
  '10-0': { margemProjetada: 5.1, clientesAdicionaisRisco: 5, clientesRisco: ['JBS Transportes', 'TransBrasil Cargas', 'Raízen Combustíveis', 'Frigorífico Minerva', 'Rodoviário São Paulo'] },
  '5-5': { margemProjetada: 6.8, clientesAdicionaisRisco: 4, clientesRisco: ['JBS Transportes', 'TransBrasil Cargas', 'Raízen Combustíveis', 'Frigorífico Minerva'] },
  '10-5': { margemProjetada: 3.5, clientesAdicionaisRisco: 6, clientesRisco: ['JBS Transportes', 'TransBrasil Cargas', 'Raízen Combustíveis', 'Frigorífico Minerva', 'Rodoviário São Paulo', 'Cooperativa Agrícola Central'] },
  '10-10': { margemProjetada: 1.8, clientesAdicionaisRisco: 7, clientesRisco: ['JBS Transportes', 'TransBrasil Cargas', 'Raízen Combustíveis', 'Frigorífico Minerva', 'Rodoviário São Paulo', 'Cooperativa Agrícola Central', 'Ceará Logística'] },
  '0-5': { margemProjetada: 9.9, clientesAdicionaisRisco: 1, clientesRisco: ['JBS Transportes'] },
  '0-10': { margemProjetada: 8.5, clientesAdicionaisRisco: 2, clientesRisco: ['JBS Transportes', 'TransBrasil Cargas'] },
  '5-10': { margemProjetada: 5.2, clientesAdicionaisRisco: 5, clientesRisco: ['JBS Transportes', 'TransBrasil Cargas', 'Raízen Combustíveis', 'Frigorífico Minerva', 'Rodoviário São Paulo'] },
};

// ============================================================
// Serra Azul — low maturity, messy data
// ============================================================

const serraAzulClients: Client[] = [
  {
    id: 'sa-c1', name: 'Comercial Ribeiro',
    receita: 98000, custoEstimado: 89000, margem: 9000, margemPercent: 9.2, viagens: 62,
    margemTrend: [7.5, 8.0, 9.5, 8.8, 10.0, 9.2],
    topRoutes: ['MG → SP'], precoMinimoSugerido: 5.30,
  },
  {
    id: 'sa-c2', name: 'Agro Norte',
    receita: 142000, custoEstimado: 136000, margem: 6000, margemPercent: 4.2, viagens: 88,
    margemTrend: [6.0, 5.2, 4.8, 3.5, 4.5, 4.2],
    topRoutes: ['GO → MG', 'GO → SP'], precoMinimoSugerido: 5.50,
  },
  {
    id: 'sa-c3', name: 'Materiais São Jorge',
    receita: 45000, custoEstimado: 48600, margem: -3600, margemPercent: -8.0, viagens: 28,
    margemTrend: [-4.0, -5.5, -6.2, -7.0, -7.5, -8.0],
    topRoutes: ['MG → MG'], precoMinimoSugerido: 6.10,
  },
  {
    id: 'sa-c4', name: 'Bebidas Nacional',
    receita: 76000, custoEstimado: 71000, margem: 5000, margemPercent: 6.6, viagens: 44,
    margemTrend: [8.0, 7.5, 6.8, 6.2, 7.0, 6.6],
    topRoutes: ['SP → MG'], precoMinimoSugerido: 5.20,
  },
  {
    id: 'sa-c5', name: 'Ferro & Aço Ltda',
    receita: 118000, custoEstimado: 124900, margem: -6900, margemPercent: -5.8, viagens: 72,
    margemTrend: [-3.0, -3.8, -4.5, -5.0, -5.5, -5.8],
    topRoutes: ['MG → RJ', 'MG → SP'], precoMinimoSugerido: 5.90,
  },
  {
    id: 'sa-c6', name: 'Distribuidora Mineira',
    receita: 68000, custoEstimado: 61000, margem: 7000, margemPercent: 10.3, viagens: 38,
    margemTrend: [9.0, 9.5, 10.0, 10.5, 10.2, 10.3],
    topRoutes: ['MG → MG'], precoMinimoSugerido: 5.00,
  },
  {
    id: 'sa-c7', name: 'Construções Leste',
    receita: 34000, custoEstimado: 35700, margem: -1700, margemPercent: -5.0, viagens: 18,
    margemTrend: [-2.0, -2.8, -3.5, -4.0, -4.5, -5.0],
    topRoutes: ['MG → ES'], precoMinimoSugerido: 5.75,
  },
  {
    id: 'sa-c8', name: 'TechParts Brasil',
    receita: 52000, custoEstimado: 47000, margem: 5000, margemPercent: 9.6, viagens: 30,
    margemTrend: [8.5, 9.0, 9.2, 9.5, 9.8, 9.6],
    topRoutes: ['SP → MG'], precoMinimoSugerido: 5.10,
  },
  {
    id: 'sa-c9', name: 'Farmácia Popular Dist.',
    receita: 88000, custoEstimado: 80000, margem: 8000, margemPercent: 9.1, viagens: 52,
    margemTrend: [8.0, 8.5, 9.0, 8.8, 9.2, 9.1],
    topRoutes: ['SP → MG', 'RJ → MG'], precoMinimoSugerido: 5.15,
  },
  {
    id: 'sa-c10', name: 'Peças Automotivas JM',
    receita: 39000, custoEstimado: 41400, margem: -2400, margemPercent: -6.2, viagens: 22,
    margemTrend: [-3.5, -4.0, -4.8, -5.2, -5.8, -6.2],
    topRoutes: ['SP → GO'], precoMinimoSugerido: 5.85,
  },
];

const serraAzulRoutes: Route[] = [
  {
    id: 'sa-r1', origem: 'Minas Gerais', destino: 'São Paulo', viagens: 142, receita: 248000,
    margem: 18000, margemPercent: 7.3, reaisPerKm: 4.65, percentAbaixoPrecoMinimo: 45,
    margemTrend: [5.5, 6.2, 7.0, 7.5, 7.2, 7.3],
    topClients: ['Comercial Ribeiro', 'Ferro & Aço Ltda'], distanciaKm: 580,
  },
  {
    id: 'sa-r2', origem: 'Goiás', destino: 'Minas Gerais', viagens: 88, receita: 156000,
    margem: 8000, margemPercent: 5.1, reaisPerKm: 4.50, percentAbaixoPrecoMinimo: 52,
    margemTrend: [4.0, 4.5, 5.2, 4.8, 5.5, 5.1],
    topClients: ['Agro Norte'], distanciaKm: 850,
  },
  {
    id: 'sa-r3', origem: 'Minas Gerais', destino: 'Rio de Janeiro', viagens: 72, receita: 118000,
    margem: -4800, margemPercent: -4.1, reaisPerKm: 4.35, percentAbaixoPrecoMinimo: 68,
    margemTrend: [-2.0, -2.8, -3.2, -3.5, -3.8, -4.1],
    topClients: ['Ferro & Aço Ltda', 'Construções Leste'], distanciaKm: 440,
  },
  {
    id: 'sa-r4', origem: 'São Paulo', destino: 'Minas Gerais', viagens: 96, receita: 168000,
    margem: 15000, margemPercent: 8.9, reaisPerKm: 4.80, percentAbaixoPrecoMinimo: 35,
    margemTrend: [7.5, 8.0, 8.5, 9.0, 8.8, 8.9],
    topClients: ['Bebidas Nacional', 'TechParts Brasil', 'Farmácia Popular Dist.'], distanciaKm: 580,
  },
  {
    id: 'sa-r5', origem: 'Minas Gerais', destino: 'Espírito Santo', viagens: 34, receita: 52000,
    margem: -1200, margemPercent: -2.3, reaisPerKm: 4.40, percentAbaixoPrecoMinimo: 58,
    margemTrend: [-0.5, -1.0, -1.5, -1.8, -2.0, -2.3],
    topClients: ['Construções Leste'], distanciaKm: 520,
  },
];

const serraAzulMonthly: MonthlyData[] = [
  { month: 'Jan', margem: 4.5, receita: 680000, custo: 649400 },
  { month: 'Fev', margem: 5.2, receita: 710000, custo: 673080 },
  { month: 'Mar', margem: 6.0, receita: 740000, custo: 695600 },
  { month: 'Abr', margem: 5.5, receita: 720000, custo: 680400 },
  { month: 'Mai', margem: 6.2, receita: 750000, custo: 703500 },
  { month: 'Jun', margem: 5.8, receita: 730000, custo: 687660 },
];

const serraAzulRisks: RiskItem[] = [
  { severity: 'high', text: 'Materiais São Jorge com margem -8,0% — maior prejuízo relativo' },
  { severity: 'high', text: 'Ferro & Aço Ltda representando 15% da receita com margem negativa' },
  { severity: 'high', text: '40% dos clientes com margem abaixo de 6%' },
  { severity: 'medium', text: 'Rota MG → RJ com margem negativa consolidada (-4,1%)' },
  { severity: 'medium', text: 'Dados de custo incompletos para 12% das viagens' },
];

const serraAzulSimulations: Record<string, SimulationResult> = {
  '0-0': { margemProjetada: 5.8, clientesAdicionaisRisco: 0, clientesRisco: [] },
  '5-0': { margemProjetada: 2.6, clientesAdicionaisRisco: 2, clientesRisco: ['Agro Norte', 'Bebidas Nacional'] },
  '10-0': { margemProjetada: -0.5, clientesAdicionaisRisco: 4, clientesRisco: ['Agro Norte', 'Bebidas Nacional', 'Comercial Ribeiro', 'TechParts Brasil'] },
  '5-5': { margemProjetada: 1.2, clientesAdicionaisRisco: 3, clientesRisco: ['Agro Norte', 'Bebidas Nacional', 'Farmácia Popular Dist.'] },
  '10-5': { margemProjetada: -2.0, clientesAdicionaisRisco: 5, clientesRisco: ['Agro Norte', 'Bebidas Nacional', 'Comercial Ribeiro', 'TechParts Brasil', 'Farmácia Popular Dist.'] },
  '10-10': { margemProjetada: -3.5, clientesAdicionaisRisco: 6, clientesRisco: ['Agro Norte', 'Bebidas Nacional', 'Comercial Ribeiro', 'TechParts Brasil', 'Farmácia Popular Dist.', 'Distribuidora Mineira'] },
  '0-5': { margemProjetada: 4.3, clientesAdicionaisRisco: 1, clientesRisco: ['Agro Norte'] },
  '0-10': { margemProjetada: 2.8, clientesAdicionaisRisco: 2, clientesRisco: ['Agro Norte', 'Bebidas Nacional'] },
  '5-10': { margemProjetada: 1.0, clientesAdicionaisRisco: 3, clientesRisco: ['Agro Norte', 'Bebidas Nacional', 'Farmácia Popular Dist.'] },
};

// ============================================================
// Horizonte — better ops, fewer negative clients
// ============================================================

const horizonteClients: Client[] = [
  {
    id: 'hz-c1', name: 'Lojas Americanas Dist.',
    receita: 320000, custoEstimado: 278000, margem: 42000, margemPercent: 13.1, viagens: 188,
    margemTrend: [12.0, 12.5, 13.0, 13.2, 13.0, 13.1],
    topRoutes: ['SP → RJ', 'SP → MG'], precoMinimoSugerido: 4.85,
  },
  {
    id: 'hz-c2', name: 'Natura Logística',
    receita: 245000, custoEstimado: 212000, margem: 33000, margemPercent: 13.5, viagens: 142,
    margemTrend: [12.8, 13.0, 13.2, 13.5, 13.4, 13.5],
    topRoutes: ['SP → SP', 'SP → PR'], precoMinimoSugerido: 4.80,
  },
  {
    id: 'hz-c3', name: 'Magazine Luiza Frete',
    receita: 198000, custoEstimado: 172000, margem: 26000, margemPercent: 13.1, viagens: 112,
    margemTrend: [12.2, 12.8, 13.0, 13.2, 13.0, 13.1],
    topRoutes: ['SP → MG', 'SP → PR'], precoMinimoSugerido: 4.90,
  },
  {
    id: 'hz-c4', name: 'Via Varejo Transportes',
    receita: 156000, custoEstimado: 136000, margem: 20000, margemPercent: 12.8, viagens: 88,
    margemTrend: [11.5, 12.0, 12.5, 12.8, 12.8, 12.8],
    topRoutes: ['SP → RJ'], precoMinimoSugerido: 4.95,
  },
  {
    id: 'hz-c5', name: 'Pão de Açúcar Dist.',
    receita: 178000, custoEstimado: 155000, margem: 23000, margemPercent: 12.9, viagens: 98,
    margemTrend: [12.0, 12.5, 12.8, 13.0, 12.8, 12.9],
    topRoutes: ['SP → SP', 'SP → RJ'], precoMinimoSugerido: 4.85,
  },
  {
    id: 'hz-c6', name: 'Carrefour Logística',
    receita: 210000, custoEstimado: 184000, margem: 26000, margemPercent: 12.4, viagens: 118,
    margemTrend: [11.8, 12.0, 12.2, 12.5, 12.4, 12.4],
    topRoutes: ['SP → MG', 'RJ → SP'], precoMinimoSugerido: 4.95,
  },
  {
    id: 'hz-c7', name: 'Leroy Merlin Frete',
    receita: 92000, custoEstimado: 80000, margem: 12000, margemPercent: 13.0, viagens: 52,
    margemTrend: [12.2, 12.5, 12.8, 13.0, 13.2, 13.0],
    topRoutes: ['SP → SP'], precoMinimoSugerido: 4.80,
  },
  {
    id: 'hz-c8', name: 'Raia Drogasil',
    receita: 134000, custoEstimado: 117000, margem: 17000, margemPercent: 12.7, viagens: 74,
    margemTrend: [11.8, 12.0, 12.5, 12.5, 12.8, 12.7],
    topRoutes: ['SP → MG', 'SP → PR'], precoMinimoSugerido: 4.90,
  },
  {
    id: 'hz-c9', name: 'Mercado Livre Express',
    receita: 86000, custoEstimado: 88580, margem: -2580, margemPercent: -3.0, viagens: 48,
    margemTrend: [-0.5, -1.0, -1.8, -2.2, -2.6, -3.0],
    topRoutes: ['SP → SP'], precoMinimoSugerido: 5.45,
  },
  {
    id: 'hz-c10', name: 'Amazon Entregas BR',
    receita: 68000, custoEstimado: 62000, margem: 6000, margemPercent: 8.8, viagens: 38,
    margemTrend: [10.0, 9.5, 9.2, 9.0, 8.8, 8.8],
    topRoutes: ['SP → SP'], precoMinimoSugerido: 5.10,
  },
  {
    id: 'hz-c11', name: 'DHL Brasil',
    receita: 165000, custoEstimado: 144000, margem: 21000, margemPercent: 12.7, viagens: 92,
    margemTrend: [12.0, 12.2, 12.5, 12.8, 12.6, 12.7],
    topRoutes: ['SP → PR', 'SP → SC'], precoMinimoSugerido: 4.85,
  },
  {
    id: 'hz-c12', name: 'FedEx Logística',
    receita: 148000, custoEstimado: 130000, margem: 18000, margemPercent: 12.2, viagens: 82,
    margemTrend: [11.5, 11.8, 12.0, 12.2, 12.4, 12.2],
    topRoutes: ['SP → RJ', 'SP → MG'], precoMinimoSugerido: 4.95,
  },
];

const horizonteRoutes: Route[] = [
  {
    id: 'hz-r1', origem: 'São Paulo', destino: 'Rio de Janeiro', viagens: 284, receita: 520000,
    margem: 65000, margemPercent: 12.5, reaisPerKm: 5.10, percentAbaixoPrecoMinimo: 12,
    margemTrend: [11.5, 12.0, 12.5, 12.5, 12.8, 12.5],
    topClients: ['Lojas Americanas Dist.', 'Via Varejo Transportes', 'Pão de Açúcar Dist.'],
    distanciaKm: 430,
  },
  {
    id: 'hz-r2', origem: 'São Paulo', destino: 'Minas Gerais', viagens: 218, receita: 410000,
    margem: 52000, margemPercent: 12.7, reaisPerKm: 5.15, percentAbaixoPrecoMinimo: 10,
    margemTrend: [11.8, 12.2, 12.5, 12.8, 12.6, 12.7],
    topClients: ['Magazine Luiza Frete', 'Carrefour Logística', 'Raia Drogasil'],
    distanciaKm: 580,
  },
  {
    id: 'hz-r3', origem: 'São Paulo', destino: 'Paraná', viagens: 196, receita: 380000,
    margem: 49000, margemPercent: 12.9, reaisPerKm: 5.20, percentAbaixoPrecoMinimo: 8,
    margemTrend: [12.0, 12.5, 12.8, 13.0, 12.8, 12.9],
    topClients: ['Natura Logística', 'DHL Brasil', 'Raia Drogasil'],
    distanciaKm: 410,
  },
  {
    id: 'hz-r4', origem: 'São Paulo', destino: 'São Paulo', viagens: 198, receita: 340000,
    margem: 42000, margemPercent: 12.4, reaisPerKm: 4.95, percentAbaixoPrecoMinimo: 15,
    margemTrend: [11.5, 12.0, 12.2, 12.5, 12.4, 12.4],
    topClients: ['Natura Logística', 'Leroy Merlin Frete', 'Mercado Livre Express'],
    distanciaKm: 150,
  },
  {
    id: 'hz-r5', origem: 'São Paulo', destino: 'Santa Catarina', viagens: 78, receita: 156000,
    margem: 20000, margemPercent: 12.8, reaisPerKm: 5.18, percentAbaixoPrecoMinimo: 10,
    margemTrend: [12.0, 12.2, 12.5, 12.8, 13.0, 12.8],
    topClients: ['DHL Brasil'],
    distanciaKm: 700,
  },
];

const horizonteMonthly: MonthlyData[] = [
  { month: 'Jan', margem: 11.5, receita: 1620000, custo: 1433700 },
  { month: 'Fev', margem: 12.0, receita: 1680000, custo: 1478400 },
  { month: 'Mar', margem: 12.3, receita: 1720000, custo: 1508440 },
  { month: 'Abr', margem: 12.5, receita: 1740000, custo: 1522500 },
  { month: 'Mai', margem: 12.4, receita: 1730000, custo: 1515480 },
  { month: 'Jun', margem: 12.2, receita: 1710000, custo: 1501380 },
];

const horizonteRisks: RiskItem[] = [
  { severity: 'medium', text: 'Mercado Livre Express com margem -3,0% nos últimos 3 meses' },
  { severity: 'low', text: 'Amazon Entregas BR com margem em queda: de 10,0% para 8,8%' },
  { severity: 'low', text: 'Diesel +5% pode colocar 1 cliente adicional em risco' },
];

const horizonteSimulations: Record<string, SimulationResult> = {
  '0-0': { margemProjetada: 12.2, clientesAdicionaisRisco: 0, clientesRisco: [] },
  '5-0': { margemProjetada: 9.5, clientesAdicionaisRisco: 1, clientesRisco: ['Amazon Entregas BR'] },
  '10-0': { margemProjetada: 6.8, clientesAdicionaisRisco: 2, clientesRisco: ['Amazon Entregas BR', 'FedEx Logística'] },
  '5-5': { margemProjetada: 8.2, clientesAdicionaisRisco: 1, clientesRisco: ['Amazon Entregas BR'] },
  '10-5': { margemProjetada: 5.5, clientesAdicionaisRisco: 3, clientesRisco: ['Amazon Entregas BR', 'FedEx Logística', 'Carrefour Logística'] },
  '10-10': { margemProjetada: 4.2, clientesAdicionaisRisco: 4, clientesRisco: ['Amazon Entregas BR', 'FedEx Logística', 'Carrefour Logística', 'Via Varejo Transportes'] },
  '0-5': { margemProjetada: 10.8, clientesAdicionaisRisco: 0, clientesRisco: [] },
  '0-10': { margemProjetada: 9.5, clientesAdicionaisRisco: 1, clientesRisco: ['Amazon Entregas BR'] },
  '5-10': { margemProjetada: 6.8, clientesAdicionaisRisco: 2, clientesRisco: ['Amazon Entregas BR', 'FedEx Logística'] },
};

// ============================================================
// Aggregated company data
// ============================================================

export const allCompanyData: Record<CompanyId, CompanyData> = {
  atlas: {
    company: companies[0],
    faturamentoMensal: 1280000,
    custoRealPorKm: 4.87,
    margemMediaGeral: 11.4,
    percentClientesNegativos: 22,
    totalClientes: 18,
    clientesNegativos: 4,
    clients: atlasClients,
    routes: atlasRoutes,
    monthlyData: atlasMonthly,
    risks: atlasRisks,
    simulationResults: atlasSimulations,
  },
  'serra-azul': {
    company: companies[1],
    faturamentoMensal: 730000,
    custoRealPorKm: 5.12,
    margemMediaGeral: 5.8,
    percentClientesNegativos: 40,
    totalClientes: 10,
    clientesNegativos: 4,
    clients: serraAzulClients,
    routes: serraAzulRoutes,
    monthlyData: serraAzulMonthly,
    risks: serraAzulRisks,
    simulationResults: serraAzulSimulations,
  },
  horizonte: {
    company: companies[2],
    faturamentoMensal: 1710000,
    custoRealPorKm: 4.62,
    margemMediaGeral: 12.2,
    percentClientesNegativos: 8,
    totalClientes: 12,
    clientesNegativos: 1,
    clients: horizonteClients,
    routes: horizonteRoutes,
    monthlyData: horizonteMonthly,
    risks: horizonteRisks,
    simulationResults: horizonteSimulations,
  },
};

// Helper to get simulation result with interpolation
export function getSimulationResult(companyId: CompanyId, diesel: number, pedagio: number): SimulationResult {
  const data = allCompanyData[companyId];
  const key = `${diesel}-${pedagio}`;
  if (data.simulationResults[key]) {
    return data.simulationResults[key];
  }
  // Nearest match
  const dieselRound = Math.round(diesel / 5) * 5;
  const pedagioRound = Math.round(pedagio / 5) * 5;
  const nearKey = `${dieselRound}-${pedagioRound}`;
  return data.simulationResults[nearKey] || data.simulationResults['0-0'];
}
