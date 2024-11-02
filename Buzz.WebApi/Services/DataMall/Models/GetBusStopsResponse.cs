using System.Text.Json.Serialization;

namespace Buzz.WebApi.Services.DataMall.Models;

public record GetBusStopsResponse(
    [property: JsonPropertyName("value")] List<GetBusStopsResponse.BusStop> Values
)
{
    public record BusStop(
        string BusStopCode,
        string RoadName,
        string Description,
        decimal Latitude,
        decimal Longitude
    );
}