using FluentValidation;
using Sjekklista.Hr.ApiService.Features.VacationPlanning.Contracts;

namespace Sjekklista.Hr.ApiService.Features.VacationPlanning.Validators
{
    public class GetAllVacationPlansRequestValidator : AbstractValidator<GetAllVacationPlansRequest>
    {
        public GetAllVacationPlansRequestValidator()
        {
            RuleFor(x => x.Year)
                .GreaterThanOrEqualTo(2000)
                .LessThanOrEqualTo(2100)
                .WithMessage("Year must be between 2000 and 2100.");
        }
    }
}
