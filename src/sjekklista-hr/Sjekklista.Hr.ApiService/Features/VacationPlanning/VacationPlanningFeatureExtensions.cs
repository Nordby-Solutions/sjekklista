using FluentValidation;
using Sjekklista.Hr.ApiService.Features.VacationPlanning.Contracts;
using Sjekklista.Hr.ApiService.Features.VacationPlanning.Validators;

namespace Sjekklista.Hr.ApiService.Features.VacationPlanning
{
    internal static class VacationPlanningFeatureExtensions
    {
        internal static IServiceCollection AddVacationPlanningFeature(
            this IServiceCollection services)
        {
            services.AddScoped<VacationPlanningService>();
            services.AddScoped<IValidator<SaveEmployeeVacationPlanRequest>, SaveEmployeeVacationPlanRequestValidator>();
            services.AddScoped<IValidator<GetEmployeeVacationPlanRequest>, GetEmployeeVacationPlanRequestValidator>();
            return services;
        }

        internal static void MapVacationPlanningEndpoints(
            this RouteGroupBuilder apiRouteGroupBuilder)
        {
            var vacationPlanningGroup = apiRouteGroupBuilder
                .MapGroup("/vacation-planning")
                .WithDescription("Planning vacation.");

            vacationPlanningGroup
                .MapPost("/employee", VacationPlanningEndpoints.SaveEmployeeVacationPlan)
                .WithName("SaveEmployeeVacationPlan");

            vacationPlanningGroup.MapGet("/employee/{year:int}/{employeeId:guid}", VacationPlanningEndpoints.GetEmployeeVacationPlan)
                .WithName("GetEmployeeVacationPlan");
        }
    }
}
