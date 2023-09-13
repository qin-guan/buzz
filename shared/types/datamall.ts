import { z } from 'zod'

/**
 * Datamall bus stop query response schema.
 */
const busStopResponse = z.object({
  value: z.array(z.object({
    busStopCode: z.string(),
    roadName: z.string(),
    description: z.string(),
    latitude: z.number(),
    longitude: z.number(),
  })),
})

export type BusStopRespone = z.infer<typeof busStopResponse>

const nextBus = z.object({
  serviceNo: z.string(),
  destinationCode: z.string(),
  estimatedArrival: z.string().datetime(),
  latitude: z.string(),
  longitude: z.string(),
  visitNumber: z.number(),
  load: z.enum(['SEA', 'SDA', 'LSD']),
  feature: z.enum(['WAB', '']),
  type: z.enum(['SD', 'DD', 'BD']),
})

const arrivalResponse = z.object({
  busStopCode: z.string(),
  services: z.array(z.object({
    serviceNo: z.string(),
    operator: z.enum(['SBST', 'SMRT', 'TTS', 'GAS']),
    nextBus: nextBus.optional(),
    nextBus2: nextBus.optional(),
    nextBus3: nextBus.optional(),
  })),
})

export type ArrivalResponse = z.infer<typeof arrivalResponse>
