import axios, { type AxiosInstance } from 'axios';
import { authService } from '../services/authService';

export class ApiClient {
  private httpClient: AxiosInstance;
  private tenantId: string | null = null;

  constructor(baseURL: string = import.meta.env.VITE_API_BASE_URL || '/api') {
    this.httpClient = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor to include tenant ID and auth token
    this.httpClient.interceptors.request.use(async (config) => {
      console.log('API Client Tenant ID:', this.tenantId);
      if (this.tenantId) {
        config.headers['X-Tenant'] = this.tenantId;
      }

      // Add authorization header with access token
      const accessToken = await authService.getAccessToken();
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }

      return config;
    });

    // Add response interceptor to handle 401 errors
    this.httpClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // If 401 and not already retried, try to refresh token
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const newUser = await authService.renewToken();
            if (newUser) {
              const newToken = newUser.access_token;
              originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
              return this.httpClient(originalRequest);
            }
          } catch (refreshError) {
            console.error('Token refresh failed:', refreshError);
            // Token refresh failed, redirect to login will be handled by auth service
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
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
