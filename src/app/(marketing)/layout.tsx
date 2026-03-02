import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Margem Clara — Inteligência financeira para transportadoras',
  description:
    'Clareza real de custo por km e margem por cliente antes da decisão. Solicite acesso.',
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
