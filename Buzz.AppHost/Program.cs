using Projects;

var builder = DistributedApplication.CreateBuilder(args);

builder.AddProject<Buzz_WebApi>("api");

builder.Build().Run();