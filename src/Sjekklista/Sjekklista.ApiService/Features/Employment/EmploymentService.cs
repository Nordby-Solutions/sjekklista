using Microsoft.EntityFrameworkCore;
using Sjekklista.ApiService.Features.Employment.Contracts.Employee.Create;
using Sjekklista.ApiService.Features.Employment.Contracts.Employee.Get;
using Sjekklista.ApiService.Features.Employment.Contracts.Employee.Update;
using Sjekklista.ApiService.Features.Employment.Models;
using Sjekklista.ApiService.Shared;

namespace Sjekklista.ApiService.Features.Employment
{
    public class EmploymentService(
        SjekklistaTenantBasedDbContext _dbContext)
    {
        public async Task<CreateEmployeeResponse> CreateEmployeeAsync(
            CreateEmployeeRequest request,
            CancellationToken cancellationToken)
        {
            var employee = new Employee()
            {
                Firstname = request.Employee.Firstname,
                Lastname = request.Employee.Lastname,
                DateOfBirth = request.Employee.DateOfBirth,
                PersonalEmailAddress = request.Employee.PersonalEmailAddress,
                PhoneNumber = request.Employee.PhoneNumber,
            };

            _dbContext.Employees.Add(employee);
            await _dbContext.SaveChangesAsync(cancellationToken);

            return new CreateEmployeeResponse()
            {
                Employee = employee.ToDto()
            };
        }

        internal async Task<GetEmployeesResponse> GetEmployeesAsync(
            GetEmployeesRequest request,
            CancellationToken cancellationToken)
        {
            var employeeDtos = await _dbContext.Employees
                .AsNoTracking()
                .Select(x => x.ToDto())
                .ToArrayAsync(cancellationToken);

            return new GetEmployeesResponse()
            {
                Employees = employeeDtos
            };
        }

        internal async Task<UpdateEmployeeResponse> UpdateEmployeeAsync(
            UpdateEmployeeRequest request,
            CancellationToken cancellationToken)
        {
            var employee = await _dbContext.Employees
                .SingleAsync(x => x.Id == request.Employee.Id, cancellationToken);

            employee.Firstname = request.Employee.Firstname;
            employee.Lastname = request.Employee.Lastname;
            employee.DateOfBirth = request.Employee.DateOfBirth;
            employee.PhoneNumber = request.Employee.PhoneNumber;
            employee.PersonalEmailAddress = request.Employee.PersonalEmailAddress;
            _dbContext.Employees.Update(employee);
            await _dbContext.SaveChangesAsync(cancellationToken);

            return new UpdateEmployeeResponse()
            {
                Employee = employee.ToDto()
            };
        }
    }
}
