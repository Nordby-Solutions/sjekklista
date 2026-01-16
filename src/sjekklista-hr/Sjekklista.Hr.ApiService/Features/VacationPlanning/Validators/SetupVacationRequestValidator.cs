using FluentValidation;
using Sjekklista.Hr.ApiService.Features.VacationPlanning.Contracts;

namespace Sjekklista.Hr.ApiService.Features.VacationPlanning.Validators
{
    public class SetupVacationRequestValidator : AbstractValidator<SetupVacationRequest>
    {
        public SetupVacationRequestValidator()
        {
            RuleFor(x => x.EmployeeId)
                .NotEmpty()
                .WithMessage("Employee ID is required.");

            RuleFor(x => x.Year)
                .GreaterThanOrEqualTo(2000)
                .LessThanOrEqualTo(2100)
                .WithMessage("Year must be between 2000 and 2100.");

            RuleFor(x => x.VacationDate)
                .NotEmpty()
                .WithMessage("Vacation date is required.");

            RuleFor(x => x.Status)
                .IsInEnum()
                .WithMessage("Status must be a valid value.");
        }
    }
}
