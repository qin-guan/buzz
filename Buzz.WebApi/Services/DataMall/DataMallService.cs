using Buzz.WebApi.Entities;
using Buzz.WebApi.Options;
using Buzz.WebApi.Services.DataMall.Models;
using Microsoft.Extensions.Caching.Hybrid;
using Microsoft.Extensions.Options;

namespace Buzz.WebApi.Services.DataMall;

public class DataMallService
{
    private readonly HybridCache _cache;
    private readonly HttpClient _httpClient;

    public DataMallService(HybridCache cache, HttpClient httpClient, IOptions<DataMallOptions> options)
    {
        _cache = cache;
        _httpClient = httpClient;

        _httpClient.BaseAddress = new Uri("https://datamall-proxy.netlify.app");
        _httpClient.DefaultRequestHeaders.Add("AccountKey", options.Value.ApiKey);
    }

    public async Task<List<TrainStationCrowd>> GetTrainStationCrowd(
        CancellationToken cancellationToken = default
    )
    {
        return await _cache.GetOrCreateAsync(
            $"Station",
            async ct =>
            {
                var stations = new List<TrainStationCrowd>();

                foreach (var line in Enum.GetNames(typeof(TrainLine)))
                {
                    var items = await _httpClient.GetFromJsonAsync<GetTrainStationCrowdResponse>(
                        $"/ltaodataservice/PCDRealTime?TrainLine={line.ToUpper()}",
                        cancellationToken: ct
                    );

                    ArgumentNullException.ThrowIfNull(items);

                    stations.AddRange(items.Values.Select(v =>
                        new TrainStationCrowd(v.Station, v.StartTime, v.EndTime, v.CrowdLevel))
                    );
                }

                return stations;
            },
            cancellationToken: cancellationToken,
            options: new HybridCacheEntryOptions
            {
                Expiration = TimeSpan.FromSeconds(45)
            }
        );
    }

    public async Task<List<BusService>> GetBusServicesForStopAsync(string code,
        CancellationToken cancellationToken = default)
    {
        return await _cache.GetOrCreateAsync(
            $"BusStops:{code}:Services",
            async ct =>
            {
                var data = await _httpClient.GetFromJsonAsync<GetBusArrivalResponse>(
                    $"/ltaodataservice/v3/BusArrival?BusStopCode={code}",
                    cancellationToken: ct
                );

                ArgumentNullException.ThrowIfNull(data);

                return data.Services.ToList();
            },
            cancellationToken: cancellationToken,
            options: new HybridCacheEntryOptions
            {
                Expiration = TimeSpan.FromSeconds(45)
            }
        );
    }

    public async Task<List<BusStop>> GetBusStopsAsync(CancellationToken cancellationToken = default)
    {
        return await _cache.GetOrCreateAsync(
            "BusStops",
            async ct =>
            {
                var stops = new List<BusStop>();

                for (var skip = 0; skip < 1_000_000; skip += 500)
                {
                    ct.ThrowIfCancellationRequested();

                    var data = await _httpClient.GetFromJsonAsync<GetBusStopsResponse>(
                        $"/ltaodataservice/BusStops?$skip={skip}",
                        cancellationToken: ct
                    );

                    ArgumentNullException.ThrowIfNull(data);

                    stops.AddRange(
                        data.Values.Select(v =>
                            new BusStop(
                                v.BusStopCode,
                                v.RoadName,
                                v.Description,
                                v.Latitude,
                                v.Longitude
                            )
                        )
                    );

                    if (data.Values.Count < 500)
                    {
                        break;
                    }
                }

                return stops;
            },
            cancellationToken: cancellationToken,
            options: new HybridCacheEntryOptions
            {
                Expiration = TimeSpan.FromDays(5)
            }
        );
    }
}