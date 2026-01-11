namespace Sjekklista.Hr.ApiService.Features.VacationPlanning.Contracts
{
    public record InitializeVacati2onPlansRequest
    {
        public required int Year { get; init; }
    }
}
