namespace Sjekklista.Hr.ApiService.Features.VacationPlanning.Contracts
{
    public record SetupVacationResponse
    {
        public EmployeeVacationPlanDto? EmployeeVacation { get; init; }
    }
}
