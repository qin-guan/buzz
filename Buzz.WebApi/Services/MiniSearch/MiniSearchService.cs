using System.Text.Json;
using Buzz.WebApi.Services.DataMall;
using Microsoft.ClearScript.V8;
using Microsoft.Extensions.Caching.Hybrid;

namespace Buzz.WebApi.Services.MiniSearch;

public class MiniSearchService(HybridCache cache, HttpClient httpClient, DataMallService dataMallService)
{
    public async Task<string> GetMiniSearchIndexAsync(CancellationToken cancellationToken = default)
    {
        return await cache.GetOrCreateAsync(
            "BusStopsMiniSearch",
            async ct =>
            {
                var script = await httpClient.GetStringAsync(
                    "https://cdn.jsdelivr.net/npm/minisearch@7.1.0/dist/umd/index.min.js", ct
                );

                using var engine = new V8ScriptEngine();
                engine.Script["busStops"] =
                    JsonSerializer.Serialize(
                        await dataMallService.GetBusStopsAsync(ct),
                        new JsonSerializerOptions
                        {
                            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
                        }
                    ); // Serialize so that property names are camelcase

                engine.Evaluate(script);

                // language=JS
                engine.Evaluate("""
                                const minisearch = new MiniSearch({
                                    idField: 'code',
                                    fields: ['description', 'roadName', 'code'],
                                    storeFields: ['description', 'roadName', 'code', 'longitude', 'latitude']
                                });

                                minisearch.addAll(JSON.parse(busStops));
                                """);

                // language=JS
                return engine.ExecuteCommand("JSON.stringify(minisearch)");
            },
            cancellationToken: cancellationToken,
            options: new HybridCacheEntryOptions
            {
                Expiration = TimeSpan.FromDays(5)
            }
        );
    }
}