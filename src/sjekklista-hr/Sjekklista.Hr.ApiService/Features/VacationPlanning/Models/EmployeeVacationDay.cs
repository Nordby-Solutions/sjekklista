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

        public EmployeeVacationDay(DateOnly dateOnly, EmployeeVacationDayStatus status)
        {
            RequestedDate = dateOnly;
            Status = status;
        }

        public void Approve()
        {
            Status = EmployeeVacationDayStatus.Approved;
        }

        public void UpdateStatus(EmployeeVacationDayStatus newStatus)
        {
            Status = newStatus;
        }
    }

    public enum EmployeeVacationDayStatus
    {
        Pending = 10,
        Approved = 20,
        Rejected = 30
    }
}
