using Microsoft.EntityFrameworkCore;
using Sjekklista.Hr.ApiService.Features.Shared;
using Sjekklista.Hr.ApiService.Shared;

namespace Sjekklista.Hr.ApiService.Infrastructure
{
    internal static class InfrastructureExtensions
    {
        internal static IServiceCollection AddInfrastructure(this IServiceCollection services)
        {
            services.AddHttpContextAccessor();
            services.AddScoped<ITenantProvider, HttpTenantProvider>();
            services.AddScoped<ICurrentUserService, ClaimsIdentityCurrentUserService>();

            services.AddDbContext<SjekklistaHrDbContext>(opt => opt.UseInMemoryDatabase("sjekklista"));

            return services;
        }
    }
}
