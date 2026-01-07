using Sjekklista.Hr.ApiService.Features.Shared;

namespace Sjekklista.Hr.ApiService.Infrastructure
{
    public class ClaimsIdentityCurrentUserService : ICurrentUserService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ClaimsIdentityCurrentUserService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public Guid SignedOnUserId
        {
            get
            {
                var claim = _httpContextAccessor.HttpContext?
                    .User?
                    .FindFirst("user_id")?
                    .Value;
                if (claim is null)
                    throw new Exception("Invalid state.");

                return Guid.Parse(claim);
            }
        }
    }
}
