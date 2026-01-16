using Sjekklista.Hr.ApiService.Features.VacationPlanning.Contracts;

namespace Sjekklista.Hr.ApiService.Tests.Integration.Features.VacationPlanning
{
    public class VacationPlanningClient
    {
        private readonly HttpClient _httpClient;

        public VacationPlanningClient(Guid tenantId, WebApplicationFactoryFixture fixture)
        {
            _httpClient = fixture.Factory.CreateClient();
            _httpClient.DefaultRequestHeaders.Add("X-Tenant", tenantId.ToString());
        }

        internal async Task<HttpResponseMessage> GetEmployeeVacationPlan(Guid employeeId, int year)
        {
            var response = await _httpClient.GetAsync($"/api/vacation-planning/employee/{year}/{employeeId}");
            return response;
        }

        internal async Task<HttpResponseMessage> SaveEmployeeVacationPlan(
            SaveEmployeeVacationPlanRequest request)
        {
            return await _httpClient.PostAsJsonAsync("/api/vacation-planning/employee", request);
        }

        internal async Task<HttpResponseMessage> RequestVacation(
            RequestVacationRequest request)
        {
            return await _httpClient.PostAsJsonAsync("/api/vacation-planning/employee/request-vacation", request);
        }

        internal async Task<HttpResponseMessage> SetupVacation(
            SetupVacationRequest request)
        {
            return await _httpClient.PostAsJsonAsync("/api/vacation-planning/employee/setup-vacation", request);
        }

        internal async Task<HttpResponseMessage> GetAllVacationPlans(int year)
        {
            return await _httpClient.GetAsync($"/api/vacation-planning/employee/year/{year}");
        }

        internal async Task<HttpResponseMessage> InitializeVacationPlans(
            InitializeVacationPlansRequest request)
        {
            return await _httpClient.PostAsJsonAsync("/api/vacation-planning/initialize", request);
        }
    }
}
