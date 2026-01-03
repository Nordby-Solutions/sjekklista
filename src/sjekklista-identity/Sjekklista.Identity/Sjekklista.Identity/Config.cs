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
            new ApiScope("sjekklista.api", "Sjekklista API")
        ];

        public static IEnumerable<Client> Clients => [
            new Client
            {
                ClientId = "react-client",
                ClientName = "React App",
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
                    "sjekklista.api"
                },
                AllowOfflineAccess = true
            }
        ];
    }
}
