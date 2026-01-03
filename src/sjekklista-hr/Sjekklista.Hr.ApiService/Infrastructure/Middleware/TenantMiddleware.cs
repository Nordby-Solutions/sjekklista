namespace Sjekklista.Hr.ApiService.Infrastructure.Middleware
{
    public class TenantMiddleware
    {
        private readonly RequestDelegate _next;

        public TenantMiddleware(RequestDelegate next) => _next = next;

        public async Task InvokeAsync(HttpContext context)
        {
            if (!context.Request.Path.StartsWithSegments("/api"))
            {
                await _next(context);
                return;
            }

            // 1. Try URL: /{tenantId}/products
            var routeTenant = context.Request.RouteValues["tenantId"]?.ToString();

            // 2. Try header
            var headerTenant = context.Request.Headers["X-Tenant"].FirstOrDefault();

            var tenantId = routeTenant ?? headerTenant;

            if (string.IsNullOrEmpty(tenantId))
            {
                context.Response.StatusCode = 400;
                await context.Response.WriteAsync("Tenant not specified");
                return;
            }

            context.Items["TenantId"] = tenantId;

            await _next(context);
        }
    }
}
