import React from 'react';
import { Link } from 'react-router-dom';
import { useTenant } from '../context/TenantContext';
import { getTenantBasePath } from '../utils/tenantHelper';
import './NavMenu.css';

export const NavMenu: React.FC = () => {
  const { tenantSlug } = useTenant();
  const basePath = getTenantBasePath(tenantSlug);

  return (
    <nav className="sl-nav">
      <Link to={`${basePath}/`} className="sl-item">
        <span className="e-icons e-home sl-icon"></span>
        <span>Hjem</span>
      </Link>

      <Link to={`${basePath}/employment/employees`} className="sl-item">
        <span className="e-icons e-people sl-icon"></span>
        <span>Ansatte</span>
      </Link>

      <Link to={`${basePath}/schedule`} className="sl-item">
        <span className="e-icons e-timeline-agenda sl-icon"></span>
        <span>Ferieplanlegger</span>
      </Link>

      <Link to={`${basePath}/tasks`} className="sl-item">
        <span className="e-icons e-check sl-icon"></span>
        <span>Arbeidsoppgaver</span>
      </Link>
    </nav>
  );
};
