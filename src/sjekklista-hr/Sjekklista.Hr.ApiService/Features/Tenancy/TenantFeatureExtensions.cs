namespace Sjekklista.Hr.ApiService.Features.Tenancy
{
    internal static class TenantFeatureExtensions
    {
        internal static IServiceCollection AddTenantFeature(this IServiceCollection services)
        {
            return services.AddTransient<TenantService>();
        }

        internal static void MapTenantEndpoints(this RouteGroupBuilder routes)
        {
            var tenantGroup = routes.MapGroup("/tenants");

            tenantGroup.MapGet("/", TenantEndpoints.GetMyTenants)
                .WithName("GetMyTenants")
                .WithDescription("Gets the tenants for the signed on user.");
        }
    }
}
