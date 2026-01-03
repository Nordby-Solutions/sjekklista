using Sjekklista.Hr.ApiService.Shared.Exceptions;
using Sjekklista.Hr.ApiService.Shared.Models;

namespace Sjekklista.Hr.ApiService.Features.Employment.Models
{
    public class EmploymentContract : TenantEntity
    {
        public Guid Id { get; private set; }
        public Guid EmployeeId { get; private set; }

        public ContractType Type { get; private set; }
        public decimal EmploymentPercentage { get; private set; } // 100, 80, 50 etc.

        public DateOnly StartDate { get; private set; }
        public DateOnly? EndDate { get; private set; }

        public WeeklyTemplate? DefaultWorkWeek { get; private set; }

        protected EmploymentContract() { }

        public EmploymentContract(
            Guid employeeId,
            ContractType type,
            decimal percentage,
            DateOnly startDate,
            WeeklyTemplate? defaultWorkWeek = null)
        {
            if (percentage <= 0 || percentage > 100)
                throw new DomainException("Employment percentage must be between 1 and 100.");

            Id = Guid.NewGuid();
            EmployeeId = employeeId;
            Type = type;
            EmploymentPercentage = percentage;
            StartDate = startDate;
            DefaultWorkWeek = defaultWorkWeek;
        }

        public void End(DateOnly endDate)
        {
            if (EndDate is not null)
                throw new DomainException("Contract already ended.");

            if (endDate < StartDate)
                throw new DomainException("End date cannot be before start date.");

            EndDate = endDate;
        }

        public void ChangePercentage(decimal newPercentage)
        {
            if (newPercentage <= 0 || newPercentage > 100)
                throw new DomainException("Employment percentage must be between 1 and 100.");

            EmploymentPercentage = newPercentage;
        }
    }

    public enum ContractType
    {
        FullTime,
        PartTime,
        Hourly
    }
}
