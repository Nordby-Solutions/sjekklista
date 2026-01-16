namespace Sjekklista.Hr.ApiService.Features.VacationPlanning.Contracts
{
    public record GetAllVacationPlansRequest
    {
        public int Year { get; init; }
    }
}
