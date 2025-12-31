using Sjekklista.ApiService.Shared.Contracts;

namespace Sjekklista.ApiService.Features.Employment.Contracts
{
    public class EmployeeDto : TenantDto
    {
        public Guid Id { get; set; }
        public string Firstname { get; set; } = null!;
        public string Lastname { get; set; } = null!;
        public string? PersonalEmailAddress { get; set; }
        public string? PhoneNumber { get; set; }
        public DateOnly DateOfBirth { get; set; }
    }
}
