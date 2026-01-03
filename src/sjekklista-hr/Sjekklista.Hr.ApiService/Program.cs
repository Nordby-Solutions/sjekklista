using Sjekklista.Hr.ApiService.Features.Employment;
using Sjekklista.Hr.ApiService.Features.Tenancy;
using Sjekklista.Hr.ApiService.Features.Tenancy.Models;
using Sjekklista.Hr.ApiService.Infrastructure;
using Sjekklista.Hr.ApiService.Infrastructure.Middleware;
using Sjekklista.Hr.ApiService.Shared;

var builder = WebApplication.CreateBuilder(args);

// Add service defaults & Aspire client integrations.
builder.AddServiceDefaults();

// Add services to the container.
builder.Services.AddProblemDetails();

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddTenantFeature();
builder.Services.AddEmploymentFeature();
builder.Services.AddInfrastructure();

builder.Services.AddCors(p =>
{
    p.AddDefaultPolicy(c => c.WithOrigins("http://localhost:5174").AllowCredentials().AllowAnyHeader().AllowAnyMethod());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseCors();
app.UseExceptionHandler();
app.UseMiddleware<TenantMiddleware>();

if (app.Environment.IsDevelopment())
{
    using var scope = app.Services.CreateScope();
    var dbContext = scope.ServiceProvider.GetRequiredService<SjekklistaHrDbContext>();

    dbContext.Tenants.Add(new Tenant()
    {
        Id = Guid.NewGuid(),
        Number = 1,
        Name = "Østby Tunet",
        Slug = "ostbytunet",
    });
    dbContext.Tenants.Add(new Tenant()
    {
        Id = Guid.NewGuid(),
        Number = 2,
        Name = "N.K.S Helsehus",
        Slug = "nks-helsehus",
    });

    await dbContext.SaveChangesAsync();

    app.MapOpenApi();
}

app.MapGroup("/user").MapTenantEndpoints();

var apiGroup = app.MapGroup("/api");

apiGroup.MapEmploymentEndpoints();

app.MapDefaultEndpoints();

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
