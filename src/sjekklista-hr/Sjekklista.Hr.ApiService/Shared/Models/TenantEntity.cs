namespace Sjekklista.Hr.ApiService.Shared.Models
{
    public class TenantEntity
    {
        /// <summary>
        /// This property should only be updated by the DbContext when saving changes.
        /// </summary>
        public Guid TenantId { get; internal set; }
    }
}
