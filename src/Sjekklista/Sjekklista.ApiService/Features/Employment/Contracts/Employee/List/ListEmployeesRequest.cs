namespace Sjekklista.ApiService.Features.Employment.Contracts.Employee.Get
{
    public record ListEmployeesRequest
    {
        string? SearchValue { get; set; }
    }
}
