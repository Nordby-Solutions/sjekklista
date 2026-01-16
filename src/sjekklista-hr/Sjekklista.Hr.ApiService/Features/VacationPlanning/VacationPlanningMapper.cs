using Sjekklista.Hr.ApiService.Features.Employment.Models;
using Sjekklista.Hr.ApiService.Features.VacationPlanning.Contracts;
using Sjekklista.Hr.ApiService.Features.VacationPlanning.Models;

namespace Sjekklista.Hr.ApiService.Features.VacationPlanning
{
    internal static class VacationPlanningMapper
    {
        internal static EmployeeVacationPlanDto ToDto(
            this EmployeeVacationPlan employeeVacationPlan,
            Employee? employee = null)
        {
            return new EmployeeVacationPlanDto
            {
                Year = employeeVacationPlan.Year,
                EmployeeId = employeeVacationPlan.EmployeeId,
                EmployeeComment = employeeVacationPlan.EmployeeComment,
                EmployeeFirstname = employee?.Firstname,
                EmployeeLastname = employee?.Lastname,
                VacationDays = employeeVacationPlan.VacationDays
                    .Select(vd => vd.ToDto())
                    .ToList()
            };
        }

        internal static EmployeeVacationDayDto ToDto(
            this EmployeeVacationDay vacationDay)
        {
            return new EmployeeVacationDayDto
            {
                RequestedDate = vacationDay.RequestedDate,
                Status = (EmployeeVacationDayStatusDto)vacationDay.Status
            };
        }
    }
}
