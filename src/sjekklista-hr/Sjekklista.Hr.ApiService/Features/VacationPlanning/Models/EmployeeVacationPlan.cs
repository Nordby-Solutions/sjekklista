using Sjekklista.Hr.ApiService.Shared.Models;

namespace Sjekklista.Hr.ApiService.Features.VacationPlanning.Models
{
    public class EmployeeVacationPlan : TenantEntity
    {
        public int Year { get; set; }
        public Guid EmployeeId { get; set; }
        public string? EmployeeComment { get; set; }

        protected EmployeeVacationPlan()
        {

        }

        public EmployeeVacationPlan(
            int year,
            Guid employeeId)
        {
            Year = year;
            EmployeeId = employeeId;
        }
    }
}
