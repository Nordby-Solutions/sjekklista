namespace Sjekklista.Hr.ApiService.Features.Tenancy.Contracts
{
    public record GetTenantsResponse
    {
        public required IReadOnlyCollection<TenantDto> Tenants { get; init; }
    }
}
