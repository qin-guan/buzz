using System.Text.Json.Serialization;
using Buzz.WebApi.Entities;

namespace Buzz.WebApi.Services.DataMall.Models;

public record GetBusArrivalResponse(
    string BusStopCode,
    BusService[] Services
);