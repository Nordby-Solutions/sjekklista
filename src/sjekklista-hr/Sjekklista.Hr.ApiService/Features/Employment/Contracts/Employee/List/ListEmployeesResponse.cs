namespace Sjekklista.Hr.ApiService.Features.Employment.Contracts.Employee.Get
{
    public record ListEmployeesResponse
    {
        public required IReadOnlyCollection<EmployeeDto> Employees { get; init; }
    }
}
