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

  // If Supabase is not configured, log and return success for dev
  if (!supabase) {
    console.warn('[Margem Clara] Supabase não configurado. Lead capturado apenas no console:', data);
    return { success: true };
  }

  const { error } = await supabase.from('leads').insert([data]);

  if (error) {
    console.error('[Margem Clara] Erro ao inserir lead:', error.message);
    return { success: false, error: error.message };
  }

  return { success: true };
}
