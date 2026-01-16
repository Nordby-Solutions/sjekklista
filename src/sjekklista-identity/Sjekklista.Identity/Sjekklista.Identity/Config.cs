using Duende.IdentityServer.Models;

namespace Sjekklista.Identity
{
    public class Config
    {
        public static IEnumerable<IdentityResource> IdentityResources = [
            new IdentityResources.OpenId(),
                new IdentityResources.Profile()
        ];

        public static IEnumerable<ApiScope> ApiScopes => [
            new ApiScope("sjekklista.api.hr", "HR API"),
        ];

        public static IEnumerable<ApiResource> ApiResources => [
            new ApiResource("hr-api", "HR API")
            {
                Scopes = { "sjekklista.api.hr" }
            },
        ];

        public static IEnumerable<Client> Clients => [
            new Client
            {
                ClientId = "hr-client",
                ClientName = "Sjekklista HR",
                AllowedGrantTypes = GrantTypes.Code,
                RequirePkce = true,
                RequireClientSecret = false,

                RedirectUris =
                {
                    "http://localhost:5173/callback"
                },

                PostLogoutRedirectUris =
                {
                    "http://localhost:5173"
                },

                AllowedScopes =
                {
                    "openid",
                    "profile",
                    "sjekklista.api.hr"
                },
                AllowOfflineAccess = true
            }
        ];
    }
}
