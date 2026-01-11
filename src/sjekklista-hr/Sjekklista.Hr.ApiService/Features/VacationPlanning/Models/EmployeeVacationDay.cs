namespace Sjekklista.Hr.ApiService.Features.VacationPlanning.Models
{
    public class EmployeeVacationDay
    {
        public EmployeeVacationDayStatus Status { get; private set; }
        public DateOnly RequestedDate { get; private set; }

        protected EmployeeVacationDay()
        {
        }

        public EmployeeVacationDay(DateOnly dateOnly)
        {
            RequestedDate = dateOnly;
            Status = EmployeeVacationDayStatus.Pending;
        }
    }

    public enum EmployeeVacationDayStatus
    {
        Pending = 10,
        Approved = 20
    }
}
