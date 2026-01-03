namespace Sjekklista.Hr.ApiService.Features.Employment.Models
{
    public class WeeklyTemplate
    {
        private readonly List<WorkDay> _days = new();
        public IReadOnlyList<WorkDay> Days => _days;

        public WeeklyTemplate(IEnumerable<WorkDay> days)
        {
            _days = days.ToList();
        }
    }

    public record WorkDay(
        DayOfWeek Day,
        TimeOnly Start,
        TimeOnly End
    );
}
