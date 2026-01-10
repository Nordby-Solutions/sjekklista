using Microsoft.EntityFrameworkCore;
using Sjekklista.Hr.ApiService.Features.Employment.Contracts.Employee.Create;
using Sjekklista.Hr.ApiService.Features.Employment.Contracts.Employee.Delete;
using Sjekklista.Hr.ApiService.Features.Employment.Contracts.Employee.Get;
using Sjekklista.Hr.ApiService.Features.Employment.Contracts.Employee.Update;
using Sjekklista.Hr.ApiService.Features.Employment.Models;
using Sjekklista.Hr.ApiService.Features.Shared;
using Sjekklista.Hr.ApiService.Shared;

namespace Sjekklista.Hr.ApiService.Features.Employment
{
    public class EmployeeService(
        ICurrentUserService _currentUserService,
        HRDbContext _dbContext)
    {
        public async Task<GetEmployeeResponse> GetEmployeeAsync(
            GetEmployeeRequest request,
            CancellationToken cancellationToken)
        {
            var employee = await _dbContext.Employees
                .AsNoTracking()
                .Where(x => x.Id == request.EmployeeId)
                .Select(x => x.ToDto())
                .SingleOrDefaultAsync(cancellationToken);

            return new GetEmployeeResponse { Employee = employee };
        }

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
                StartDate = request.Employee.StartDate,
                EndDate = request.Employee.EndDate,
                CreatedByUserId = _currentUserService.SignedOnUserId
            };

            _dbContext.Employees.Add(employee);
            await _dbContext.SaveChangesAsync(cancellationToken);

            return new CreateEmployeeResponse()
            {
                Employee = employee.ToDto()
            };
        }

        internal async Task<ListEmployeesResponse> ListEmployeesAsync(
            ListEmployeesRequest request,
            CancellationToken cancellationToken)
        {
            var employeeDtos = await _dbContext.Employees
                .AsNoTracking()
                .Select(x => x.ToDto())
                .ToArrayAsync(cancellationToken);

            return new ListEmployeesResponse()
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

        internal async Task<DeleteEmployeeResponse> DeleteEmployeeAsync(
            DeleteEmployeeRequest deleteEmployeeRequest,
            CancellationToken cancellationToken)
        {
            var employee = await _dbContext.Employees
                .SingleAsync(x => x.Id == deleteEmployeeRequest.EmployeeId, cancellationToken);

            _dbContext.Employees.Remove(employee);
            await _dbContext.SaveChangesAsync(cancellationToken);

            return new DeleteEmployeeResponse()
            {
                Success = true
            };
        }
    }
}
