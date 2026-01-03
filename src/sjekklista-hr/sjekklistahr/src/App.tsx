import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TenantProvider } from './context/TenantContext';
import { MainLayout } from './components/MainLayout';
import { Home } from './pages/Home';
import { Employees } from './pages/employment/employee/Employees';
import { LoginPage } from './pages/LoginPage';
import { AuthCallback } from './pages/AuthCallback';
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
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/callback" element={<AuthCallback />} />

        {/* Protected tenant-based routes */}
        <Route
          path="/t/:tenantSlug"
          element={
            <ProtectedRoute>
              <TenantProvider>
                <MainLayout />
              </TenantProvider>
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="employment">
            <Route path="employees" element={<Employees />} />
            <Route path="employees/edit/:employeeId" element={<EmployeeManagement />} />
            <Route path="employees/create" element={<EmployeeManagement />} />
          </Route>
          <Route path="schedule" element={<div>Schedule page coming soon...</div>} />
          <Route path="tasks" element={<div>Tasks page coming soon...</div>} />
        </Route>

        {/* Protected tenant selection */}
        <Route
          path="/select-tenant"
          element={
            <ProtectedRoute>
              <TenantSelection />
            </ProtectedRoute>
          }
        />

        {/* Default redirect to select tenant */}
        <Route path="/" element={<Navigate to="/select-tenant" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
