namespace Sjekklista.Hr.ApiService.Features.Employment.Contracts.Employee.Create
{
    public record CreateEmployeeRequest
    {
        public required EmployeeDto Employee { get; init; }
    }
}
