namespace Sjekklista.Hr.ApiService.Features.Employment.Contracts.Contract
{
    public class EmploymentContractDto
    {
        public Guid Id { get; set; }
        public Guid EmployeeId { get; set; }

        public EmploymentContractTypeDto Type { get; set; }
        public decimal EmploymentPercentage { get; set; } // 100, 80, 50 etc.

        public DateOnly StartDate { get; set; }
        public DateOnly? EndDate { get; set; }

        public WeeklyTemplateDto? DefaultWorkWeek { get; set; }
    }

    public enum EmploymentContractTypeDto
    {
        FullTime,
        PartTime,
        Hourly
    }
}
