using Bogus;
using Sjekklista.Hr.ApiService.Features.Employment.Contracts.Employee;
using Sjekklista.Hr.ApiService.Features.Employment.Contracts.Employee.Create;
using Sjekklista.Hr.ApiService.Features.Employment.Contracts.Employee.Get;
using Sjekklista.Hr.ApiService.Tests.Integration.Helpers;

namespace Sjekklista.Hr.ApiService.Tests.Integration.Features.Employment
{
    [Collection(WebApplicationFixtureCollection.CollectionName)]
    public class EmploymentEndpointsTest
    {
        private readonly Faker _faker = new();
        private readonly WebApplicationFactoryFixture _fixture;

        public EmploymentEndpointsTest(WebApplicationFactoryFixture fixture)
        {
            _fixture = fixture;
        }

        private EmploymentClient GetEmploymentClient(Guid tenantId)
        {
            return new EmploymentClient(tenantId, _fixture);
        }

        [Fact]
        public async Task Creates_employee()
        {
            // Arrange
            var tenantId = Guid.NewGuid();
            var sut = GetEmploymentClient(tenantId);
            var employeeDto = new EmployeeDto()
            {
                Firstname = _faker.Name.FirstName(),
                Lastname = _faker.Name.LastName(),
                DateOfBirth = DateOnly.FromDateTime(_faker.Date.Past(30, DateTime.Now.AddYears(-18))),
                PersonalEmailAddress = _faker.Internet.Email(),
                PhoneNumber = _faker.Phone.PhoneNumber()
            };

            // Act
            var httpResponse = await sut.CreateEmployee(new()
            {
                Employee = employeeDto
            });

            // Assert
            await SjekklistaAssertions.Assert200OkResponse(httpResponse);

            var getEmployeesResponse = await sut
                .ListEmployees(new())
                .As<ListEmployeesResponse>();
            Assert.Contains(getEmployeesResponse.Employees, e =>
                e.Firstname == employeeDto.Firstname
                && e.Lastname == employeeDto.Lastname
                && e.DateOfBirth == employeeDto.DateOfBirth
                && e.PersonalEmailAddress == employeeDto.PersonalEmailAddress
                && e.PhoneNumber == employeeDto.PhoneNumber
                && e.TenantId == tenantId);
        }

        [Fact]
        public async Task Updates_employee()
        {
            // Arrange
            var tenantId = Guid.NewGuid();
            var sut = GetEmploymentClient(tenantId);

            var createEmployeeResponse = await sut.CreateEmployee(new()
            {
                Employee = new EmployeeDto()
                {
                    Firstname = _faker.Name.FirstName(),
                    Lastname = _faker.Name.LastName(),
                    DateOfBirth = DateOnly.FromDateTime(_faker.Date.Past(30, DateTime.Now.AddYears(-18))),
                    PersonalEmailAddress = _faker.Internet.Email(),
                    PhoneNumber = _faker.Phone.PhoneNumber()
                }
            }).As<CreateEmployeeResponse>();
            var createdEmployee = createEmployeeResponse.Employee;

            // Act
            var updateEmployeeDto = new EmployeeDto()
            {
                Id = createdEmployee.Id,
                Firstname = _faker.Name.FirstName(),
                Lastname = _faker.Name.LastName(),
                DateOfBirth = DateOnly.FromDateTime(_faker.Date.Past(30, DateTime.Now.AddYears(-18))),
                PersonalEmailAddress = _faker.Internet.Email(),
                PhoneNumber = _faker.Phone.PhoneNumber()
            };
            var updateHttpResponse = await sut.UpdateEmployee(new()
            {
                Employee = updateEmployeeDto
            });

            // Assert
            await SjekklistaAssertions.Assert200OkResponse(updateHttpResponse);

            var getEmployeesResponse = await sut
                .ListEmployees(new())
                .As<ListEmployeesResponse>();
            var targetedEmployee = getEmployeesResponse.Employees
                .First(e => e.Id == createdEmployee.Id);
            Assert.Equal(updateEmployeeDto.Firstname, targetedEmployee.Firstname);
            Assert.Equal(updateEmployeeDto.Lastname, targetedEmployee.Lastname);
            Assert.Equal(updateEmployeeDto.DateOfBirth, targetedEmployee.DateOfBirth);
            Assert.Equal(updateEmployeeDto.PhoneNumber, targetedEmployee.PhoneNumber);
        }

        [Fact]
        public async Task Gets_single_employee()
        {
            // Given
            var sut = GetEmploymentClient(Guid.NewGuid());

            var createEmployeeResponse = await sut.CreateEmployee(new()
            {
                Employee = new EmployeeDto()
                {
                    Firstname = _faker.Name.FirstName(),
                    Lastname = _faker.Name.LastName(),
                    DateOfBirth = DateOnly.FromDateTime(_faker.Date.Past(30, DateTime.Now.AddYears(-18))),
                    PersonalEmailAddress = _faker.Internet.Email(),
                    PhoneNumber = _faker.Phone.PhoneNumber()
                }
            }).As<CreateEmployeeResponse>();

            // When
            var httpResponse = await sut.GetEmployee(createEmployeeResponse.Employee.Id);

            // Then
            await SjekklistaAssertions.Assert200OkResponse(httpResponse);

            var response = await httpResponse.Content.ReadFromJsonAsync<GetEmployeeResponse>();
            Assert.NotNull(response);
            Assert.NotNull(response.Employee);
        }

        [Fact]
        public async Task Deletes_employee()
        {
            // Given
            var sut = GetEmploymentClient(Guid.NewGuid());

            var createEmployeeResponse = await sut.CreateEmployee(new()
            {
                Employee = new EmployeeDto()
                {
                    Firstname = _faker.Name.FirstName(),
                    Lastname = _faker.Name.LastName(),
                    DateOfBirth = DateOnly.FromDateTime(_faker.Date.Past(30, DateTime.Now.AddYears(-18))),
                    PersonalEmailAddress = _faker.Internet.Email(),
                    PhoneNumber = _faker.Phone.PhoneNumber()
                }
            }).As<CreateEmployeeResponse>();

            // When
            var httpResponse = await sut.DeleteEmployee(createEmployeeResponse.Employee.Id);

            // Then
            await SjekklistaAssertions.Assert200OkResponse(httpResponse);
        }

        [Fact]
        public async Task Get_employees_returns_all_employees_inside_tenant()
        {
            // Given
            var targetedTenantId = Guid.NewGuid();
            var sut = GetEmploymentClient(targetedTenantId);

            var createEmployeeResponse = await sut.CreateEmployee(new()
            {
                Employee = new EmployeeDto()
                {
                    Firstname = _faker.Name.FirstName(),
                    Lastname = _faker.Name.LastName(),
                    DateOfBirth = DateOnly.FromDateTime(_faker.Date.Past(30, DateTime.Now.AddYears(-18))),
                    PersonalEmailAddress = _faker.Internet.Email(),
                    PhoneNumber = _faker.Phone.PhoneNumber()
                }
            }).As<CreateEmployeeResponse>();
            var createdEmployee = createEmployeeResponse.Employee;

            var otherTenantId = Guid.NewGuid();
            var otherEmployeeResponse = await GetEmploymentClient(otherTenantId).CreateEmployee(new()
            {
                Employee = new EmployeeDto()
                {
                    Firstname = _faker.Name.FirstName(),
                    Lastname = _faker.Name.LastName(),
                    DateOfBirth = DateOnly.FromDateTime(_faker.Date.Past(30, DateTime.Now.AddYears(-18))),
                    PersonalEmailAddress = _faker.Internet.Email(),
                    PhoneNumber = _faker.Phone.PhoneNumber()
                }
            }).As<CreateEmployeeResponse>();

            // When
            var getEmployeesResponse = await sut
                .ListEmployees(new())
                .As<ListEmployeesResponse>();

            // Then
            Assert.DoesNotContain(getEmployeesResponse.Employees, e => e.TenantId == otherTenantId);
            Assert.All(getEmployeesResponse.Employees, e =>
            {
                Assert.Equal(targetedTenantId, e.TenantId);
            });
        }


        //[Fact]
        //[Description("Ensures that all information related to is obfuscated and there is no way of tracing it back to the person.")]
        //public async Task Sensures_all_information_by_employee()
        //{

        //}
    }
}
