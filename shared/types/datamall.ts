import { z } from 'zod'

/**
 * Datamall bus stop query response schema.
 */
const busStopResponse = z.object({
  value: z.array(z.object({
    BusStopCode: z.string(),
    RoadName: z.string(),
    Description: z.string(),
    Latitude: z.number(),
    Longitude: z.number(),
  })),
})

export type BusStopRespone = z.infer<typeof busStopResponse>

const nextBus = z.object({
  ServiceNo: z.string(),
  DestinationCode: z.string(),
  EstimatedArrival: z.string().datetime(),
  Latitude: z.string(),
  Longitude: z.string(),
  VisitNumber: z.number(),
  Load: z.enum(['SEA', 'SDA', 'LSD']),
  Feature: z.enum(['WAB', '']),
  Type: z.enum(['SD', 'DD', 'BD']),
})

const arrivalResponse = z.object({
  BusStopCode: z.string(),
  Services: z.array(z.object({
    ServiceNo: z.number(),
    Operator: z.enum(['SBST', 'SMRT', 'TTS', 'GAS']),
    NextBus: nextBus.nullable(),
    NextBus2: nextBus.nullable(),
    NextBus3: nextBus.nullable(),
  })),
})

export type ArrivalResponse = z.infer<typeof arrivalResponse>
