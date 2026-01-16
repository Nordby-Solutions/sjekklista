namespace Sjekklista.Hr.ApiService.Features.VacationPlanning.Contracts
{
    public record SaveEmployeeVacationPlanRequest
    {
        public required EmployeeVacationPlanDto EmployeeVacation { get; init; }
    }
}
