var builder = DistributedApplication.CreateBuilder(args);

var apiService = builder.AddProject<Projects.Sjekklista_ApiService>("apiservice")
    .WithHttpHealthCheck("/health");

builder.AddJavaScriptApp("sjekklistahr", "../sjekklistahr")
    .WithHttpEndpoint(port: 5173, env: "PORT")
    .WithExternalHttpEndpoints()
    .WithEnvironment("VITE_API_BASE_URL", apiService.GetEndpoint("http"))
    .PublishAsDockerFile();

builder.Build().Run();
