import axios, { type AxiosInstance } from 'axios';

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

    // Add request interceptor to include tenant ID
    this.httpClient.interceptors.request.use((config) => {
      console.log('API Client Tenant ID:', this.tenantId);
      if (this.tenantId) {
        config.headers['X-Tenant'] = this.tenantId;
      }
      return config;
    });
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
