// Employee Models
export interface EmployeeDto {
  id?: string;
  firstname?: string;
  lastname?: string;
  personalEmailAddress?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  tenantId?: string;
}

export interface CreateEmployeeRequest {
  employee: EmployeeDto;
}

export interface CreateEmployeeResponse {
  employee?: EmployeeDto;
}

export interface GetEmployeeResponse {
  employee?: EmployeeDto;
}

export type ListEmployeesRequest = {
  searchValue?: string;
};

export interface ListEmployeesResponse {
  employees: EmployeeDto[];
}

// Tenant Models
export interface TenantInfo {
  tenantId: string;
}

export * from './tenants';
export * from './VacationPlanningModels';
