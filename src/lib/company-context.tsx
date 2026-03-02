'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { CompanyId, allCompanyData, CompanyData } from './demo-data';

interface CompanyContextType {
  companyId: CompanyId;
  setCompanyId: (id: CompanyId) => void;
  data: CompanyData;
}

const CompanyContext = createContext<CompanyContextType | null>(null);

export function CompanyProvider({ children }: { children: ReactNode }) {
  const [companyId, setCompanyId] = useState<CompanyId>('atlas');
  const data = allCompanyData[companyId];

  return (
    <CompanyContext.Provider value={{ companyId, setCompanyId, data }}>
      {children}
    </CompanyContext.Provider>
  );
}

export function useCompany() {
  const ctx = useContext(CompanyContext);
  if (!ctx) throw new Error('useCompany must be used within CompanyProvider');
  return ctx;
}
