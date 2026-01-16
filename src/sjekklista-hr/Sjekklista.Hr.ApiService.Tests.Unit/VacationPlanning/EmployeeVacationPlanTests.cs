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
            var dateNow = DateTime.Now;
            var vacationPlan = new EmployeeVacationPlan(
                dateNow.Year, Guid.NewGuid());

            var dateToRequest = DateOnly.FromDateTime(dateNow);
            vacationPlan.RequestVacation(dateToRequest);

            // When & Then
            var err = Assert.Throws<DomainException>(() =>
                vacationPlan.RequestVacation(dateToRequest));

            Assert.Contains("already been requested", err.Message);
        }

        [Fact]
        public void Errors_when_requesting_vacation_for_different_year()
        {
            // Given
            var year = 2026;
            var vacationPlan = new EmployeeVacationPlan(year, Guid.NewGuid());
            var dateInDifferentYear = new DateOnly(2027, 7, 15);

            // When & Then
            var err = Assert.Throws<DomainException>(() =>
                vacationPlan.RequestVacation(dateInDifferentYear));

            Assert.Contains($"must be in year {year}", err.Message);
        }

        [Fact]
        public void Admin_can_setup_vacation_for_employee()
        {
            // Given
            var vacationPlan = new EmployeeVacationPlan(2026, Guid.NewGuid());
            var vacationDate = new DateOnly(2026, 7, 15);
            var adminUserId = Guid.NewGuid();

            // When
            vacationPlan.SetupVacation(vacationDate, EmployeeVacationDayStatus.Approved, adminUserId);

            // Then
            Assert.Single(vacationPlan.VacationDays);
            var day = vacationPlan.VacationDays.First();
            Assert.Equal(vacationDate, day.RequestedDate);
            Assert.Equal(EmployeeVacationDayStatus.Approved, day.Status);
        }

        [Fact]
        public void Admin_can_update_existing_vacation_day_status()
        {
            // Given
            var vacationPlan = new EmployeeVacationPlan(2026, Guid.NewGuid());
            var vacationDate = new DateOnly(2026, 7, 15);
            vacationPlan.RequestVacation(vacationDate);
            var adminUserId = Guid.NewGuid();

            // When
            vacationPlan.SetupVacation(vacationDate, EmployeeVacationDayStatus.Approved, adminUserId);

            // Then
            Assert.Single(vacationPlan.VacationDays);
            var day = vacationPlan.VacationDays.First();
            Assert.Equal(EmployeeVacationDayStatus.Approved, day.Status);
        }

        [Fact]
        public void Can_approve_vacation_day()
        {
            // Given
            var vacationPlan = new EmployeeVacationPlan(2026, Guid.NewGuid());
            var vacationDate = new DateOnly(2026, 7, 15);
            vacationPlan.RequestVacation(vacationDate);

            // When
            vacationPlan.ApproveVacationDay(vacationDate);

            // Then
            var day = vacationPlan.VacationDays.First();
            Assert.Equal(EmployeeVacationDayStatus.Approved, day.Status);
        }

        [Fact]
        public void Can_reject_vacation_day()
        {
            // Given
            var vacationPlan = new EmployeeVacationPlan(2026, Guid.NewGuid());
            var vacationDate = new DateOnly(2026, 7, 15);
            vacationPlan.RequestVacation(vacationDate);

            // When
            vacationPlan.RejectVacationDay(vacationDate);

            // Then
            Assert.Empty(vacationPlan.VacationDays);
        }

        [Fact]
        public void Errors_when_approving_non_existent_vacation_day()
        {
            // Given
            var vacationPlan = new EmployeeVacationPlan(2026, Guid.NewGuid());
            var vacationDate = new DateOnly(2026, 7, 15);

            // When & Then
            var err = Assert.Throws<DomainException>(() =>
                vacationPlan.ApproveVacationDay(vacationDate));

            Assert.Contains("No vacation request found", err.Message);
        }

        [Fact]
        public void Can_update_employee_comment()
        {
            // Given
            var vacationPlan = new EmployeeVacationPlan(2026, Guid.NewGuid());
            var comment = "I need this time off for family vacation";

            // When
            vacationPlan.UpdateComment(comment);

            // Then
            Assert.Equal(comment, vacationPlan.EmployeeComment);
        }

        [Fact]
        public void Multiple_vacation_days_can_be_requested()
        {
            // Given
            var vacationPlan = new EmployeeVacationPlan(2026, Guid.NewGuid());
            var dates = new[]
            {
                new DateOnly(2026, 7, 1),
                new DateOnly(2026, 7, 2),
                new DateOnly(2026, 7, 3)
            };

            // When
            foreach (var date in dates)
            {
                vacationPlan.RequestVacation(date);
            }

            // Then
            Assert.Equal(3, vacationPlan.VacationDays.Count);
            Assert.All(vacationPlan.VacationDays, day =>
                Assert.Equal(EmployeeVacationDayStatus.Pending, day.Status));
        }
    }
}
