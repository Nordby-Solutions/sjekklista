
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Sjekklista.ApiService.Features.Tenancy.Contracts;

namespace Sjekklista.ApiService.Features.Tenancy
{
    public class TenantEndpoints
    {
        public static async Task<Ok<GetTenantsResponse>> GetMyTenants(
            [FromServices] TenantService tenantService,
            HttpContext context,
            CancellationToken cancellationToken)
        {
            var tenants = await tenantService
                .GetTentantsForSignedOnUserAsync(cancellationToken);
            var response = new GetTenantsResponse()
            {
                Tenants = tenants
            };

            return TypedResults.Ok(response);
        }
    }
}
