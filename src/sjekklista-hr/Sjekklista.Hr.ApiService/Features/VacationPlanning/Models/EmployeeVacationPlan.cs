using Sjekklista.Hr.ApiService.Shared.Exceptions;
using Sjekklista.Hr.ApiService.Shared.Models;

namespace Sjekklista.Hr.ApiService.Features.VacationPlanning.Models
{
    public class EmployeeVacationPlan : TenantEntity
    {
        public int Year { get; private set; }
        public Guid EmployeeId { get; private set; }

        private List<EmployeeVacationDay> _vacationDays = new();
        public IReadOnlyCollection<EmployeeVacationDay> VacationDays => _vacationDays.AsReadOnly();

        protected EmployeeVacationPlan()
        {

        }

        public EmployeeVacationPlan(
            int year,
            Guid employeeId)
        {
            Year = year;
            EmployeeId = employeeId;
        }

        public void RequestVacation(DateOnly requestedDate)
        {
            if (_vacationDays.Any(x => x.RequestedDate == requestedDate))
                throw new DomainException("Date is already requested.");

            _vacationDays.Add(new EmployeeVacationDay(requestedDate));
        }
    }
}
