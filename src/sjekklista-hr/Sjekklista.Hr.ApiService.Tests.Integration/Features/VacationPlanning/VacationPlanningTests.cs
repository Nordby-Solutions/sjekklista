using Bogus;
using Sjekklista.Hr.ApiService.Features.Employment.Contracts.Employee;
using Sjekklista.Hr.ApiService.Features.Employment.Contracts.Employee.Create;
using Sjekklista.Hr.ApiService.Features.VacationPlanning.Contracts;
using Sjekklista.Hr.ApiService.Tests.Integration.Features.Employment;
using Sjekklista.Hr.ApiService.Tests.Integration.Helpers;
using Sjekklista.Hr.ApiService.Tests.Integration.Helpers.Fakes;

namespace Sjekklista.Hr.ApiService.Tests.Integration.Features.VacationPlanning;

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

    private async Task<EmployeeDto> CreateTestEmployee(Guid tenantId)
    {
        var employeeClient = new EmploymentClient(tenantId, _fixture);
        var response = await employeeClient.CreateEmployee(new()
        {
            Employee = EmployeeFaker.Instance.Generate()
        }).As<CreateEmployeeResponse>();

        return response.Employee;
    }

    [Theory]
    [InlineData(-1)]
    [InlineData(200000)]
    public async Task Create_vacation_plan_Errors_on_invalid_input(int year)
    {
        // Given
        var tenantId = Guid.NewGuid();
        var sut = GetSut(tenantId);
        var invalidVacationPlan = new EmployeeVacationPlanDto()
        {
            EmployeeId = Guid.Empty,
            Year = year,
        };

        // When
        var httpResponse = await sut.SaveEmployeeVacationPlan(new SaveEmployeeVacationPlanRequest()
        {
            EmployeeVacation = invalidVacationPlan
        });

        // Then
        var problemDetails = await SjekklistaAssertions.Assert400BadRequestValidation(httpResponse);
        Assert.Contains(problemDetails.Errors, e => e.Key.Contains(nameof(invalidVacationPlan.EmployeeId)));
        Assert.Contains(problemDetails.Errors, e => e.Key.Contains(nameof(invalidVacationPlan.Year)));
    }

    [Fact]
    public async Task Creates_vacation_plan()
    {
        // Given
        var tenantId = Guid.NewGuid();
        var sut = GetSut(tenantId);
        var employee = await CreateTestEmployee(tenantId);

        // When
        var createHttpResponse = await sut.SaveEmployeeVacationPlan(new SaveEmployeeVacationPlanRequest()
        {
            EmployeeVacation = new()
            {
                EmployeeId = employee.Id,
                Year = _faker.Random.Int(2020, 2030),
            }
        });

        // Then
        Assert.True(createHttpResponse.IsSuccessStatusCode,
            $"Expected 200 OK but got {(int)createHttpResponse.StatusCode}");

        var response = await createHttpResponse.As<SaveEmployeeVacationPlanResponse>();
        var getEmployeeVacationResponse = await sut
            .GetEmployeeVacationPlan(employee.Id, response.EmployeeVacation!.Year)
            .As<GetEmployeeVacationPlanResponse>();

        Assert.NotNull(response.EmployeeVacation);
        Assert.NotNull(getEmployeeVacationResponse.EmployeeVacation);
        Assert.Equal(response.EmployeeVacation.Year, getEmployeeVacationResponse.EmployeeVacation.Year);
    }

    [Fact]
    public async Task Employee_can_request_vacation()
    {
        // Given
        var tenantId = Guid.NewGuid();
        var sut = GetSut(tenantId);
        var employee = await CreateTestEmployee(tenantId);
        var year = 2026;
        var vacationDate = new DateOnly(2026, 7, 15);

        // When
        var httpResponse = await sut.RequestVacation(new RequestVacationRequest
        {
            EmployeeId = employee.Id,
            Year = year,
            VacationDate = vacationDate
        });

        // Then
        SjekklistaAssertions.Assert200OkResponse(httpResponse);

        var response = await httpResponse.As<RequestVacationResponse>();
        Assert.NotNull(response.EmployeeVacation);
        Assert.Equal(year, response.EmployeeVacation.Year);
        Assert.Equal(employee.Id, response.EmployeeVacation.EmployeeId);
        Assert.Single(response.EmployeeVacation.VacationDays);

        var vacationDay = response.EmployeeVacation.VacationDays.First();
        Assert.Equal(vacationDate, vacationDay.RequestedDate);
        Assert.Equal(EmployeeVacationDayStatusDto.Pending, vacationDay.Status);
    }

    [Fact]
    public async Task Employee_can_request_multiple_vacation_days()
    {
        // Given
        var tenantId = Guid.NewGuid();
        var sut = GetSut(tenantId);
        var employee = await CreateTestEmployee(tenantId);
        var year = 2026;
        var vacationDates = new[]
        {
            new DateOnly(2026, 7, 1),
            new DateOnly(2026, 7, 2),
            new DateOnly(2026, 7, 3)
        };

        // When
        foreach (var date in vacationDates)
        {
            await sut.RequestVacation(new RequestVacationRequest
            {
                EmployeeId = employee.Id,
                Year = year,
                VacationDate = date
            });
        }

        // Then
        var getResponse = await sut
            .GetEmployeeVacationPlan(employee.Id, year)
            .As<GetEmployeeVacationPlanResponse>();

        Assert.NotNull(getResponse.EmployeeVacation);
        Assert.Equal(3, getResponse.EmployeeVacation.VacationDays.Count);
        Assert.All(getResponse.EmployeeVacation.VacationDays, day =>
            Assert.Equal(EmployeeVacationDayStatusDto.Pending, day.Status));
    }

    [Fact]
    public async Task Errors_when_requesting_duplicate_vacation_day()
    {
        // Given
        var tenantId = Guid.NewGuid();
        var sut = GetSut(tenantId);
        var employee = await CreateTestEmployee(tenantId);
        var year = 2026;
        var vacationDate = new DateOnly(2026, 7, 15);

        await sut.RequestVacation(new RequestVacationRequest
        {
            EmployeeId = employee.Id,
            Year = year,
            VacationDate = vacationDate
        });

        // When
        var httpResponse = await sut.RequestVacation(new RequestVacationRequest
        {
            EmployeeId = employee.Id,
            Year = year,
            VacationDate = vacationDate
        });

        // Then
        await SjekklistaAssertions.Assert400BadRequestError(httpResponse);
    }

    [Fact]
    public async Task Admin_can_setup_vacation_for_employee()
    {
        // Given
        var tenantId = Guid.NewGuid();
        var sut = GetSut(tenantId);
        var employee = await CreateTestEmployee(tenantId);
        var year = 2026;
        var vacationDate = new DateOnly(2026, 7, 15);

        // When
        var httpResponse = await sut.SetupVacation(new SetupVacationRequest
        {
            EmployeeId = employee.Id,
            Year = year,
            VacationDate = vacationDate,
            Status = EmployeeVacationDayStatusDto.Approved
        });

        // Then
        SjekklistaAssertions.Assert200OkResponse(httpResponse);

        var response = await httpResponse.As<SetupVacationResponse>();
        Assert.NotNull(response.EmployeeVacation);
        Assert.Single(response.EmployeeVacation.VacationDays);

        var vacationDay = response.EmployeeVacation.VacationDays.First();
        Assert.Equal(vacationDate, vacationDay.RequestedDate);
        Assert.Equal(EmployeeVacationDayStatusDto.Approved, vacationDay.Status);
    }

    [Fact]
    public async Task Admin_can_update_requested_vacation_status()
    {
        // Given
        var tenantId = Guid.NewGuid();
        var sut = GetSut(tenantId);
        var employee = await CreateTestEmployee(tenantId);
        var year = 2026;
        var vacationDate = new DateOnly(2026, 7, 15);

        await sut.RequestVacation(new RequestVacationRequest
        {
            EmployeeId = employee.Id,
            Year = year,
            VacationDate = vacationDate
        });

        // When
        var httpResponse = await sut.SetupVacation(new SetupVacationRequest
        {
            EmployeeId = employee.Id,
            Year = year,
            VacationDate = vacationDate,
            Status = EmployeeVacationDayStatusDto.Approved
        });

        // Then
        SjekklistaAssertions.Assert200OkResponse(httpResponse);

        var getResponse = await sut
            .GetEmployeeVacationPlan(employee.Id, year)
            .As<GetEmployeeVacationPlanResponse>();

        Assert.NotNull(getResponse.EmployeeVacation);
        Assert.Single(getResponse.EmployeeVacation.VacationDays);

        var vacationDay = getResponse.EmployeeVacation.VacationDays.First();
        Assert.Equal(EmployeeVacationDayStatusDto.Approved, vacationDay.Status);
    }

    [Fact]
    public async Task GetAllVacationPlans_returns_all_plans_for_year()
    {
        // Given
        var tenantId = Guid.NewGuid();
        var sut = GetSut(tenantId);
        var year = 2026;

        var employee1 = await CreateTestEmployee(tenantId);
        var employee2 = await CreateTestEmployee(tenantId);
        var employee3 = await CreateTestEmployee(tenantId);

        // Create vacation plans for multiple employees
        await sut.RequestVacation(new RequestVacationRequest
        {
            EmployeeId = employee1.Id,
            Year = year,
            VacationDate = new DateOnly(2026, 7, 1)
        });

        await sut.RequestVacation(new RequestVacationRequest
        {
            EmployeeId = employee2.Id,
            Year = year,
            VacationDate = new DateOnly(2026, 8, 15)
        });

        await sut.RequestVacation(new RequestVacationRequest
        {
            EmployeeId = employee3.Id,
            Year = year,
            VacationDate = new DateOnly(2026, 9, 1)
        });

        // When
        var httpResponse = await sut.GetAllVacationPlans(year);

        // Then
        SjekklistaAssertions.Assert200OkResponse(httpResponse);

        var response = await httpResponse.As<GetAllVacationPlansResponse>();
        Assert.NotNull(response.VacationPlans);
        Assert.Equal(3, response.VacationPlans.Count);

        Assert.Contains(response.VacationPlans, p => p.EmployeeId == employee1.Id);
        Assert.Contains(response.VacationPlans, p => p.EmployeeId == employee2.Id);
        Assert.Contains(response.VacationPlans, p => p.EmployeeId == employee3.Id);

        Assert.All(response.VacationPlans, plan =>
        {
            Assert.Equal(year, plan.Year);
            Assert.NotEmpty(plan.VacationDays);
        });
    }

    [Fact]
    public async Task GetAllVacationPlans_returns_empty_list_when_no_plans_exist()
    {
        // Given
        var tenantId = Guid.NewGuid();
        var sut = GetSut(tenantId);
        var year = 2026;

        // When
        var httpResponse = await sut.GetAllVacationPlans(year);

        // Then
        SjekklistaAssertions.Assert200OkResponse(httpResponse);

        var response = await httpResponse.As<GetAllVacationPlansResponse>();
        Assert.NotNull(response.VacationPlans);
        Assert.Empty(response.VacationPlans);
    }

    [Fact]
    public async Task GetAllVacationPlans_respects_tenant_isolation()
    {
        // Given
        var tenant1 = Guid.NewGuid();
        var tenant2 = Guid.NewGuid();
        var sut1 = GetSut(tenant1);
        var sut2 = GetSut(tenant2);
        var year = 2026;

        var employee1 = await CreateTestEmployee(tenant1);
        var employee2 = await CreateTestEmployee(tenant2);

        // Create vacation for tenant1
        await sut1.RequestVacation(new RequestVacationRequest
        {
            EmployeeId = employee1.Id,
            Year = year,
            VacationDate = new DateOnly(2026, 7, 15)
        });

        // Create vacation for tenant2
        await sut2.RequestVacation(new RequestVacationRequest
        {
            EmployeeId = employee2.Id,
            Year = year,
            VacationDate = new DateOnly(2026, 8, 15)
        });

        // When
        var tenant1Response = await sut1.GetAllVacationPlans(year).As<GetAllVacationPlansResponse>();
        var tenant2Response = await sut2.GetAllVacationPlans(year).As<GetAllVacationPlansResponse>();

        // Then
        Assert.Single(tenant1Response.VacationPlans);
        Assert.Equal(employee1.Id, tenant1Response.VacationPlans.First().EmployeeId);

        Assert.Single(tenant2Response.VacationPlans);
        Assert.Equal(employee2.Id, tenant2Response.VacationPlans.First().EmployeeId);
    }

    [Fact]
    public async Task GetAllVacationPlans_includes_employee_names()
    {
        // Given
        var tenantId = Guid.NewGuid();
        var sut = GetSut(tenantId);
        var year = 2026;
        var employee = await CreateTestEmployee(tenantId);

        await sut.RequestVacation(new RequestVacationRequest
        {
            EmployeeId = employee.Id,
            Year = year,
            VacationDate = new DateOnly(2026, 7, 15)
        });

        // When
        var response = await sut.GetAllVacationPlans(year).As<GetAllVacationPlansResponse>();

        // Then
        var plan = response.VacationPlans.First();
        Assert.NotNull(plan.EmployeeFirstname);
        Assert.NotNull(plan.EmployeeLastname);
        Assert.Equal(employee.Firstname, plan.EmployeeFirstname);
        Assert.Equal(employee.Lastname, plan.EmployeeLastname);
    }

    [Theory]
    [InlineData(-1)]
    [InlineData(1999)]
    [InlineData(2101)]
    public async Task GetAllVacationPlans_validates_year(int invalidYear)
    {
        // Given
        var tenantId = Guid.NewGuid();
        var sut = GetSut(tenantId);

        // When
        var httpResponse = await sut.GetAllVacationPlans(invalidYear);

        // Then
        await SjekklistaAssertions.Assert400BadRequestValidation(httpResponse);
    }

    [Fact]
    public async Task Vacation_plan_respects_tenant_isolation()
    {
        // Given
        var tenant1 = Guid.NewGuid();
        var tenant2 = Guid.NewGuid();
        var sut1 = GetSut(tenant1);
        var sut2 = GetSut(tenant2);

        var employee1 = await CreateTestEmployee(tenant1);
        var employee2 = await CreateTestEmployee(tenant2);
        var year = 2026;

        await sut1.RequestVacation(new RequestVacationRequest
        {
            EmployeeId = employee1.Id,
            Year = year,
            VacationDate = new DateOnly(2026, 7, 15)
        });

        // When - Try to access tenant1's vacation plan from tenant2
        var httpResponse = await sut2.GetEmployeeVacationPlan(employee1.Id, year);

        // Then
        await SjekklistaAssertions.Assert404NotFound(httpResponse);
    }
}
