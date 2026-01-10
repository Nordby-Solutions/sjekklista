namespace Sjekklista.Hr.ApiService.Features.VacationPlanning.Contracts
{
    public record GetEmployeeVacationPlanRequest
    {
        public int Year { get; init; }
        public Guid EmployeeId { get; init; }
    }
}
