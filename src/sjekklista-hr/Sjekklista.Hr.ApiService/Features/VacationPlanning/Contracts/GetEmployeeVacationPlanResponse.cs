namespace Sjekklista.Hr.ApiService.Features.VacationPlanning.Contracts
{
    public record GetEmployeeVacationPlanResponse
    {
        public EmployeeVacationPlanDto? EmployeeVacation { get; init; }
    }
}
