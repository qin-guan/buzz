namespace Buzz.WebApi.Entities;

public record BusService(
    string ServiceNo,
    string Operator,
    NextBus NextBus,
    NextBus NextBus2,
    NextBus NextBus3
);