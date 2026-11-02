/** Money parsing and the single-freight margin used by the /nova calculator. */

export interface FreightInput {
  frete: number;
  distanciaKm: number;
  combustivel: number;
  pedagio: number;
  outros: number;
}

export interface FreightResult {
  frete: number;
  distanciaKm: number;
  combustivel: number;
  pedagio: number;
  outros: number;
  custo: number;
  margemReais: number;
  /** Null when freight is zero, so the percent is not invented. */
  margemPercent: number | null;
  /** Null when distance is zero. */
  margemPorKm: number | null;
}

/**
 * Accepts Brazilian money (`4.800,00`), plain numbers (`4800`),
 * and a dot decimal (`4800.50`). Thousands dots are only treated as
 * separators when there is no comma, or when grouped as 1.250 / 12.500.
 */
export function parseMoney(raw: string): number {
  const cleaned = raw
    .trim()
    .replace(/\s/g, '')
    .replace(/^R\$/i, '');

  if (!cleaned) return 0;

  let normalized = cleaned;
  if (cleaned.includes(',')) {
    normalized = cleaned.replace(/\./g, '').replace(',', '.');
  } else if (/^-?\d{1,3}(\.\d{3})+$/.test(cleaned)) {
    normalized = cleaned.replace(/\./g, '');
  }

  const value = Number(normalized);
  return Number.isFinite(value) ? value : 0;
}

export function freightResult(input: FreightInput): FreightResult {
  const frete = Math.max(0, input.frete);
  const distanciaKm = Math.max(0, input.distanciaKm);
  const combustivel = Math.max(0, input.combustivel);
  const pedagio = Math.max(0, input.pedagio);
  const outros = Math.max(0, input.outros);
  const custo = combustivel + pedagio + outros;
  const margemReais = frete - custo;

  return {
    frete,
    distanciaKm,
    combustivel,
    pedagio,
    outros,
    custo,
    margemReais,
    margemPercent: frete > 0 ? (margemReais / frete) * 100 : null,
    margemPorKm: distanciaKm > 0 ? margemReais / distanciaKm : null,
  };
}

export function reajusteParaMargem(receita: number, custo: number, target: number) {
  const empatar = custo;
  const comMeta = target < 1 ? custo / (1 - target) : custo;

  return {
    empatar,
    aumentoEmpatar: empatar - receita,
    percentualEmpatar: receita > 0 ? ((empatar - receita) / receita) * 100 : null,
    comMeta,
    aumentoMeta: comMeta - receita,
    percentualMeta: receita > 0 ? ((comMeta - receita) / receita) * 100 : null,
  };
}
