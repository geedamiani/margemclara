import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

let _supabase: SupabaseClient | null = null;

function getSupabase(): SupabaseClient | null {
  if (!supabaseUrl || !supabaseAnonKey) return null;
  if (!_supabase) {
    _supabase = createClient(supabaseUrl, supabaseAnonKey);
  }
  return _supabase;
}

export type LeadSource = 'landing' | 'calculadora';

export interface LeadData {
  source: LeadSource;
  nome: string;
  email: string;
  whatsapp: string;
  empresa: string;
  frota?: number | null;
  faturamento_anual?: string | null;
  objetivo?: string | null;
  mensagem?: string | null;
}

export async function insertLead(data: LeadData): Promise<{ success: boolean; error?: string }> {
  const supabase = getSupabase();

  if (!supabase) {
    console.error(
      '[Margem Clara] Supabase não configurado. Defina NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY.'
    );
    return { success: false, error: 'supabase_not_configured' };
  }

  try {
    const { error } = await supabase.from('leads').insert([data]);

    if (error) {
      console.error('[Margem Clara] Erro ao inserir lead:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'unknown_error';
    console.error('[Margem Clara] Erro ao inserir lead:', message);
    return { success: false, error: message };
  }
}
