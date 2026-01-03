
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Sjekklista.Hr.ApiService.Features.Employment.Models;
using Sjekklista.Hr.ApiService.Features.Tenancy.Models;
using Sjekklista.Hr.ApiService.Shared.Models;
using System.Reflection;

namespace Sjekklista.Hr.ApiService.Shared;

public class SjekklistaHrDbContext : DbContext
{
    private readonly ITenantProvider _tenantProvider;

    public DbSet<Employee> Employees { get; set; }
    public DbSet<Tenant> Tenants { get; set; }

    public SjekklistaHrDbContext(
        DbContextOptions<SjekklistaHrDbContext> options,
        ITenantProvider tenantProvider)
        : base(options)
    {
        _tenantProvider = tenantProvider;
    }

    // Parameterless constructor for design-time tools
    protected SjekklistaHrDbContext() { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        ApplyTenantFilters(modelBuilder);
    }

    private void ApplyTenantFilters(ModelBuilder modelBuilder)
    {
        foreach (var entityType in modelBuilder.Model.GetEntityTypes())
        {
            if (typeof(TenantEntity).IsAssignableFrom(entityType.ClrType))
            {
                var method = typeof(SjekklistaHrDbContext)
                    .GetMethod(nameof(ApplyTenantFilter), BindingFlags.NonPublic | BindingFlags.Instance)!
                    .MakeGenericMethod(entityType.ClrType);

                method.Invoke(this, new object[] { modelBuilder });
            }
        }
    }

    private void ApplyTenantFilter<TEntity>(ModelBuilder builder)
        where TEntity : TenantEntity
    {
        builder.Entity<TEntity>()
            .HasQueryFilter(e => e.TenantId == _tenantProvider.TenantId);
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        foreach (var entry in ChangeTracker.Entries<TenantEntity>())
        {
            if (entry.State == EntityState.Added)
            {
                entry.Entity.TenantId = _tenantProvider.TenantId;
            }
        }

        return base.SaveChangesAsync(cancellationToken);
    }
}