using Bogus;
using System.ComponentModel;

namespace Sjekklista.ApiService.Tests.Integration.Features.Employment
{
    [Collection(WebApplicationFixtureCollection.CollectionName)]
    public class EmploymentEndpointsTest
    {
        private readonly Faker _faker = new();
        private EmploymentClient _employmentClient;

        public EmploymentEndpointsTest(WebApplicationFactoryFixture fixture)
        {
            _employmentClient = new EmploymentClient(fixture);
        }

        [Fact]
        public async Task Creates_employee()
        {
            HttpResponseMessage response = await _employmentClient.CreateEmployee();
        }

        [Fact]
        public async Task Updates_employee()
        {
            HttpResponseMessage response = await _employmentClient.UpdateEmployee();
        }

        [Fact]
        public async Task Deletes_employee()
        {
            HttpResponseMessage response = await _employmentClient.DeleteEmployee();
        }

        [Fact]
        public async Task Get_employees_returns_all_employees()
        {
            HttpResponseMessage response = await _employmentClient.GetEmployees();
        }


        [Fact]
        [Description("Ensures that all information related to is obfuscated and there is no way of tracing it back to the person.")]
        public async Task Sensures_all_information_by_employee()
        {

        }
    }
}
