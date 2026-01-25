/**
 * Callback Page
 * Handles the MSAL redirect and navigates to the app
 */

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';

export const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const { inProgress } = useMsal();

  useEffect(() => {
    // Wait for MSAL to finish handling the redirect
    if (inProgress === 'none') {
      // Redirect to tenant selection after successful authentication
      navigate('/select-tenant', { replace: true });
    }
  }, [inProgress, navigate]);

  return (
    <div style={{ padding: '2rem', textAlign: 'center', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div>
        <h1>Processing authentication...</h1>
        <p>Please wait while we complete your sign-in.</p>
      </div>
    </div>
  );
};
