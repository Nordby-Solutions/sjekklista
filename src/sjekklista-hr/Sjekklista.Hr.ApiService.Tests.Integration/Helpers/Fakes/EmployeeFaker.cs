using Bogus;
using Sjekklista.Hr.ApiService.Features.Employment.Contracts.Employee;

namespace Sjekklista.Hr.ApiService.Tests.Integration.Helpers.Fakes
{
    public class EmployeeFaker
    {
        public static Faker<EmployeeDto> Instance { get; }

        static EmployeeFaker()
        {
            Instance = new Faker<EmployeeDto>()
                .RuleFor(x => x.Firstname, x => x.Person.FirstName)
                .RuleFor(x => x.Lastname, x => x.Person.LastName)
                .RuleFor(x => x.PersonalEmailAddress, x => x.Person.Email)
                .RuleFor(x => x.PhoneNumber, x => x.Person.Phone);
        }
    }
}
