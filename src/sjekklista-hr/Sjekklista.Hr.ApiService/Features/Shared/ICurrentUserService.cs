namespace Sjekklista.Hr.ApiService.Features.Shared
{
    public interface ICurrentUserService
    {
        public Guid SignedOnUserId { get; }
    }
}
