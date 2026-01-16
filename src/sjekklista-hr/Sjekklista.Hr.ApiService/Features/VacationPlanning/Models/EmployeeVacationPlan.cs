using Sjekklista.Hr.ApiService.Shared.Exceptions;
using Sjekklista.Hr.ApiService.Shared.Models;

namespace Sjekklista.Hr.ApiService.Features.VacationPlanning.Models
{
    public class EmployeeVacationPlan : TenantEntity
    {
        public int Year { get; private set; }
        public Guid EmployeeId { get; private set; }
        public string? EmployeeComment { get; private set; }
        public IReadOnlyCollection<EmployeeVacationDay> VacationDays => _vacationDays.AsReadOnly();
        private List<EmployeeVacationDay> _vacationDays = new();

        protected EmployeeVacationPlan()
        {

        }

        public EmployeeVacationPlan(
            int year,
            Guid employeeId)
        {
            if (year < 2000 || year > 2100)
                throw new DomainException("Year must be between 2000 and 2100.");

            Year = year;
            EmployeeId = employeeId;
        }

        public void RequestVacation(DateOnly requestedDate)
        {
            if (_vacationDays.Any(x => x.RequestedDate == requestedDate))
                throw new DomainException($"Vacation for {requestedDate} has already been requested.");

            if (requestedDate.Year != Year)
                throw new DomainException($"Vacation date must be in year {Year}.");

            _vacationDays.Add(new EmployeeVacationDay(requestedDate));
        }

        public void SetupVacation(DateOnly vacationDate, EmployeeVacationDayStatus status, Guid setupByUserId)
        {
            if (vacationDate.Year != Year)
                throw new DomainException($"Vacation date must be in year {Year}.");

            var existingDay = _vacationDays.FirstOrDefault(x => x.RequestedDate == vacationDate);
            
            if (existingDay is not null)
            {
                existingDay.UpdateStatus(status);
            }
            else
            {
                _vacationDays.Add(new EmployeeVacationDay(vacationDate, status));
            }
        }

        public void UpdateComment(string? comment)
        {
            EmployeeComment = comment;
        }

        public void ApproveVacationDay(DateOnly date)
        {
            var vacationDay = _vacationDays.FirstOrDefault(x => x.RequestedDate == date);
            if (vacationDay is null)
                throw new DomainException($"No vacation request found for {date}.");

            vacationDay.Approve();
        }

        public void RejectVacationDay(DateOnly date)
        {
            var vacationDay = _vacationDays.FirstOrDefault(x => x.RequestedDate == date);
            if (vacationDay is null)
                throw new DomainException($"No vacation request found for {date}.");

            _vacationDays.Remove(vacationDay);
        }
    }
}
