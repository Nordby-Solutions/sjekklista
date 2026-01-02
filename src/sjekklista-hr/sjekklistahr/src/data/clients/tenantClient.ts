import { apiClient } from '../apiClient';
import type { 
  TenantDto, 
  GetTenantsResponse
} from '../models';

export class TenantClient {
  async getTenants(): Promise<TenantDto[]> {
    const response = await apiClient.getHttpClient().get<GetTenantsResponse>(
      '/user/tenants',
    );
    return response.data.tenants || [];
  }
}

export const tenantClient = new TenantClient();
