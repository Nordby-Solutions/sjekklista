var builder = DistributedApplication.CreateBuilder(args);


var apiService = builder.AddProject<Projects.Sjekklista_Hr_ApiService>("apiservice")
    .WithHttpHealthCheck("/health");

builder.AddJavaScriptApp("sjekklistahr", "../sjekklistahr")
    .WithExternalHttpEndpoints()
    .WithEnvironment("VITE_API_BASE_URL", apiService.GetEndpoint("http"))
    .WithEnvironment("VITE_AUTH_AUTHORITY", "https://5ea6f635-ad0f-4bd0-864b-05560252d210.ciamlogin.com/5ea6f635-ad0f-4bd0-864b-05560252d210/")
    .WithEnvironment("VITE_AUTH_POST_LOGOUT_URI", "http://localhost:5173")
    .WithEnvironment("VITE_AUTH_REDIRECT_URI", "http://localhost:5173/callback")
    .PublishAsDockerFile();

builder.Build().Run();
