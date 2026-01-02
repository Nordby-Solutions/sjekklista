import React, { createContext, useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiClient } from '../data/apiClient';
import type { TenantDto } from '../data/models';
import { tenantClient } from '../data/clients/tenantClient';

interface TenantContextType {
  tenantId: string; // underlying GUID/id for API calls
  tenantSlug: string; // slug for routing
  tenant: TenantDto | null;
  isResolved: boolean;
  setTenant: (tenant: TenantDto) => void;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export const useTenant = (): TenantContextType => {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
};

interface TenantProviderProps {
  children: React.ReactNode;
}

export const TenantProvider: React.FC<TenantProviderProps> = ({ children }) => {
  const [tenant, setTenantState] = useState<TenantDto | null>(null);
  const [isResolved, setIsResolved] = useState(false);
  const { tenantSlug: tenantSlugFromRoute } = useParams<{ tenantSlug: string }>();
  
  const setTenant = (tenant: TenantDto) => {
    setTenantState(tenant);
    apiClient.setTenantId(tenant.id);
    setIsResolved(true);
  };

  useEffect(() => {
    if (tenantSlugFromRoute) {
      (async() => {
        const tenants = await tenantClient.getTenants();
        const selectedTenant = tenants.find(t => t.slug === tenantSlugFromRoute || t.id === tenantSlugFromRoute);
        if(selectedTenant) {
          setTenant(selectedTenant);
        }
      })();
    }
  }, [tenantSlugFromRoute]);

  return (
    <TenantContext.Provider value={{ tenantId: tenant?.id || '', tenantSlug: tenant?.slug || '', tenant, isResolved, setTenant }}>
      {children}
    </TenantContext.Provider>
  );
};
