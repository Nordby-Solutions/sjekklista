import axios, { type AxiosInstance } from 'axios';
import type { PublicClientApplication } from '@azure/msal-browser';
import { tokenRequest } from '../config/authConfig';

export class ApiClient {
  private httpClient: AxiosInstance;
  private tenantId: string | null = null;
  private msalInstance: PublicClientApplication | null = null;

  constructor(baseURL: string = import.meta.env.VITE_API_BASE_URL || '/api') {
    this.httpClient = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor to include tenant ID and auth token
    this.httpClient.interceptors.request.use(async (config) => {
      if (this.tenantId) {
        config.headers['X-Tenant'] = this.tenantId;
      }

      // Add authorization header with access token
      if (this.msalInstance) {
        try {
          const accounts = this.msalInstance.getAllAccounts();
          
          if (accounts.length > 0) {
            const response = await this.msalInstance.acquireTokenSilent({
              ...tokenRequest,
              account: accounts[0],
            });
            config.headers['Authorization'] = `Bearer ${response.accessToken}`;
            console.log('✅ Access token added to request:', config.url);
          } else {
            console.warn('⚠️ No authenticated accounts found - API request will be sent without token');
          }
        } catch (error) {
          console.error('❌ Token acquisition failed:', error);
          // If silent token acquisition fails, the user might need to re-authenticate
        }
      } else {
        console.warn('⚠️ MSAL instance not initialized on apiClient');
      }

      return config;
    });

      // Example: Axios interceptor for your apiClient.ts
      this.httpClient.interceptors.response.use(
          (response) => response,
          (error) => {
              if (error.response?.status === 400) {
                  // Validation error - likely a frontend bug
                  console.error('Validation failed:', error.response.data);
                  if (import.meta.env.DEV) {
                      // In dev, show actual errors
                  } else {
                      // In prod, generic message + log to monitoring
                      console.error(error);
                  }
              } else if ([404, 409, 422].includes(error.response?.status)) {
                  // Business logic errors - show to user
                  const errors = error.response.data as Error[];
                  const message = errors[0]?.message || 'Operation failed';
                  console.error(message);
              } else if (error.response?.status >= 500) {
                  // Server error
                  console.error(error);
              }
              return Promise.reject(error);
          }
      );

    // Add response interceptor to handle 401 errors
    this.httpClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // If 401 and not already retried, try to refresh token
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          // Token expired, will be handled by MSAL automatically on next request
          console.error('Token expired');
        }

        return Promise.reject(error);
      }
    );
  }

  setMsalInstance(instance: PublicClientApplication) {
    this.msalInstance = instance;
  }

  setTenantId(tenantId: string | null) {
    this.tenantId = tenantId;
  }

  getTenantId(): string | null {
    return this.tenantId;
  }

  getHttpClient(): AxiosInstance {
    return this.httpClient;
  }
}

export const apiClient = new ApiClient();
