import { z } from 'zod'

/**
 * Bus stop schema used throughout the app.
 *
 * Modelled after the response from the Datamall API.
 */
export const busStopSchema = z.object({
  busStopCode: z.string(),
  roadName: z.string(),
  description: z.string(),
  latitude: z.number(),
  longitude: z.number(),
})

export type BusStopSchema = z.infer<typeof busStopSchema>

export const nextBusSchema = z.object({
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

export type NextBusSchema = z.infer<typeof nextBusSchema>
