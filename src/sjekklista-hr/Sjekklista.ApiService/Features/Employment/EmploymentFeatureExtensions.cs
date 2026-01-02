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
                .MapPost("/employees/list", EmploymentEndpoints.ListEmployees)
                .WithName("GetEmployees")
                .WithSummary("Retrieves a list of employees.");

            employmentGroup
                .MapPost("/employees", EmploymentEndpoints.CreateEmployee)
                .WithName("CreateEmployee")
                .WithSummary("Creates an employee.");

            employmentGroup
                .MapPut("/employees", EmploymentEndpoints.UpdateEmployee)
                .WithName("UpdateEmployee")
                .WithSummary("Updates an employee.");

            employmentGroup
                .MapDelete("/employees/{employeeId}", EmploymentEndpoints.DeleteEmployee)
                .WithName("DeleteEmployee")
                .WithSummary("Deletes an employee.");

            employmentGroup
                .MapGet("/employees/{employeeId}", EmploymentEndpoints.GetEmployee)
                .WithName("GetEmployee")
                .WithSummary("Deletes an employee.");


        }
    }
}
