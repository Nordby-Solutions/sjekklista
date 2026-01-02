namespace Sjekklista.ApiService.Features.Employment.Contracts.Employee.Update
{
    public record UpdateEmployeeRequest
    {
        public required EmployeeDto Employee { get; init; }
    }
}
