namespace Sjekklista.ApiService.Features.Employment.Models
{
    public class Employee
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; } = null!;
        public string Lastname { get; set; } = null!;
        public string PersonalEmailAddress { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        public DateOnly DateOfBirth { get; set; }
    }
}
