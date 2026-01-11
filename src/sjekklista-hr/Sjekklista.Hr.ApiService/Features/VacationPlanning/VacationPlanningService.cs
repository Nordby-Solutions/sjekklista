using Microsoft.EntityFrameworkCore;
using Sjekklista.Hr.ApiService.Features.VacationPlanning.Contracts;
using Sjekklista.Hr.ApiService.Features.VacationPlanning.Models;
using Sjekklista.Hr.ApiService.Shared;

namespace Sjekklista.Hr.ApiService.Features.VacationPlanning
{
    internal class VacationPlanningService(HRDbContext _dbContext)
    {
        internal async Task<Result<GetEmployeeVacationPlanResponse>> GetEmployeeVacationPlanAsync(
            GetEmployeeVacationPlanRequest request,
            CancellationToken cancellationToken)
        {
            var existingPlan = await _dbContext.EmployeeVacationPlans
                .Where(x => x.Year == request.Year)
                .Where(x => x.EmployeeId == request.EmployeeId)
                .FirstOrDefaultAsync(cancellationToken);

            if (existingPlan is null)
            {
                return Result.Failure<GetEmployeeVacationPlanResponse>(
                    new Error(VacationPlanningErrorCodes.PlanNotFound,
                        $"Vacation plan not found for employee {request.EmployeeId} in {request.Year}."));
            }

            return Result.Success(new GetEmployeeVacationPlanResponse
            {
                EmployeeVacation = existingPlan.ToDto()
            });
        }

        internal async Task<Result<SaveEmployeeVacationPlanResponse>> SaveEmployeeVacationPlanAsync(
            SaveEmployeeVacationPlanRequest request,
            CancellationToken cancellationToken)
        {
            var existingPlan = await _dbContext.EmployeeVacationPlans
                .Where(x => x.Year == request.EmployeeVacation.Year)
                .Where(x => x.EmployeeId == request.EmployeeVacation.EmployeeId)
                .FirstOrDefaultAsync(cancellationToken);

            if (existingPlan is not null)
            {
                return Result.Failure<SaveEmployeeVacationPlanResponse>(
                    new Error(VacationPlanningErrorCodes.PlanAlreadyExists,
                        "A vacation plan already exists for this employee and year."));
            }

            var newPlan = new EmployeeVacationPlan(
                request.EmployeeVacation.Year,
                request.EmployeeVacation.EmployeeId);

            _dbContext.EmployeeVacationPlans.Add(newPlan);
            await _dbContext.SaveChangesAsync(cancellationToken);

            return Result.Success(new SaveEmployeeVacationPlanResponse
            {
                EmployeeVacation = newPlan.ToDto()
            });
        }
    }
}