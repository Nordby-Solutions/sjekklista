using Sjekklista.Hr.ApiService.Features.Employment.Contracts.Employee;
using Sjekklista.Hr.ApiService.Features.Employment.Models;

namespace Sjekklista.Hr.ApiService.Features.Employment
{
    internal static class EmploymentMapper
    {
        internal static EmployeeDto ToDto(this Employee employee)
        {
            return new EmployeeDto
            {
                Id = employee.Id,
                Firstname = employee.Firstname,
                Lastname = employee.Lastname,
                DateOfBirth = employee.DateOfBirth,
                PersonalEmailAddress = employee.PersonalEmailAddress,
                PhoneNumber = employee.PhoneNumber,
                TenantId = employee.TenantId,
                CreatedByUserId = employee.CreatedByUserId
            };
        }
    }
}
