
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Sjekklista.Hr.ApiService.Features.VacationPlanning.Contracts;

namespace Sjekklista.Hr.ApiService.Features.VacationPlanning
{
    public class VacationPlanningEndpoints
    {
        internal static async Task<Ok<GetEmployeeVacationPlanResponse>> GetEmployeeVacationPlan(
            [FromRoute] int year,
            [FromRoute] Guid employeeId,
            [FromServices] VacationPlanningService service,
            CancellationToken cancellationToken)
        {
            var response = await service.GetEmployeeVacationPlanAsync(new GetEmployeeVacationPlanRequest()
            {
                Year = year,
                EmployeeId = employeeId
            }, cancellationToken);

            return TypedResults.Ok(response);
        }

        internal static async Task<Ok<SaveEmployeeVacationResponse>> SaveEmployeeVacationPlan(
            [FromBody] SaveEmployeeVacationPlanRequest request,
            [FromServices] VacationPlanningService vacationPlanningService,
            CancellationToken cancellationToken)
        {
            var response = await vacationPlanningService
                .SaveEmployeeVacationPlanAsync(request, cancellationToken);

            return TypedResults.Ok(response);
        }
    }
}
