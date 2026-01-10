namespace Sjekklista.Hr.ApiService.Features.VacationPlanning.Contracts
{
    public record SaveEmployeeVacationResponse
    {
        public EmployeeVacationPlanDto? EmployeeVacation { get; init; }
    }
}
