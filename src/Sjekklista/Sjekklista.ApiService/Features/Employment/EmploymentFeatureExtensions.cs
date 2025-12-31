namespace Sjekklista.ApiService.Features.Employment
{
    internal static class EmploymentFeatureExtensions
    {
        internal static IServiceCollection AddEmploymentFeature(this IServiceCollection services)
        {
            services.AddScoped<EmploymentService>();
            return services;
        }

        internal static void MapEmploymentEndpoints(this IEndpointRouteBuilder app)
        {
            var employmentGroup = app
                .MapGroup("/employment")
                .WithTags("Employment");

            employmentGroup
                .MapPost("/employee/list", EmploymentEndpoints.GetEmployees)
                .WithName("GetEmployees")
                .WithSummary("Retrieves a list of employees.");

            employmentGroup
                .MapPost("/employee", EmploymentEndpoints.CreateEmployee)
                .WithName("CreateEmployee")
                .WithSummary("Creates an employee.");

            employmentGroup
                .MapPut("/employee", EmploymentEndpoints.UpdateEmployee)
                .WithName("UpdateEmployee")
                .WithSummary("Updates an employee.");

            employmentGroup
                .MapDelete("/employee/{employeeId}", EmploymentEndpoints.DeleteEmployee)
                .WithName("DeleteEmployee")
                .WithSummary("Deletes an employee.");

        }
    }
}
