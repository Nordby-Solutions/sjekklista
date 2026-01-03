/**
 * Login Page
 * Initiates the OIDC login flow
 */

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export const LoginPage: React.FC = () => {
  const { login, error } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      await login();
    } catch (err) {
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ maxWidth: '400px' }}>
        <h1>Sjekklista</h1>
        <p>Sign in to your account</p>

        {error && (
          <div style={{ color: '#d32f2f', marginBottom: '1rem', padding: '0.5rem', border: '1px solid #d32f2f', borderRadius: '4px' }}>
            {error}
          </div>
        )}

        <button
          onClick={handleLogin}
          disabled={isLoading}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            opacity: isLoading ? 0.6 : 1,
            width: '100%',
          }}
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>
      </div>
    </div>
  );
};
