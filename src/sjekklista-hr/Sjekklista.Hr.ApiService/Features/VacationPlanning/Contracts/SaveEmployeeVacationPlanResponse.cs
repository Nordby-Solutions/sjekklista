namespace Sjekklista.Hr.ApiService.Features.VacationPlanning.Contracts
{
    public record SaveEmployeeVacationPlanResponse
    {
        public EmployeeVacationPlanDto? EmployeeVacation { get; init; }
    }
}
