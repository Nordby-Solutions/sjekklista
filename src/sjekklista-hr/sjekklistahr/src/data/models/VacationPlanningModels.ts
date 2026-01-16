export interface EmployeeVacationPlanDto {
  year: number;
  employeeId: string;
  employeeComment?: string;
  employeeFirstname?: string;
  employeeLastname?: string;
  vacationDays: EmployeeVacationDayDto[];
}

export interface EmployeeVacationDayDto {
  requestedDate: string; // ISO date string
  status: EmployeeVacationDayStatusDto;
}

export type EmployeeVacationDayStatusDto = 10 | 20 | 30;

export const EmployeeVacationDayStatus = {
  Pending: 10 as const,
  Approved: 20 as const,
  Rejected: 30 as const,
};

export interface RequestVacationRequest {
  employeeId: string;
  year: number;
  vacationDate: string; // ISO date string (DateOnly format YYYY-MM-DD)
}

export interface RequestVacationResponse {
  employeeVacation: EmployeeVacationPlanDto;
}

export interface SetupVacationRequest {
  employeeId: string;
  year: number;
  vacationDate: string; // ISO date string (DateOnly format YYYY-MM-DD)
  status: EmployeeVacationDayStatusDto;
}

export interface SetupVacationResponse {
  employeeVacation: EmployeeVacationPlanDto;
}

export interface GetEmployeeVacationPlanRequest {
  employeeId: string;
  year: number;
}

export interface GetEmployeeVacationPlanResponse {
  employeeVacation: EmployeeVacationPlanDto;
}

export interface SaveEmployeeVacationPlanRequest {
  employeeVacation: EmployeeVacationPlanDto;
}

export interface SaveEmployeeVacationPlanResponse {
  employeeVacation: EmployeeVacationPlanDto;
}

export interface GetAllVacationPlansResponse {
  vacationPlans: EmployeeVacationPlanDto[];
}

// Extended interface for UI display
export interface VacationCalendarEvent {
  id: string;
  employeeId: string;
  employeeName: string;
  startDate: Date;
  endDate: Date;
  status: EmployeeVacationDayStatusDto;
  isAllDay: boolean;
}
