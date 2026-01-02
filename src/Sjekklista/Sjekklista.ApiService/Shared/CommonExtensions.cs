namespace Sjekklista.ApiService.Shared
{
    internal static class CommonExtensions
    {
        internal static Guid GetTenantId(this HttpContext context)
        {
            var tenantIdString = (string?)context.Items["TenantId"];
            if (string.IsNullOrWhiteSpace(tenantIdString) ||
                !Guid.TryParse(tenantIdString, out var tenantId))
            {
                throw new InvalidOperationException("Tenant ID is missing or invalid.");
            }

            return tenantId;
        }
    }
}
