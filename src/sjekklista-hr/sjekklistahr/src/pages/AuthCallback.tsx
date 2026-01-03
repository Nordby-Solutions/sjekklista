/**
 * Callback Page
 * Handles the redirect from the IDP after authentication
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

export const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const user = await authService.handleCallback();
        if (user) {
          // Redirect to tenant selection or home
          navigate('/select-tenant', { replace: true });
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Authentication failed';
        setError(errorMessage);
        console.error('Callback error:', err);
        // Redirect to login on error
        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 3000);
      }
    };

    handleCallback();
  }, [navigate]);

  if (error) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Authentication Error</h1>
        <p>{error}</p>
        <p>Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Processing Authentication</h1>
      <p>Please wait while we complete your login...</p>
    </div>
  );
};
