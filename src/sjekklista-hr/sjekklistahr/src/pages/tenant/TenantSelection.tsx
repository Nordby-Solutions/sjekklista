import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tenantClient } from '../../data/clients/tenantClient';
import type { TenantDto } from '../../data/models';
import './TenantSelection.css';

export const TenantSelection: React.FC = () => {
  const [tenants, setTenants] = useState<TenantDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadTenants = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await tenantClient.getTenants();
        setTenants(data);
        if (data.length === 1) {
          // Auto-select the only tenant
          navigate(`/t/${data[0].slug}`, { replace: true });
        }
      } catch (err) {
        console.error('Failed to load tenants', err);
        setError('Kunne ikke hente virksomheter. Prøv igjen senere.');
      } finally {
        setLoading(false);
      }
    };

    loadTenants();
  }, [navigate]);

  const handleSelect = (tenant: TenantDto) => {
    navigate(`/t/${tenant.slug}`);
  };

  const handleContactAdmin = () => {
    // Placeholder - no-op for now
    alert('Kontakt administrator for tilgang.');
  };

  const handleSignup = () => {
    // Placeholder - no-op for now
    alert('Signup kommer snart.');
  };

  if (loading) {
    return (
      <div className="tenant-select-wrapper">
        <div className="tenant-card">Laster virksomheter...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="tenant-select-wrapper">
        <div className="tenant-card error">{error}</div>
      </div>
    );
  }

  if (tenants.length === 0) {
    return (
      <div className="tenant-select-wrapper">
        <div className="tenant-card">
          <h1>Ingen virksomheter funnet</h1>
          <p>Finner du ikke virksomheten din? Kontakt administrator eller registrer deg.</p>
          <div className="tenant-actions">
            <button onClick={handleContactAdmin}>Kontakt administrator</button>
            <button className="secondary" onClick={handleSignup}>Registrer ny virksomhet</button>
          </div>
        </div>
      </div>
    );
  }

  if (tenants.length === 1) {
    // Auto-redirect handled; show a small message meanwhile
    return (
      <div className="tenant-select-wrapper">
        <div className="tenant-card">Sender deg til din virksomhet...</div>
      </div>
    );
  }

  return (
    <div className="tenant-select-wrapper">

      <h1>Sjekklista HR</h1>

      <div className="tenant-card">
        <h1>Velg virksomhet</h1>
        <p>Velg riktig virksomhet for å fortsette.</p>
        <div className="tenant-list">
          {tenants.map((t) => (
            <button key={t.id} className="tenant-item" onClick={() => handleSelect(t)}>
              <div className="tenant-name">{t.name}</div>
              <div className="tenant-slug">{t.slug}</div>
            </button>
          ))}
        </div>
        <div className="tenant-actions">
          <button onClick={handleContactAdmin}>Ser noe feil? Kontakt administrator</button>
          <button className="secondary" onClick={handleSignup}>Registrer ny virksomhet</button>
        </div>
      </div>
    </div>
  );
};
