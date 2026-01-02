
using Microsoft.AspNetCore.Mvc.Testing;

namespace Sjekklista.ApiService.Tests.Integration
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
