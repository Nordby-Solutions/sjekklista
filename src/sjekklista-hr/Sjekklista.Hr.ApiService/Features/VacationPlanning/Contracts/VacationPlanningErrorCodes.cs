namespace Sjekklista.Hr.ApiService.Features.VacationPlanning.Contracts
{
    internal static class VacationPlanningErrorCodes
    {
        public const string PlanAlreadyExists = "VacationPlan.AlreadyExists";
        public const string PlanNotFound = "VacationPlan.NotFound";
        public const string InvalidYear = "VacationPlan.InvalidYear";
        public const string InvalidEmployeeId = "VacationPlan.InvalidEmployeeId";
    }
}
