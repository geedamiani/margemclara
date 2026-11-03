import { formatCurrency, formatCurrencyDecimal, formatPercent } from '@/lib/format';

export function formatSignedBRL(value: number, decimals: 0 | 2 = 0): string {
  const formatted =
    decimals === 2 ? formatCurrencyDecimal(Math.abs(value)) : formatCurrency(Math.abs(value));
  if (value < 0) return `-${formatted}`;
  if (value > 0) return `+${formatted}`;
  return formatted;
}

export function formatSignedPercent(value: number): string {
  const formatted = formatPercent(value);
  if (value > 0) return `+${formatted}`;
  return formatted;
}

export function formatPerKm(value: number): string {
  const abs = Math.abs(value).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const core = `R$ ${abs}/km`;
  if (value < 0) return `-${core}`;
  return core;
}
