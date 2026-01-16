namespace Sjekklista.Hr.ApiService.Features.VacationPlanning.Contracts
{
    public record GetAllVacationPlansResponse
    {
        public IReadOnlyCollection<EmployeeVacationPlanDto> VacationPlans { get; init; } = [];
    }
}
