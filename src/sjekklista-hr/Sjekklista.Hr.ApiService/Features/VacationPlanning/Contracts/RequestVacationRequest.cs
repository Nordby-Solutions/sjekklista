namespace Sjekklista.Hr.ApiService.Features.VacationPlanning.Contracts
{
    public record RequestVacationRequest
    {
        public required Guid EmployeeId { get; init; }
        public required int Year { get; init; }
        public required DateOnly VacationDate { get; init; }
    }
}
