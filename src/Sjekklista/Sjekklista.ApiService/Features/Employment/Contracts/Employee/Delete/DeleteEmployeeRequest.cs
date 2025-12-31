namespace Sjekklista.ApiService.Features.Employment.Contracts.Employee.Delete
{
    public record DeleteEmployeeRequest
    {
        public required Guid Id { get; init; }
    }
}
