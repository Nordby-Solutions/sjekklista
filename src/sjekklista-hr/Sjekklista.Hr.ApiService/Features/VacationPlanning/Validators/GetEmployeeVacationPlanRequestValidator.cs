using FluentValidation;
using Sjekklista.Hr.ApiService.Features.VacationPlanning.Contracts;

namespace Sjekklista.Hr.ApiService.Features.VacationPlanning.Validators
{
    internal sealed class GetEmployeeVacationPlanRequestValidator : AbstractValidator<GetEmployeeVacationPlanRequest>
    {
        public GetEmployeeVacationPlanRequestValidator()
        {
            RuleFor(x => x.EmployeeId).NotEmpty().WithMessage("EmployeeId is required.");

            RuleFor(x => x.Year)
                .InclusiveBetween(DateTime.UtcNow.Year - 1, DateTime.UtcNow.Year + 2)
                .WithMessage("Year must be within a reasonable range.");
        }
    }
}
