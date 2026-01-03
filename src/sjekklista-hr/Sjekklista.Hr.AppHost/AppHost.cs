var builder = DistributedApplication.CreateBuilder(args);

var identityService = builder.AddProject<Projects.Sjekklista_Identity>("identityservice")
    .WithHttpHealthCheck("/health");

var apiService = builder.AddProject<Projects.Sjekklista_Hr_ApiService>("apiservice")
    .WithHttpHealthCheck("/health");

builder.AddJavaScriptApp("sjekklistahr", "../sjekklistahr")
    .WithHttpEndpoint(port: 5174, env: "PORT")
    .WithExternalHttpEndpoints()
    .WithEnvironment("VITE_API_BASE_URL", apiService.GetEndpoint("http"))
    .WithEnvironment("VITE_AUTH_AUTHORITY", identityService.GetEndpoint("https"))
    .WithEnvironment("VITE_AUTH_POST_LOGOUT_URI", "http://localhost:5174")
    .WithEnvironment("VITE_AUTH_REDIRECT_URI", "http://localhost:5174/callback")
    .PublishAsDockerFile();

builder.Build().Run();
