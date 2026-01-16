using FluentValidation;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Sjekklista.Hr.ApiService.Features.VacationPlanning.Contracts;
using Sjekklista.Hr.ApiService.Shared;

namespace Sjekklista.Hr.ApiService.Features.VacationPlanning
{
    public class VacationPlanningEndpoints
    {
        internal static async Task<Results<Ok<GetEmployeeVacationPlanResponse>, NotFound<Error[]>, ValidationProblem>> GetEmployeeVacationPlan(
            [FromRoute] int year,
            [FromRoute] Guid employeeId,
            [FromServices] VacationPlanningService service,
            [FromServices] IValidator<GetEmployeeVacationPlanRequest> validator,
            CancellationToken cancellationToken)
        {
            var request = new GetEmployeeVacationPlanRequest
            {
                Year = year,
                EmployeeId = employeeId
            };

            var validation = await validator.ValidateAsync(request, cancellationToken);
            if (!validation.IsValid)
            {
                return TypedResults.ValidationProblem(validation.ToDictionary());
            }

            var result = await service.GetEmployeeVacationPlanAsync(request, cancellationToken);

            if (!result.IsSuccess)
            {
                return result.Errors.Any(e => e.Code == VacationPlanningErrorCodes.PlanNotFound)
                    ? TypedResults.NotFound(result.Errors)
                    : TypedResults.ValidationProblem(new Dictionary<string, string[]>());
            }

            return TypedResults.Ok(result.Value);
        }

        internal static async Task<Results<Ok<SaveEmployeeVacationPlanResponse>, Conflict<Error[]>, ValidationProblem>> SaveEmployeeVacationPlan(
            [FromBody] SaveEmployeeVacationPlanRequest request,
            [FromServices] VacationPlanningService vacationPlanningService,
            [FromServices] IValidator<SaveEmployeeVacationPlanRequest> validator,
            CancellationToken cancellationToken)
        {
            var validation = await validator.ValidateAsync(request, cancellationToken);
            if (!validation.IsValid)
            {
                return TypedResults.ValidationProblem(validation.ToDictionary());
            }

            var result = await vacationPlanningService.SaveEmployeeVacationPlanAsync(request, cancellationToken);

            if (!result.IsSuccess)
            {
                if (result.Errors.Any(e => e.Code == VacationPlanningErrorCodes.PlanAlreadyExists))
                {
                    return TypedResults.Conflict(result.Errors);
                }

                return TypedResults.ValidationProblem(new Dictionary<string, string[]>());
            }

            return TypedResults.Ok(result.Value);
        }

        internal static async Task<Results<Ok<RequestVacationResponse>, BadRequest<Error[]>, ValidationProblem>> RequestVacation(
            [FromBody] RequestVacationRequest request,
            [FromServices] VacationPlanningService service,
            [FromServices] IValidator<RequestVacationRequest> validator,
            CancellationToken cancellationToken)
        {
            var validation = await validator.ValidateAsync(request, cancellationToken);
            if (!validation.IsValid)
            {
                return TypedResults.ValidationProblem(validation.ToDictionary());
            }

            var result = await service.RequestVacationAsync(request, cancellationToken);

            if (!result.IsSuccess)
            {
                return TypedResults.BadRequest(result.Errors);
            }

            return TypedResults.Ok(result.Value);
        }

        internal static async Task<Results<Ok<SetupVacationResponse>, BadRequest<Error[]>, ValidationProblem>> SetupVacation(
            [FromBody] SetupVacationRequest request,
            [FromServices] VacationPlanningService service,
            [FromServices] IValidator<SetupVacationRequest> validator,
            CancellationToken cancellationToken)
        {
            var validation = await validator.ValidateAsync(request, cancellationToken);
            if (!validation.IsValid)
            {
                return TypedResults.ValidationProblem(validation.ToDictionary());
            }

            var result = await service.SetupVacationAsync(request, cancellationToken);

            if (!result.IsSuccess)
            {
                return TypedResults.BadRequest(result.Errors);
            }

            return TypedResults.Ok(result.Value);
        }

        internal static async Task<Results<Ok<GetAllVacationPlansResponse>, ValidationProblem>> GetAllVacationPlans(
            [FromRoute] int year,
            [FromServices] VacationPlanningService service,
            [FromServices] IValidator<GetAllVacationPlansRequest> validator,
            CancellationToken cancellationToken)
        {
            var request = new GetAllVacationPlansRequest { Year = year };

            var validation = await validator.ValidateAsync(request, cancellationToken);
            if (!validation.IsValid)
            {
                return TypedResults.ValidationProblem(validation.ToDictionary());
            }

            var result = await service.GetAllVacationPlansAsync(request, cancellationToken);

            if (!result.IsSuccess)
            {
                return TypedResults.ValidationProblem(new Dictionary<string, string[]>());
            }

            return TypedResults.Ok(result.Value);
        }
    }
}
