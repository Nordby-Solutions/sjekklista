namespace Sjekklista.Hr.ApiService.Features.VacationPlanning.Contracts
{
    public record EmployeeVacationPlanDto
    {
        public int Year { get; set; }
        public Guid EmployeeId { get; set; }
    }
}
