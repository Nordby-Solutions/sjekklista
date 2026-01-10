using Microsoft.EntityFrameworkCore;
using Sjekklista.Hr.ApiService.Features.VacationPlanning.Contracts;
using Sjekklista.Hr.ApiService.Features.VacationPlanning.Models;
using Sjekklista.Hr.ApiService.Shared;

namespace Sjekklista.Hr.ApiService.Features.VacationPlanning
{
    internal class VacationPlanningService(HRDbContext _dbContext)
    {
        internal async Task<GetEmployeeVacationPlanResponse> GetEmployeeVacationPlanAsync(
            GetEmployeeVacationPlanRequest request,
            CancellationToken cancellationToken)
        {
            var existingPlan = await _dbContext.EmployeeVacationPlans
                .Where(x => x.Year == request.Year)
                .Where(x => x.EmployeeId == request.EmployeeId)
                .FirstOrDefaultAsync(cancellationToken);
            if (existingPlan is null)
                throw new ArgumentException($"No vacation plan created for Employee{request.EmployeeId} in year - {request.Year}");

            return new GetEmployeeVacationPlanResponse()
            {
                EmployeeVacation = existingPlan.ToDto()
            };
        }

        internal async Task<SaveEmployeeVacationResponse> SaveEmployeeVacationPlanAsync(
            SaveEmployeeVacationPlanRequest request,
            CancellationToken cancellationToken)
        {
            ArgumentNullException.ThrowIfNull(request.EmployeeVacation);

            var existingPlan = await _dbContext.EmployeeVacationPlans
                .Where(x => x.Year == request.EmployeeVacation.Year)
                .Where(x => x.EmployeeId == request.EmployeeVacation.EmployeeId)
                .FirstOrDefaultAsync(cancellationToken);
            if (existingPlan is not null)
                throw new Exception("Cannot save an existing vacation plan as of now.");

            var newPlan = new EmployeeVacationPlan(
                request.EmployeeVacation.Year,
                request.EmployeeVacation.EmployeeId);
            _dbContext.EmployeeVacationPlans.Add(newPlan);
            await _dbContext.SaveChangesAsync(cancellationToken);

            return new SaveEmployeeVacationResponse()
            {
                EmployeeVacation = newPlan.ToDto()
            };
        }
    }
}