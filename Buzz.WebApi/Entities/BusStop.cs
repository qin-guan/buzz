namespace Buzz.WebApi.Entities;

public record BusStop(
    string Code,
    string RoadName,
    string Description,
    decimal Latitude,
    decimal Longitude
);