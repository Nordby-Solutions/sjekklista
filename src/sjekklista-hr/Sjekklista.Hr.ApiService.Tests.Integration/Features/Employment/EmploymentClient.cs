using Sjekklista.Hr.ApiService.Features.Employment.Contracts.Employee.Get;
using Sjekklista.Hr.ApiService.Features.Employment.Contracts.Employee.Update;

namespace Sjekklista.Hr.ApiService.Tests.Integration.Features.Employment
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
            return await _httpClient.PostAsJsonAsync("/api/employment/employees", request);
        }

        internal async Task<HttpResponseMessage> DeleteEmployee(Guid employeeId)
        {
            return await _httpClient.DeleteAsync($"/api/employment/employees/{employeeId}");
        }

        internal async Task<HttpResponseMessage> GetEmployee(Guid employeeId)
        {
            return await _httpClient.GetAsync($"/api/employment/employees/{employeeId}");
        }

        internal async Task<HttpResponseMessage> ListEmployees(ListEmployeesRequest request)
        {
            return await _httpClient.PostAsJsonAsync("/api/employment/employees/list", request);
        }

        internal async Task<HttpResponseMessage> UpdateEmployee(UpdateEmployeeRequest request)
        {
            return await _httpClient.PutAsJsonAsync("/api/employment/employees", request);
        }
    }
}
