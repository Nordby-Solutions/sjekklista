
namespace Sjekklista.ApiService.Tests.Integration.Features.Employment
{
    public class EmploymentClient
    {
        private readonly HttpClient _httpClient;

        public EmploymentClient(WebApplicationFactoryFixture fixture)
        {
            _httpClient = fixture.Factory.CreateClient();
        }

        internal async Task<HttpResponseMessage> CreateEmployee()
        {
            throw new NotImplementedException();
        }

        internal async Task<HttpResponseMessage> DeleteEmployee()
        {
            throw new NotImplementedException();
        }

        internal async Task<HttpResponseMessage> GetEmployees()
        {
            throw new NotImplementedException();
        }

        internal async Task<HttpResponseMessage> UpdateEmployee()
        {
            throw new NotImplementedException();
        }
    }
}
