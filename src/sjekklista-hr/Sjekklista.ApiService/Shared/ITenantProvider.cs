namespace Sjekklista.ApiService.Shared
{
    /// <summary>
    /// OBS: Should only be used by SjakklistaDbContext to get the current tenant's ID.
    /// Dont bloat the code base with references to this interface just to retrieve the tenant ID.
    /// Tenant Id should be passed explicitly to code that need it.
    /// </summary>
    public interface ITenantProvider
    {
        Guid TenantId { get; }
    }

    public class HttpTenantProvider : ITenantProvider
    {
        private readonly IHttpContextAccessor _accessor;

        public HttpTenantProvider(IHttpContextAccessor accessor)
        {
            _accessor = accessor;
        }

        public Guid TenantId => _accessor.HttpContext!.GetTenantId();
    }

}
