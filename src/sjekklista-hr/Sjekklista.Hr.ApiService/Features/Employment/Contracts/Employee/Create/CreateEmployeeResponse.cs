namespace Sjekklista.Hr.ApiService.Features.Employment.Contracts.Employee.Create
{
    public record CreateEmployeeResponse
    {
        public EmployeeDto Employee { get; init; } = null!;
    }
}
