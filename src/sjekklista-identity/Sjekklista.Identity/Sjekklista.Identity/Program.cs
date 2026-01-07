using Duende.IdentityServer.Services;
using Duende.IdentityServer.Test;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Sjekklista.Identity;
using Sjekklista.Identity.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddRazorPages();
builder.Services.AddControllersWithViews();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddDbContext<AuthDbContext>(options =>
    options.UseInMemoryDatabase("sjekklistaidentity"));

builder.Services
    .AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<AuthDbContext>()
    .AddDefaultTokenProviders();
builder.Services
    .AddTransient<IProfileService, ProfileService>();

builder.Services
    .AddIdentityServer(options =>
    {
        options.IssuerUri = "https://login.sjekklista.no";
    })
    .AddInMemoryClients(Config.Clients)
    .AddInMemoryApiScopes(Config.ApiScopes)
    .AddInMemoryIdentityResources(Config.IdentityResources)
    .AddInMemoryApiResources(Config.ApiResources)
    .AddAspNetIdentity<ApplicationUser>()
    .AddTestUsers([
        new TestUser()
        {
            Username = "admin",
            Password = "pass",
            SubjectId = "1",
            Claims = [
                new System.Security.Claims.Claim("name", "Admin User"),
                new System.Security.Claims.Claim("role", "admin")
            ]
        }
    ])
    .AddDeveloperSigningCredential(); // dev only

builder.Services.AddCors(p =>
{
    p.AddDefaultPolicy(c => c
        .WithOrigins("http://localhost:5173")
        .AllowCredentials()
        .AllowAnyHeader()
        .AllowAnyMethod());
});

var app = builder.Build();

app.UseCors();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseIdentityServer();

app.UseAuthorization();

app.MapRazorPages();
app.MapDefaultControllerRoute();

app.Run();