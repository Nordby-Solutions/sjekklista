using Sjekklista.Hr.ApiService.Shared.Contracts;

namespace Sjekklista.Hr.ApiService.Features.Employment.Contracts.Employee
{
    public class EmployeeDto : BaseTenantDto
    {
        public Guid Id { get; set; }
        public string Firstname { get; set; } = null!;
        public string Lastname { get; set; } = null!;
        public string? PersonalEmailAddress { get; set; }
        public string? PhoneNumber { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly? EndDate { get; set; }
        public Guid CreatedByUserId { get; set; }
    }
}
