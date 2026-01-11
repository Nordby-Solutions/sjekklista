using FluentValidation;
using Sjekklista.Hr.ApiService.Features.VacationPlanning.Contracts;

namespace Sjekklista.Hr.ApiService.Features.VacationPlanning.Validators
{
    internal sealed class SaveEmployeeVacationPlanRequestValidator : AbstractValidator<SaveEmployeeVacationPlanRequest>
    {
        public SaveEmployeeVacationPlanRequestValidator()
        {
            RuleFor(x => x.EmployeeVacation).NotNull();

            RuleFor(x => x.EmployeeVacation.EmployeeId)
                .NotEmpty()
                .WithMessage("EmployeeId is required.");

            RuleFor(x => x.EmployeeVacation.Year)
                .InclusiveBetween(DateTime.UtcNow.Year - 10, DateTime.UtcNow.Year + 10)
                .WithMessage("Year must be within a reasonable range.");
        }
    }
}
