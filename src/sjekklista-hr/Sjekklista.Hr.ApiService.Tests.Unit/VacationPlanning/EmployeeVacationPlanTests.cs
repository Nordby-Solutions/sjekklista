using Sjekklista.Hr.ApiService.Features.VacationPlanning.Models;
using Sjekklista.Hr.ApiService.Shared.Exceptions;

namespace Sjekklista.Hr.ApiService.Tests.Unit.VacationPlanning
{
    public class EmployeeVacationPlanTests
    {
        [Fact]
        public void Request_vacation_marks_as_pending()
        {
            // Given
            var vacationPlan = new EmployeeVacationPlan(
                2026, Guid.NewGuid());

            var dateToRequest = DateOnly.FromDateTime(DateTime.Now);

            // When
            vacationPlan.RequestVacation(dateToRequest);

            // Then
            Assert.NotEmpty(vacationPlan.VacationDays);
            Assert.Single(vacationPlan.VacationDays, x =>
                x.RequestedDate == dateToRequest
                && x.Status == EmployeeVacationDayStatus.Pending);
        }

        [Fact]
        public void Errors_when_requesting_existing_vacation_day()
        {
            // Given
            var vacationPlan = new EmployeeVacationPlan(
                2026, Guid.NewGuid());

            var dateToRequest = DateOnly.FromDateTime(DateTime.Now);
            vacationPlan.RequestVacation(dateToRequest);

            // When & Then
            var err = Assert.Throws<DomainException>(() =>
                vacationPlan.RequestVacation(dateToRequest));

            Assert.Contains("already requested", err.Message);
        }
    }
}
