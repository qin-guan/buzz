namespace Buzz.WebApi.Entities;

public record TrainStationCrowd(
    string Code,
    string StartTime,
    string EndTime,
    string CrowdLevel
);