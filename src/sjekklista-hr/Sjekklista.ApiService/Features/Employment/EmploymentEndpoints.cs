
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Sjekklista.ApiService.Features.Employment.Contracts.Employee.Create;
using Sjekklista.ApiService.Features.Employment.Contracts.Employee.Delete;
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

        internal static async Task<Ok<DeleteEmployeeResponse>> DeleteEmployee(
            [FromRoute] Guid employeeId,
            [FromServices] EmploymentService employmentService,
            HttpContext context,
            CancellationToken cancellationToken)
        {
            var response = await employmentService.DeleteEmployeeAsync(new DeleteEmployeeRequest
            {
                EmployeeId = employeeId
            }, cancellationToken);

            return TypedResults.Ok(response);
        }

        internal static async Task<Ok<GetEmployeeResponse>> GetEmployee(
            [FromRoute] Guid employeeId,
            [FromServices] EmploymentService employmentService,
            HttpContext context,
            CancellationToken cancellationToken)
        {
            var response = await employmentService.GetEmployeeAsync(new GetEmployeeRequest
            {
                EmployeeId = employeeId
            }, cancellationToken);

            return TypedResults.Ok(response);
        }


        internal static async Task<Ok<ListEmployeesResponse>> ListEmployees(
            [FromBody] ListEmployeesRequest request,
            [FromServices] EmploymentService employmentService,
            CancellationToken cancellationToken)
        {
            var response = await employmentService
                .ListEmployeesAsync(request, cancellationToken);

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
