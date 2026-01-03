namespace Sjekklista.Hr.ApiService.Features.Tenancy.Models
{
    public class Tenant
    {
        public Guid Id { get; set; }
        public int Number { get; set; }
        public string Name { get; set; }
        public string Slug { get; set; }
        public DateTime Created { get; set; }
    }
}
