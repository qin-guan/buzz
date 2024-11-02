namespace Buzz.WebApi.Entities;

public record NextBus(
    string OriginCode,
    string DestinationCode,
    string EstimatedArrival,
    int Monitored,
    string Latitude,
    string Longitude,
    string VisitNumber,
    string Load,
    string Feature,
    string Type
);