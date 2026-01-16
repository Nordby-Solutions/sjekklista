import { apiClient } from '../apiClient';
import type {
  EmployeeVacationPlanDto,
  GetEmployeeVacationPlanResponse,
  RequestVacationRequest,
  RequestVacationResponse,
  SaveEmployeeVacationPlanRequest,
  SaveEmployeeVacationPlanResponse,
  SetupVacationRequest,
  SetupVacationResponse,
} from '../models/VacationPlanningModels';

class VacationPlanningClient {
  private readonly basePath = '/vacation-planning';

  async getEmployeeVacationPlan(
    employeeId: string,
    year: number
  ): Promise<EmployeeVacationPlanDto> {
    const response = await apiClient
      .getHttpClient()
      .get<GetEmployeeVacationPlanResponse>(
        `${this.basePath}/employee/${year}/${employeeId}`
      );
    return response.data.employeeVacation;
  }

  async saveEmployeeVacationPlan(
    request: SaveEmployeeVacationPlanRequest
  ): Promise<EmployeeVacationPlanDto> {
    const response = await apiClient
      .getHttpClient()
      .post<SaveEmployeeVacationPlanResponse>(
        `${this.basePath}/employee`,
        request
      );
    return response.data.employeeVacation;
  }

  async requestVacation(
    request: RequestVacationRequest
  ): Promise<EmployeeVacationPlanDto> {
    const response = await apiClient
      .getHttpClient()
      .post<RequestVacationResponse>(
        `${this.basePath}/employee/request-vacation`,
        request
      );
    return response.data.employeeVacation;
  }

  async setupVacation(
    request: SetupVacationRequest
  ): Promise<EmployeeVacationPlanDto> {
    const response = await apiClient
      .getHttpClient()
      .post<SetupVacationResponse>(
        `${this.basePath}/employee/setup-vacation`,
        request
      );
    return response.data.employeeVacation;
  }

  async getAllEmployeeVacationPlans(year: number): Promise<EmployeeVacationPlanDto[]> {
    try {
      const response = await apiClient
        .getHttpClient()
        .get<EmployeeVacationPlanDto[]>(
          `${this.basePath}/employee/year/${year}`
        );
      return response.data;
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { status?: number } };
        if (axiosError.response?.status === 404) {
          return [];
        }
      }
      throw error;
    }
  }
}

export const vacationPlanningClient = new VacationPlanningClient();
