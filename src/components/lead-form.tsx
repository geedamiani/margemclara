'use client';

import { useState } from 'react';
import { cn } from '@/lib/format';
import { insertLead, type LeadSource } from '@/lib/supabase';
import { Loader2, Check } from 'lucide-react';

interface LeadFormProps {
  source: LeadSource;
  compact?: boolean;
}

const inputBase =
  'w-full rounded-lg border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition-colors focus:border-zinc-400 focus:ring-1 focus:ring-zinc-200';
const labelBase = 'block text-[13px] font-medium text-zinc-700 mb-1.5';

export function LeadForm({ source, compact = false }: LeadFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [form, setForm] = useState({
    nome: '',
    email: '',
    whatsapp: '',
    empresa: '',
  });

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === 'loading' || status === 'success') return;

    setStatus('loading');

    const result = await insertLead({
      source,
      nome: form.nome,
      email: form.email,
      whatsapp: form.whatsapp,
      empresa: form.empresa,
    });

    if (result.success) {
      setStatus('success');
    } else {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-8 text-center">
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900">
          <Check size={18} className="text-white" />
        </div>
        <p className="text-[15px] font-medium text-zinc-900">
          Recebido.
        </p>
        <p className="mt-1 text-sm text-zinc-500">
          Vamos retornar assim que houver disponibilidade de entrada.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className={cn(compact ? 'space-y-3' : 'grid grid-cols-1 sm:grid-cols-2 gap-4')}>
        <div>
          <label htmlFor={`${source}-nome`} className={labelBase}>
            Nome
          </label>
          <input
            id={`${source}-nome`}
            type="text"
            required
            value={form.nome}
            onChange={(e) => update('nome', e.target.value)}
            placeholder="Seu nome"
            className={inputBase}
          />
        </div>
        <div>
          <label htmlFor={`${source}-email`} className={labelBase}>
            Email
          </label>
          <input
            id={`${source}-email`}
            type="email"
            required
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            placeholder="email@empresa.com"
            className={inputBase}
          />
        </div>
        <div>
          <label htmlFor={`${source}-whatsapp`} className={labelBase}>
            WhatsApp
          </label>
          <input
            id={`${source}-whatsapp`}
            type="tel"
            required
            value={form.whatsapp}
            onChange={(e) => update('whatsapp', e.target.value)}
            placeholder="(11) 99999-0000"
            className={inputBase}
          />
        </div>
        <div>
          <label htmlFor={`${source}-empresa`} className={labelBase}>
            Empresa
          </label>
          <input
            id={`${source}-empresa`}
            type="text"
            required
            value={form.empresa}
            onChange={(e) => update('empresa', e.target.value)}
            placeholder="Nome da transportadora"
            className={inputBase}
          />
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className={cn(
          'w-full rounded-lg bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition-all',
          'hover:bg-zinc-800 active:scale-[0.99]',
          'disabled:opacity-60 disabled:cursor-not-allowed',
          compact && 'py-2.5'
        )}
      >
        {status === 'loading' ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 size={14} className="animate-spin" />
            Enviando...
          </span>
        ) : (
          'Solicitar acesso'
        )}
      </button>

      {/* Error message */}
      {status === 'error' && (
        <p className="text-[13px] text-red-600 text-center">
          Não foi possível enviar agora. Tente novamente em alguns minutos.
        </p>
      )}

      {/* Privacy note */}
      <p className="text-[11px] text-zinc-400 text-center">
        Sem spam. Contato apenas sobre a entrada controlada.
      </p>
    </form>
  );
}
