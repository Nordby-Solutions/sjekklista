namespace Sjekklista.ApiService.Features.Tenancy.Contracts
{
    public class TenantDto
    {
        public Guid Id { get; set; }
        public int Number { get; set; }
        public string Name { get; set; }
        public string Slug { get; set; }
    }
}
