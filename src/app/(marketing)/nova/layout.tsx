import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: {
    absolute: 'Margem Clara: quais clientes estão comendo sua margem',
  },
  description:
    'Para transportadoras de 5 a 30 caminhões. Veja a margem real de cada embarcador, gere o Dossiê de Repasse e a exposição de cada cliente à reforma tributária. 14 dias grátis.',
};

export default function NovaLayout({ children }: { children: ReactNode }) {
  return children;
}
