
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc.Testing;
using Sjekklista.Hr.ApiService.Tests.Integration.Helpers;

namespace Sjekklista.Hr.ApiService.Tests.Integration
{
    public class WebApplicationFactoryFixture : IAsyncLifetime
    {
        private WebApplicationFactory<Program> _factory = null!;
        public WebApplicationFactory<Program> Factory => _factory;

        protected void ConfigureWebHost()
        {
            _factory = new WebApplicationFactory<Program>()
                .WithWebHostBuilder(builder =>
                {
                    builder.ConfigureServices(services =>
                    {
                        services.AddAuthentication(options =>
                        {
                            options.DefaultAuthenticateScheme = TestAuthHandler.SchemeName;
                            options.DefaultChallengeScheme = TestAuthHandler.SchemeName;
                        })
                        .AddScheme<AuthenticationSchemeOptions, TestAuthHandler>(
                            TestAuthHandler.SchemeName, _ => { });
                    });
                });
        }

        public async Task DisposeAsync()
        {
            await _factory.DisposeAsync();
        }

        public async Task InitializeAsync()
        {
            ConfigureWebHost();
            _factory.StartServer();
        }
    }
}
