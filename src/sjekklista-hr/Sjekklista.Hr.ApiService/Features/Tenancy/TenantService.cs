
using Microsoft.EntityFrameworkCore;
using Sjekklista.Hr.ApiService.Features.Tenancy.Contracts;
using Sjekklista.Hr.ApiService.Shared;

namespace Sjekklista.Hr.ApiService.Features.Tenancy
{
    public class TenantService(HRDbContext _dbContext)
    {
        internal async Task<IReadOnlyCollection<TenantDto>> GetTentantsForSignedOnUserAsync(
            CancellationToken cancellationToken)
        {
            var tenantDtos = await _dbContext.Tenants
                .AsNoTracking()
                .Select(x => new TenantDto()
                {
                    Id = x.Id,
                    Number = x.Number,
                    Name = x.Name,
                    Slug = x.Slug
                })
                .ToArrayAsync(cancellationToken);

            return tenantDtos;
        }
    }
}
