import { apiClient } from '../apiClient';
import type { 
  EmployeeDto, 
  GetEmployeesRequest, 
  GetEmployeesResponse,
  CreateEmployeeRequest,
  CreateEmployeeResponse 
} from '../models';

export class EmployeeClient {
  async getEmployees(request: GetEmployeesRequest): Promise<EmployeeDto[]> {
    const response = await apiClient.getHttpClient().post<GetEmployeesResponse>(
      '/api/employment/employees/list',
      request
    );
    return response.data.employees || [];
  }

  async createEmployee(request: CreateEmployeeRequest): Promise<EmployeeDto | null> {
    const response = await apiClient.getHttpClient().post<CreateEmployeeResponse>(
      '/api/employment/employees',
      request
    );
    return response.data.employee || null;
  }

  async getEmployeeById(id: string): Promise<EmployeeDto | null> {
    const response = await apiClient.getHttpClient().get<EmployeeDto>(
      `/api/employment/employees/${id}`
    );
    return response.data || null;
  }

  async updateEmployee(id: string, employee: EmployeeDto): Promise<EmployeeDto | null> {
    const response = await apiClient.getHttpClient().put<EmployeeDto>(
      `/api/employment/employees/${id}`,
      employee
    );
    return response.data || null;
  }

  async deleteEmployee(id: string): Promise<void> {
    await apiClient.getHttpClient().delete(`/employment/employees/${id}`);
  }
}

export const employeeClient = new EmployeeClient();
