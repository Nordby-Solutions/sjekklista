namespace Sjekklista.Hr.ApiService.Features.VacationPlanning.Contracts
{
    public record SetupVacationRequest
    {
        public required Guid EmployeeId { get; init; }
        public required int Year { get; init; }
        public required DateOnly VacationDate { get; init; }
        public required EmployeeVacationDayStatusDto Status { get; init; }
    }
}
