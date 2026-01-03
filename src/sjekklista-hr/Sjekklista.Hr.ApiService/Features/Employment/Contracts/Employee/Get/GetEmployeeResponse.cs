namespace Sjekklista.Hr.ApiService.Features.Employment.Contracts.Employee.Get
{
    public record GetEmployeeResponse
    {
        public required EmployeeDto? Employee { get; init; }
    }
}
