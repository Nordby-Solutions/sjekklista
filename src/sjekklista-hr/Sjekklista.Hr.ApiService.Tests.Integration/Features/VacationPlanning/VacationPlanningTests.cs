using Bogus;
using Sjekklista.Hr.ApiService.Features.Employment.Contracts.Employee.Create;
using Sjekklista.Hr.ApiService.Features.VacationPlanning.Contracts;
using Sjekklista.Hr.ApiService.Tests.Integration.Features.Employment;
using Sjekklista.Hr.ApiService.Tests.Integration.Helpers;
using Sjekklista.Hr.ApiService.Tests.Integration.Helpers.Fakes;

namespace Sjekklista.Hr.ApiService.Tests.Integration.Features.VacationPlanning
{
    [Collection(WebApplicationFixtureCollection.CollectionName)]
    public class VacationPlanningTests
    {
        private readonly Faker _faker = new();
        private readonly WebApplicationFactoryFixture _fixture;

        public VacationPlanningTests(WebApplicationFactoryFixture fixture)
        {
            _fixture = fixture;
        }

        private VacationPlanningClient GetSut(Guid tenantId)
        {
            return new(tenantId, _fixture);
        }

        [Fact]
        public async Task Persists_vacation_plan()
        {
            // Given
            var tenantId = Guid.NewGuid();
            var sut = GetSut(tenantId);

            var employeeClient = new EmploymentClient(tenantId, _fixture);
            var createEmployeeResponse = await employeeClient.CreateEmployee(new()
            {
                Employee = EmployeeFaker.Instance.Generate()
            }).As<CreateEmployeeRequest>();

            // When
            var httpResponse = await sut.SaveEmployeeVacationPlan(new SaveEmployeeVacationPlanRequest()
            {
                EmployeeVacation = new()
                {
                    EmployeeId = createEmployeeResponse.Employee.Id,
                    Year = _faker.Random.Int(2020, 2030),
                }
            });

            // Then
            await SjekklistaAssertions.Assert200OkResponse(httpResponse);

            var response = await httpResponse.As<SaveEmployeeVacationResponse>();
            var getEmployeeVacationResponse = await sut
                .GetEmployeeVacationPlan(createEmployeeResponse.Employee.Id, response.EmployeeVacation!.Year)
                .As<GetEmployeeVacationPlanResponse>();

            Assert.NotNull(getEmployeeVacationResponse.EmployeeVacation);
            Assert.Equal(response.EmployeeVacation.Year, getEmployeeVacationResponse.EmployeeVacation.Year);
        }
    }
}
