using System.Text.Json.Serialization;
using Buzz.WebApi.Entities;

namespace Buzz.WebApi.Services.DataMall.Models;

public record GetTrainStationCrowdResponse(
    [property: JsonPropertyName("value")] List<GetTrainStationCrowdResponse.TrainStationCrowd> Values
)
{
    public record TrainStationCrowd(
        string Station,
        string StartTime,
        string EndTime,
        string CrowdLevel
    );
};