/**
 * OIDC Configuration for IDP authentication
 * Supports refresh token flow for future token refresh implementation
 */

export const authConfig = {
  authority: import.meta.env.VITE_AUTH_AUTHORITY || 'https://localhost:5001',
  client_id: import.meta.env.VITE_AUTH_CLIENT_ID || 'react-client',
  redirect_uri: import.meta.env.VITE_AUTH_REDIRECT_URI || 'http://localhost:3000/callback',
  response_type: 'code',
  scope: 'openid profile sjekklista.api',
  // Post-logout redirect URI
  post_logout_redirect_uri: import.meta.env.VITE_AUTH_POST_LOGOUT_URI || 'http://localhost:3000',
  // Enable silent renew for automatic token refresh
  automaticSilentRenew: true,
  // These settings support future refresh token implementation
  monitorSession: true,
  checkSessionIframeInterval: 2000,
};
