
using Microsoft.EntityFrameworkCore;
using Sjekklista.ApiService.Features.Tenancy.Contracts;
using Sjekklista.ApiService.Shared;

namespace Sjekklista.ApiService.Features.Tenancy
{
    public class TenantService(SjekklistaDbContext _dbContext)
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
