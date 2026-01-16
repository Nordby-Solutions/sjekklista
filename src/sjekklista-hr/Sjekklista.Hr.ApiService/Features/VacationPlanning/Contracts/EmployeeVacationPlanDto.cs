namespace Sjekklista.Hr.ApiService.Features.VacationPlanning.Contracts
{
    public record EmployeeVacationPlanDto
    {
        public int Year { get; set; }
        public Guid EmployeeId { get; set; }
        public string? EmployeeComment { get; set; }
        public string? EmployeeFirstname { get; set; }
        public string? EmployeeLastname { get; set; }
        public IReadOnlyCollection<EmployeeVacationDayDto> VacationDays { get; set; } = [];
    }

    public record EmployeeVacationDayDto
    {
        public DateOnly RequestedDate { get; set; }
        public EmployeeVacationDayStatusDto Status { get; set; }
    }

    public enum EmployeeVacationDayStatusDto
    {
        Pending = 10,
        Approved = 20,
        Rejected = 30
    }
}
