/**
 * Login Page
 * Initiates the MSAL login flow via redirect
 */

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import { loginRequest } from '../config/authConfig';

export const LoginPage: React.FC = () => {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();

  // If already authenticated, redirect to select-tenant
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/select-tenant', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = () => {
    instance.loginRedirect(loginRequest);
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ maxWidth: '400px' }}>
        <h1>Sjekklista</h1>
        <p>Sign in to your account</p>

        <button
          onClick={handleLogin}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            width: '100%',
          }}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};
