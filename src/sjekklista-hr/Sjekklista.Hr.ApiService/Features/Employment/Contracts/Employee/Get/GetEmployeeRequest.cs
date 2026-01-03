namespace Sjekklista.Hr.ApiService.Features.Employment.Contracts.Employee.Get
{
    public record GetEmployeeRequest
    {
        public required Guid EmployeeId { get; init; }
    }
}
