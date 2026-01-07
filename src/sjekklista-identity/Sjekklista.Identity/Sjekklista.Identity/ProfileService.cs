using Duende.IdentityServer.Models;
using Duende.IdentityServer.Services;
using System.Security.Claims;

namespace Sjekklista.Identity
{
    public class ProfileService : IProfileService
    {
        public Task GetProfileDataAsync(ProfileDataRequestContext context)
        {
            var user = context.Subject;
            var userGuid = user.FindFirst("user_guid")?.Value;

            context.IssuedClaims.Add(
                new Claim("user_id", userGuid)
            );

            return Task.CompletedTask;
        }

        public Task IsActiveAsync(IsActiveContext context)
        {
            context.IsActive = true;
            return Task.CompletedTask;
        }
    }
}
