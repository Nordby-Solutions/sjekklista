using Microsoft.EntityFrameworkCore;
using Sjekklista.ApiService.Shared;

namespace Sjekklista.ApiService.Infrastructure
{
    internal static class InfrastructureExtensions
    {
        internal static IServiceCollection AddInfrastructure(this IServiceCollection services)
        {
            services.AddHttpContextAccessor();
            services.AddScoped<ITenantProvider, HttpTenantProvider>();

            services.AddDbContext<SjekklistaDbContext>(opt => opt.UseInMemoryDatabase("sjekklista"));

            return services;
        }
    }
}
