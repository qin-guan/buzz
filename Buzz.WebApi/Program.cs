using System.Text.Json;
using Buzz.WebApi.Options;
using Buzz.WebApi.Services.DataMall;
using Buzz.WebApi.Services.MiniSearch;

var builder = WebApplication.CreateSlimBuilder(args);

builder.Services.AddOpenApi();

builder.Services.AddOptions<DataMallOptions>()
    .Bind(builder.Configuration.GetSection("DataMall"));

builder.Services.AddHttpClient<DataMallService>();

#pragma warning disable EXTEXP0018
builder.Services.AddHybridCache(options =>
{
    options.MaximumPayloadBytes = 100 * 1024 * 1024; // 100MB
});
#pragma warning restore EXTEXP0018

builder.Services.AddCors(options => { options.AddDefaultPolicy(policy => { policy.AllowAnyOrigin(); }); });

builder.Services.AddSingleton<DataMallService>();
builder.Services.AddSingleton<MiniSearchService>();

var app = builder.Build();

app.UseCors();

app.MapOpenApi();

app.MapGet("/MiniSearch",
    async (CancellationToken ct, MiniSearchService service) =>
        TypedResults.Text(await service.GetMiniSearchIndexAsync(ct))
);

app.MapGet("/BusStops", async (CancellationToken ct, DataMallService service) => await service.GetBusStopsAsync(ct));

app.MapGet(
    "/BusStops/{Code}/Services",
    async (CancellationToken ct, DataMallService service, string code) =>
        await service.GetBusServicesForStopAsync(code, ct)
);

app.MapGet(
    "/Stations",
    async (CancellationToken ct, DataMallService service) =>
        await service.GetTrainStationCrowd(ct)
);

app.Run();