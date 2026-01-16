using Microsoft.EntityFrameworkCore;
using Sjekklista.Hr.ApiService.Features.Shared;
using Sjekklista.Hr.ApiService.Features.VacationPlanning.Contracts;
using Sjekklista.Hr.ApiService.Features.VacationPlanning.Models;
using Sjekklista.Hr.ApiService.Shared;

namespace Sjekklista.Hr.ApiService.Features.VacationPlanning
{
    internal class VacationPlanningService(
        HRDbContext _dbContext,
        ICurrentUserService _currentUserService)
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

            var employee = await _dbContext.Employees
                .Where(e => e.Id == request.EmployeeId)
                .FirstOrDefaultAsync(cancellationToken);

            return Result.Success(new GetEmployeeVacationPlanResponse
            {
                EmployeeVacation = existingPlan.ToDto(employee)
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

            var employee = await _dbContext.Employees
                .Where(e => e.Id == request.EmployeeVacation.EmployeeId)
                .FirstOrDefaultAsync(cancellationToken);

            return Result.Success(new SaveEmployeeVacationPlanResponse
            {
                EmployeeVacation = newPlan.ToDto(employee)
            });
        }

        internal async Task<Result<RequestVacationResponse>> RequestVacationAsync(
            RequestVacationRequest request,
            CancellationToken cancellationToken)
        {
            var plan = await _dbContext.EmployeeVacationPlans
                .Where(x => x.Year == request.Year)
                .Where(x => x.EmployeeId == request.EmployeeId)
                .FirstOrDefaultAsync(cancellationToken);

            if (plan is null)
            {
                plan = new EmployeeVacationPlan(request.Year, request.EmployeeId);
                _dbContext.EmployeeVacationPlans.Add(plan);
            }

            try
            {
                plan.RequestVacation(request.VacationDate);
                await _dbContext.SaveChangesAsync(cancellationToken);

                var employee = await _dbContext.Employees
                    .Where(e => e.Id == request.EmployeeId)
                    .FirstOrDefaultAsync(cancellationToken);

                return Result.Success(new RequestVacationResponse
                {
                    EmployeeVacation = plan.ToDto(employee)
                });
            }
            catch (Exception ex)
            {
                return Result.Failure<RequestVacationResponse>(
                    new Error("VacationPlan.RequestFailed", ex.Message));
            }
        }

        internal async Task<Result<SetupVacationResponse>> SetupVacationAsync(
            SetupVacationRequest request,
            CancellationToken cancellationToken)
        {
            var plan = await _dbContext.EmployeeVacationPlans
                .Where(x => x.Year == request.Year)
                .Where(x => x.EmployeeId == request.EmployeeId)
                .FirstOrDefaultAsync(cancellationToken);

            if (plan is null)
            {
                plan = new EmployeeVacationPlan(request.Year, request.EmployeeId);
                _dbContext.EmployeeVacationPlans.Add(plan);
            }

            try
            {
                plan.SetupVacation(
                    request.VacationDate,
                    (EmployeeVacationDayStatus)request.Status,
                    _currentUserService.SignedOnUserId);

                await _dbContext.SaveChangesAsync(cancellationToken);

                var employee = await _dbContext.Employees
                    .Where(e => e.Id == request.EmployeeId)
                    .FirstOrDefaultAsync(cancellationToken);

                return Result.Success(new SetupVacationResponse
                {
                    EmployeeVacation = plan.ToDto(employee)
                });
            }
            catch (Exception ex)
            {
                return Result.Failure<SetupVacationResponse>(
                    new Error("VacationPlan.SetupFailed", ex.Message));
            }
        }

        internal async Task<Result<GetAllVacationPlansResponse>> GetAllVacationPlansAsync(
            GetAllVacationPlansRequest request,
            CancellationToken cancellationToken)
        {
            var plans = await _dbContext.EmployeeVacationPlans
                .Where(x => x.Year == request.Year)
                .ToListAsync(cancellationToken);

            var employeeIds = plans.Select(p => p.EmployeeId).Distinct().ToList();
            var employees = await _dbContext.Employees
                .Where(e => employeeIds.Contains(e.Id))
                .ToDictionaryAsync(e => e.Id, cancellationToken);

            return Result.Success(new GetAllVacationPlansResponse
            {
                VacationPlans = plans.Select(p => 
                    p.ToDto(employees.GetValueOrDefault(p.EmployeeId))).ToList()
            });
        }
    }
}