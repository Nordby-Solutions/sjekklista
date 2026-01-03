namespace Sjekklista.Hr.ApiService.Features.Employment.Contracts.Contract
{
    public record WeeklyTemplateDto
    {
        public IReadOnlyCollection<WorkDayDto> Days { get; set; }
    }

    public record WorkDayDto
    {
        public DayOfWeek Day { get; set; }
        public TimeOnly Start { get; set; }
        public TimeOnly End { get; set; }
    }

}
