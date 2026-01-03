using Sjekklista.Hr.ApiService.Shared.Models;

namespace Sjekklista.Hr.ApiService.Features.Employment.Models
{
    public class Employee : TenantEntity
    {
        public Guid Id { get; set; }
        public string Firstname { get; set; } = null!;
        public string Lastname { get; set; } = null!;
        public string? PersonalEmailAddress { get; set; }
        public string? PhoneNumber { get; set; }
        public DateOnly DateOfBirth { get; set; }
    }
}
