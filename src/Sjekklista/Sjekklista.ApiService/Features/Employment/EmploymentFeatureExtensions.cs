namespace Sjekklista.ApiService.Features.Employment
{
    internal static class EmploymentFeatureExtensions
    {
        internal static IServiceCollection AddEmploymentFeature(this IServiceCollection services)
        {
            services.AddScoped<EmploymentService>();
            return services;
        }
    }
}
