using Microsoft.IdentityModel.Tokens;
using Sjekklista.Hr.ApiService.Features.Employment;
using Sjekklista.Hr.ApiService.Features.Tenancy;
using Sjekklista.Hr.ApiService.Features.Tenancy.Models;
using Sjekklista.Hr.ApiService.Features.VacationPlanning;
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
builder.Services.AddVacationPlanningFeature();
builder.Services.AddInfrastructure();

builder.Services.AddCors(p =>
{
    p.AddDefaultPolicy(c => c
        .WithOrigins("http://localhost:5173")
        .AllowCredentials()
        .AllowAnyHeader()
        .AllowAnyMethod());
});

builder.Services
    .AddAuthentication("Bearer")
    .AddJwtBearer("Bearer", options =>
    {
        options.Authority = "https://login.microsoftonline.com/5ea6f635-ad0f-4bd0-864b-05560252d210";
        options.RequireHttpsMetadata = true;

        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateAudience = true,
            ValidAudience = "cbb438ce-224e-475b-9cea-c1b36646f434",
            ValidateIssuer = true,
            ValidIssuer = "https://login.microsoftonline.com/5ea6f635-ad0f-4bd0-864b-05560252d210/v2.0"
        };
    });

builder.Services.AddAuthorization();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseCors();
app.UseExceptionHandler();
app.UseAuthentication();
app.UseAuthorization();
app.UseMiddleware<TenantMiddleware>();

if (app.Environment.IsDevelopment())
{
    using var scope = app.Services.CreateScope();
    var dbContext = scope.ServiceProvider.GetRequiredService<HRDbContext>();

    dbContext.Tenants.Add(new Tenant()
    {
        Id = Guid.NewGuid(),
        Number = 1,
        Name = "Tunet pleie",
        Slug = "tunet_pleie",
    });
    dbContext.Tenants.Add(new Tenant()
    {
        Id = Guid.NewGuid(),
        Number = 2,
        Name = "Helsehuset",
        Slug = "helsehuset",
    });

    await dbContext.SaveChangesAsync();

    app.MapOpenApi();
}

app.MapGroup("/user")
    .RequireAuthorization()
    .MapTenantEndpoints();

var apiGroup = app
    .MapGroup("/api")
    .RequireAuthorization();

apiGroup.MapEmploymentEndpoints();
apiGroup.MapVacationPlanningEndpoints();

app.MapDefaultEndpoints();
app.Run();


