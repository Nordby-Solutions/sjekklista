using Microsoft.EntityFrameworkCore;

namespace Sjekklista.ApiService.Shared
{
    public class SjekklistaDbContext : DbContext
    {
        public SjekklistaDbContext(DbContextOptions options) : base(options)
        {
        }

        protected SjekklistaDbContext()
        {
        }
    }
}
