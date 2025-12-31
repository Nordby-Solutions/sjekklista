
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Sjekklista.ApiService.Features.Employment.Contracts.Employee.Create;
using Sjekklista.ApiService.Features.Employment.Contracts.Employee.Get;
using Sjekklista.ApiService.Features.Employment.Contracts.Employee.Update;

namespace Sjekklista.ApiService.Features.Employment
{
    internal static class EmploymentEndpoints
    {
        internal static async Task<Ok<CreateEmployeeResponse>> CreateEmployee(
            [FromBody] CreateEmployeeRequest request,
            [FromServices] EmploymentService employmentService,
            CancellationToken cancellationToken)
        {
            var response = await employmentService
                .CreateEmployeeAsync(request, cancellationToken);

            return TypedResults.Ok(response);
        }

        internal static async Task DeleteEmployee(HttpContext context)
        {
            throw new NotImplementedException();
        }

        internal static async Task<Ok<GetEmployeesResponse>> GetEmployees(
            [FromBody] GetEmployeesRequest request,
            [FromServices] EmploymentService employmentService,
            CancellationToken cancellationToken)
        {
            var response = await employmentService
                .GetEmployeesAsync(request, cancellationToken);

            return TypedResults.Ok(response);
        }

        internal static async Task<Ok<UpdateEmployeeResponse>> UpdateEmployee(
            [FromBody] UpdateEmployeeRequest request,
            [FromServices] EmploymentService employmentService,
            CancellationToken cancellationToken)
        {
            var response = await employmentService
                .UpdateEmployeeAsync(request, cancellationToken);

            return TypedResults.Ok(response);
        }
    }
}
