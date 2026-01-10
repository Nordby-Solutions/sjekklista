using Sjekklista.Hr.ApiService.Features.VacationPlanning.Contracts;
using Sjekklista.Hr.ApiService.Features.VacationPlanning.Models;

namespace Sjekklista.Hr.ApiService.Features.VacationPlanning
{
    internal static class VacationPlanningMapper
    {
        internal static EmployeeVacationPlanDto ToDto(
            this EmployeeVacationPlan employeeVacationPlan)
        {
            return new EmployeeVacationPlanDto
            {
                Year = employeeVacationPlan.Year,
                EmployeeId = employeeVacationPlan.EmployeeId
            };
        }
    }
}
