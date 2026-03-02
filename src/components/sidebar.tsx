'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/format';
import { useCompany } from '@/lib/company-context';
import { companies, CompanyId } from '@/lib/demo-data';
import { useState, useRef, useEffect } from 'react';
import {
  BarChart3,
  Users,
  MapPin,
  SlidersHorizontal,
  Upload,
  FileText,
  Settings,
  ChevronDown,
  Check,
  Building2,
} from 'lucide-react';

const navItems = [
  { href: '/painel', label: 'Visão Geral', icon: BarChart3 },
  { href: '/clientes', label: 'Clientes', icon: Users },
  { href: '/rotas', label: 'Rotas', icon: MapPin },
  { href: '/simulacao', label: 'Simulação', icon: SlidersHorizontal },
  { href: '/importar', label: 'Importar Dados', icon: Upload },
  { href: '/relatorios', label: 'Relatórios', icon: FileText },
  { href: '/configuracoes', label: 'Configurações', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { companyId, setCompanyId, data } = useCompany();
  const [switcherOpen, setSwitcherOpen] = useState(false);
  const switcherRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (switcherRef.current && !switcherRef.current.contains(e.target as Node)) {
        setSwitcherOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <aside className="w-64 border-r border-zinc-200 bg-white flex flex-col h-screen fixed left-0 top-0 z-30">
      {/* Logo */}
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center">
            <span className="text-white font-semibold text-sm">MC</span>
          </div>
          <div>
            <span className="font-semibold text-zinc-900 text-[15px] tracking-tight">Margem Clara</span>
          </div>
        </div>
      </div>

      {/* Account Switcher */}
      <div className="px-3 mb-2" ref={switcherRef}>
        <button
          onClick={() => setSwitcherOpen(!switcherOpen)}
          className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-zinc-50 transition-colors text-left"
        >
          <div className="w-7 h-7 rounded-md bg-zinc-100 flex items-center justify-center flex-shrink-0">
            <Building2 size={14} className="text-zinc-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-medium text-zinc-900 truncate">{data.company.shortName}</p>
            <p className="text-[11px] text-zinc-400 truncate">{data.company.cnpj}</p>
          </div>
          <ChevronDown size={14} className={cn('text-zinc-400 transition-transform', switcherOpen && 'rotate-180')} />
        </button>

        {switcherOpen && (
          <div className="mt-1 rounded-lg border border-zinc-200 bg-white shadow-lg overflow-hidden">
            {companies.map((c) => (
              <button
                key={c.id}
                onClick={() => { setCompanyId(c.id as CompanyId); setSwitcherOpen(false); }}
                className={cn(
                  'w-full flex items-center gap-2.5 px-3 py-2.5 text-left hover:bg-zinc-50 transition-colors',
                  c.id === companyId && 'bg-zinc-50',
                )}
              >
                <div className="w-6 h-6 rounded-md bg-zinc-100 flex items-center justify-center flex-shrink-0">
                  <Building2 size={12} className="text-zinc-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-zinc-900 truncate">{c.shortName}</p>
                </div>
                {c.id === companyId && <Check size={14} className="text-zinc-900 flex-shrink-0" />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 mt-2">
        <div className="space-y-0.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/painel' && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] font-medium transition-colors',
                  isActive
                    ? 'bg-zinc-100 text-zinc-900'
                    : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50',
                )}
              >
                <Icon size={16} strokeWidth={isActive ? 2 : 1.5} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Demo Mode Badge + Footer */}
      <div className="px-3 pb-4 mt-auto">
        <div className="px-2.5 py-2 rounded-lg bg-amber-50 border border-amber-200">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="text-[11px] font-medium text-amber-700">Ambiente Demo</span>
          </div>
          <p className="text-[10px] text-amber-600 mt-0.5">Dados simulados para demonstração</p>
        </div>
        <p className="text-[10px] text-zinc-300 mt-3 px-1">Entrada controlada · v0.1.0</p>
      </div>
    </aside>
  );
}
