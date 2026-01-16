namespace Sjekklista.Hr.ApiService.Features.VacationPlanning.Contracts
{
    public record InitializeVacationPlansRequest
    {
        public required int Year { get; init; }
    }
}
