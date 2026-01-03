namespace Sjekklista.Hr.ApiService.Tests.Unit.Employment;

using Sjekklista.Hr.ApiService.Features.Employment.Models;
using Sjekklista.Hr.ApiService.Shared.Exceptions;
using System;
using Xunit;

public class EmploymentContractTests
{
    [Fact]
    public void Creating_contract_with_valid_percentage_succeeds()
    {
        // Arrange
        var employeeId = Guid.NewGuid();
        var start = new DateOnly(2025, 1, 1);

        // Act
        var contract = new EmploymentContract(
            employeeId,
            ContractType.FullTime,
            100,
            start
        );

        // Assert
        Assert.Equal(employeeId, contract.EmployeeId);
        Assert.Equal(ContractType.FullTime, contract.Type);
        Assert.Equal(100, contract.EmploymentPercentage);
        Assert.Equal(start, contract.StartDate);
        Assert.Null(contract.EndDate);
    }

    [Theory]
    [InlineData(0)]
    [InlineData(-10)]
    [InlineData(150)]
    public void Creating_contract_with_invalid_percentage_throws(decimal percentage)
    {
        var employeeId = Guid.NewGuid();
        var start = new DateOnly(2025, 1, 1);

        Assert.Throws<DomainException>(() =>
            new EmploymentContract(
                employeeId,
                ContractType.PartTime,
                percentage,
                start
            )
        );
    }

    [Fact]
    public void Ending_contract_sets_end_date()
    {
        // Arrange
        var contract = new EmploymentContract(
            Guid.NewGuid(),
            ContractType.FullTime,
            100,
            new DateOnly(2025, 1, 1)
        );

        var endDate = new DateOnly(2025, 12, 31);

        // Act
        contract.End(endDate);

        // Assert
        Assert.Equal(endDate, contract.EndDate);
    }

    [Fact]
    public void Ending_contract_twice_throws()
    {
        // Arrange
        var contract = new EmploymentContract(
            Guid.NewGuid(),
            ContractType.FullTime,
            100,
            new DateOnly(2025, 1, 1)
        );

        contract.End(new DateOnly(2025, 6, 1));

        // Act & Assert
        Assert.Throws<DomainException>(() =>
            contract.End(new DateOnly(2025, 7, 1))
        );
    }

    [Fact]
    public void Ending_contract_before_start_date_throws()
    {
        // Arrange
        var contract = new EmploymentContract(
            Guid.NewGuid(),
            ContractType.FullTime,
            100,
            new DateOnly(2025, 1, 1)
        );

        var invalidEnd = new DateOnly(2024, 12, 31);

        // Act & Assert
        Assert.Throws<DomainException>(() => contract.End(invalidEnd));
    }

    [Fact]
    public void Changing_percentage_to_valid_value_succeeds()
    {
        // Arrange
        var contract = new EmploymentContract(
            Guid.NewGuid(),
            ContractType.PartTime,
            50,
            new DateOnly(2025, 1, 1)
        );

        // Act
        contract.ChangePercentage(80);

        // Assert
        Assert.Equal(80, contract.EmploymentPercentage);
    }

    [Theory]
    [InlineData(0)]
    [InlineData(-5)]
    [InlineData(200)]
    public void Changing_percentage_to_invalid_value_throws(decimal newPercentage)
    {
        // Arrange
        var contract = new EmploymentContract(
            Guid.NewGuid(),
            ContractType.PartTime,
            50,
            new DateOnly(2025, 1, 1)
        );

        // Act & Assert
        Assert.Throws<DomainException>(() => contract.ChangePercentage(newPercentage));
    }

    [Fact]
    public void Weekly_template_is_optional()
    {
        // Arrange
        var template = new WeeklyTemplate(new[]
        {
            new WorkDay(DayOfWeek.Monday, new TimeOnly(9,0), new TimeOnly(17,0))
        });

        // Act
        var contract = new EmploymentContract(
            Guid.NewGuid(),
            ContractType.FullTime,
            100,
            new DateOnly(2025, 1, 1),
            template
        );

        // Assert
        Assert.NotNull(contract.DefaultWorkWeek);
        Assert.Single(contract.DefaultWorkWeek.Days);
    }
}