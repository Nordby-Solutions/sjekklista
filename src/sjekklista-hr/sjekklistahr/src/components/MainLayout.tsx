import React, { useState, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarComponent } from '@syncfusion/ej2-react-navigations';
import { AppBarComponent } from '@syncfusion/ej2-react-navigations';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { NavMenu } from './NavMenu';
import { useTenant } from '../context/TenantContext';
import './MainLayout.css';

export const MainLayout: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const sidebarRef = useRef<SidebarComponent>(null);
  const { tenantId } = useTenant();

  const toggleDrawer = () => {
    console.log('Toggling drawer. Current state:', tenantId);
    if (sidebarRef.current) {
      sidebarRef.current.toggle();
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="layout-container">
      <SidebarComponent
        ref={sidebarRef}
        isOpen={isOpen}
        type="Push"
        enableGestures={false}
        width="260px"
        enableDock={false}
      >
        <NavMenu />
      </SidebarComponent>

      <div className="main-wrapper">
        <AppBarComponent colorMode="Primary">
          <ButtonComponent
            cssClass="e-inherit menu"
            iconCss="e-icons e-menu"
            onClick={toggleDrawer}
            aria-label="menu"
          />

          <span className="regular" style={{ marginLeft: '12px' }}>
            Sjekklista HR
          </span>

          <div className="e-appbar-spacer"></div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div className="e-avatar e-avatar-small e-avatar-circle image">SN</div>
            <div>
              <label style={{ display: 'block' }}>Sebastian Nordby</label>
              <label style={{ fontSize: '.9em' }}>Administrator</label>
            </div>
          </div>
        </AppBarComponent>

        <main className="page-content">
          {/* {tenantId && <div className="tenant-info">Current tenant: {tenantId}</div>} */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};
