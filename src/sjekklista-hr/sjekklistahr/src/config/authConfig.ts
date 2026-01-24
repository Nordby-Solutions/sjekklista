/**
 * OIDC Configuration for IDP authentication
 * Supports refresh token flow for future token refresh implementation
 */

export const authConfig = {
  authority: import.meta.env.VITE_AUTH_AUTHORITY,
  client_id: import.meta.env.VITE_AUTH_CLIENT_ID,
  redirect_uri: import.meta.env.VITE_AUTH_REDIRECT_URI,
  response_type: 'code',
  scope: 'openid profile api://cbb438ce-224e-475b-9cea-c1b36646f434/access',
  // Post-logout redirect URI
  post_logout_redirect_uri: import.meta.env.VITE_AUTH_POST_LOGOUT_URI,
  // Enable silent renew for automatic token refresh
  automaticSilentRenew: true,
  // These settings support future refresh token implementation
  monitorSession: true,
  checkSessionIframeInterval: 2000,
};
