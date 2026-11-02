import { cn } from '@/lib/format';
import { exposureLabel, type Exposure } from '@/lib/nova-portfolio';

const styles: Record<Exposure, string> = {
  alta: 'bg-amber-50 text-amber-800',
  media: 'bg-zinc-100 text-zinc-700',
  baixa: 'bg-emerald-50 text-emerald-800',
};

export function ExposureBadge({ exposure }: { exposure: Exposure }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded px-2 py-0.5 text-[12px] font-medium',
        styles[exposure],
      )}
    >
      {exposureLabel[exposure]}
    </span>
  );
}
