using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Sjekklista.Hr.ApiService.Features.Employment.Models;
using Sjekklista.Hr.ApiService.Features.Tenancy.Models;
using Sjekklista.Hr.ApiService.Features.VacationPlanning.Models;
using Sjekklista.Hr.ApiService.Shared.Models;
using System.Reflection;

namespace Sjekklista.Hr.ApiService.Shared;

public class HRDbContext : DbContext
{
    private readonly ITenantProvider _tenantProvider;

    public DbSet<Employee> Employees { get; set; }
    public DbSet<EmployeeVacationPlan> EmployeeVacationPlans { get; set; }
    public DbSet<Tenant> Tenants { get; set; }

    public HRDbContext(
        DbContextOptions<HRDbContext> options,
        ITenantProvider tenantProvider)
        : base(options)
    {
        _tenantProvider = tenantProvider;
    }

    // Parameterless constructor for design-time tools
    protected HRDbContext() { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Employee>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Firstname).IsRequired().HasMaxLength(200);
            entity.Property(e => e.Lastname).IsRequired().HasMaxLength(200);
            entity.Property(e => e.TenantId).IsRequired();
        });

        modelBuilder.Entity<EmployeeVacationPlan>(entity =>
        {
            entity.HasKey(e => new { e.EmployeeId, e.Year });
            entity.Property(e => e.EmployeeId).IsRequired();
            entity.Property(e => e.Year).IsRequired();
            entity.Property(e => e.TenantId).IsRequired();

            entity.Navigation(e => e.VacationDays)
                .UsePropertyAccessMode(PropertyAccessMode.Field);

            entity.OwnsMany(e => e.VacationDays, vacationDay =>
            {
                vacationDay.Property<int>("Id");
                vacationDay.HasKey("Id");
                vacationDay.Property(vd => vd.RequestedDate).IsRequired();
                vacationDay.Property(vd => vd.Status).IsRequired();
                vacationDay.WithOwner();
            });
        });

        ApplyTenantFilters(modelBuilder);
    }

    private void ApplyTenantFilters(ModelBuilder modelBuilder)
    {
        foreach (var entityType in modelBuilder.Model.GetEntityTypes())
        {
            if (typeof(TenantEntity).IsAssignableFrom(entityType.ClrType))
            {
                var method = typeof(HRDbContext)
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