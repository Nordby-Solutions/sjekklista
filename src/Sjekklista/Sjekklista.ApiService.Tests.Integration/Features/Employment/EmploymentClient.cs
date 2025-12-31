using Sjekklista.ApiService.Features.Employment.Contracts.Employee.Delete;
using Sjekklista.ApiService.Features.Employment.Contracts.Employee.Get;
using Sjekklista.ApiService.Features.Employment.Contracts.Employee.Update;

namespace Sjekklista.ApiService.Tests.Integration.Features.Employment
{
    public class EmploymentClient
    {
        private readonly HttpClient _httpClient;

        public EmploymentClient(Guid tenantId, WebApplicationFactoryFixture fixture)
        {
            _httpClient = fixture.Factory.CreateClient();
            _httpClient.DefaultRequestHeaders.Add("X-Tenant", tenantId.ToString());
        }

        internal async Task<HttpResponseMessage> CreateEmployee(UpdateEmployeeRequest request)
        {
            return await _httpClient.PostAsJsonAsync("/api/employment/employee", request);
        }

        internal async Task<HttpResponseMessage> DeleteEmployee(DeleteEmployeeRequest request)
        {
            return await _httpClient.DeleteAsync($"/api/employment/employee/{request.Id}");
        }

        internal async Task<HttpResponseMessage> GetEmployees(GetEmployeesRequest request)
        {
            return await _httpClient.PostAsJsonAsync("/api/employment/employee/list", request);
        }

        internal async Task<HttpResponseMessage> UpdateEmployee(UpdateEmployeeRequest request)
        {
            return await _httpClient.PutAsJsonAsync("/api/employment/employee", request);
        }
    }
}
