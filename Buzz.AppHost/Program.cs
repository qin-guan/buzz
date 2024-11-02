using Projects;

var builder = DistributedApplication.CreateBuilder(args);

var api = builder.AddProject<Buzz_WebApi>("api");
builder.AddNpmApp("app", "../Buzz.WebApp", "dev")
    .WithReference(api);

builder.Build().Run();