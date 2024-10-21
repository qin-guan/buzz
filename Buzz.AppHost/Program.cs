using Projects;

var builder = DistributedApplication.CreateBuilder(args);

builder.AddProject<Buzz_WebApp>("app");

builder.Build().Run();