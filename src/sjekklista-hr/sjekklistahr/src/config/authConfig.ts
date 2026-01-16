/**
 * OIDC Configuration for IDP authentication
 * Supports refresh token flow for future token refresh implementation
 */

if (!import.meta.env.VITE_AUTH_CLIENT_ID)
    throw new Error('VITE_AUTH_CLIENT_ID is not defined in environment variables');
if (!import.meta.env.VITE_AUTH_AUTHORITY)
    throw new Error('VITE_AUTH_AUTHORITY is not defined in environment variables');
if (!import.meta.env.VITE_AUTH_REDIRECT_URI)
    throw new Error('VITE_AUTH_REDIRECT_URI is not defined in environment variables');
if (!import.meta.env.VITE_AUTH_POST_LOGOUT_URI)
    throw new Error('VITE_AUTH_POST_LOGOUT_URI is not defined in environment variables');

export const authConfig = {
  authority: import.meta.env.VITE_AUTH_AUTHORITY,
  client_id: import.meta.env.VITE_AUTH_CLIENT_ID,
  redirect_uri: import.meta.env.VITE_AUTH_REDIRECT_URI,
  response_type: 'code',
  scope: 'openid profile sjekklista.api.hr',
  // Post-logout redirect URI
  post_logout_redirect_uri: import.meta.env.VITE_AUTH_POST_LOGOUT_URI,
  // Enable silent renew for automatic token refresh
  automaticSilentRenew: true,
  // These settings support future refresh token implementation
  monitorSession: true,
  checkSessionIframeInterval: 2000,
};
