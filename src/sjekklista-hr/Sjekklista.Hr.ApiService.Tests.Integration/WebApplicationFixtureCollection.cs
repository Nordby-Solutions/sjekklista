namespace Sjekklista.Hr.ApiService.Tests.Integration
{
    [CollectionDefinition(CollectionName)]
    public class WebApplicationFixtureCollection : ICollectionFixture<WebApplicationFactoryFixture>
    {
        public const string CollectionName = nameof(WebApplicationFixtureCollection);
    }
}
