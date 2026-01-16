using Microsoft.AspNetCore.Identity;

namespace Sjekklista.Identity.Models
{
    public class ApplicationUser : IdentityUser
    {
        public Guid UserGuid { get; set; }
    }
}
