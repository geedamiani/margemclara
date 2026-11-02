import { cn } from '@/lib/format';

export function Mark({
  className,
  size = 'md',
  tone = 'dark',
}: {
  className?: string;
  size?: 'sm' | 'md';
  tone?: 'dark' | 'light';
}) {
  return (
    <span
      aria-hidden
      className={cn(
        'inline-grid place-items-center rounded-md font-semibold',
        size === 'sm' ? 'size-5 text-[8px]' : 'size-7 text-xs',
        tone === 'dark' ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-900',
        className,
      )}
    >
      MC
    </span>
  );
}
