namespace Sjekklista.Hr.ApiService.Features.VacationPlanning.Contracts
{
    public record RequestVacationResponse
    {
        public EmployeeVacationPlanDto? EmployeeVacation { get; init; }
    }
}
