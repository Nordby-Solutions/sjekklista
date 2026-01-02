import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TenantProvider } from './context/TenantContext';
import { MainLayout } from './components/MainLayout';
import { Home } from './pages/Home';
import { Employees } from './pages/employment/employee/Employees';
import './App.css';

// Import Syncfusion styles
import '@syncfusion/ej2-base/styles/fabric.css';
import '@syncfusion/ej2-buttons/styles/fabric.css';
import '@syncfusion/ej2-inputs/styles/fabric.css';
import '@syncfusion/ej2-popups/styles/fabric.css';
import '@syncfusion/ej2-lists/styles/fabric.css';
import '@syncfusion/ej2-navigations/styles/fabric.css';
import '@syncfusion/ej2-grids/styles/fabric.css';
import '@syncfusion/ej2-splitbuttons/styles/fabric.css';
import '@syncfusion/ej2-calendars/styles/fabric.css';
import '@syncfusion/ej2-dropdowns/styles/fabric.css';
import EmployeeManagement from './pages/employment/employee/EmployeeManagement';
import { TenantSelection } from './pages/tenant/TenantSelection';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Tenant-based routes */}
        <Route path="/t/:tenantSlug" element={<TenantProvider><MainLayout /></TenantProvider>}>
          <Route index element={<Home />} />
          <Route path="employment">
            <Route path="employees" element={<Employees />} />
            <Route path="employees/edit/:employeeId" element={<EmployeeManagement />} />
            <Route path="employees/create" element={<EmployeeManagement />} />
          </Route>
          <Route path="schedule" element={<div>Schedule page coming soon...</div>} />
          <Route path="tasks" element={<div>Tasks page coming soon...</div>} />
        </Route>

        {/* Tenant selection */}
        <Route path="/" element={<TenantSelection />} />
        <Route path="/select-tenant" element={<TenantSelection />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
