namespace Sjekklista.ApiService.Features.Employment.Contracts.Employee.Get
{
    public record GetEmployeesResponse
    {
        public required IReadOnlyCollection<EmployeeDto> Employees { get; init; }
    }
}
