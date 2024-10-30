using Projects;

var builder = DistributedApplication.CreateBuilder(args);

builder.AddProject<Buzz_WebApi>("api");
builder.AddNpmApp("app", "../Buzz.WebApp", "dev")
    .WithHttpEndpoint(targetPort: 3000);

builder.Build().Run();