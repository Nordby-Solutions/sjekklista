import type { Configuration } from '@azure/msal-browser';

export const msalConfig: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_AUTH_CLIENT_ID,
    authority: import.meta.env.VITE_AUTH_AUTHORITY,
    redirectUri: import.meta.env.VITE_AUTH_REDIRECT_URI,
  },
  cache: {
    cacheLocation: 'sessionStorage',
  },
};

export const loginRequest = {
  scopes: [
  'openid',
  'profile',
  'api://cbb438ce-224e-475b-9cea-c1b36646f434/access', // Request API consent during login
  ],
};

export const tokenRequest = {
  scopes: ['api://cbb438ce-224e-475b-9cea-c1b36646f434/access'],
};
