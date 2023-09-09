import { z } from 'zod'

/**
 * Bus stop schema used throughout the app.
 *
 * Modelled after the response from the Datamall API.
 */
export const busStopSchema = z.object({
  BusStopCode: z.string(),
  RoadName: z.string(),
  Description: z.string(),
  Latitude: z.number(),
  Longitude: z.number(),
})

export type BusStopSchema = z.infer<typeof busStopSchema>

const metaSchema = z.object({
  checksum: z.string(),
})

export type MetaSchema = z.infer<typeof metaSchema>

export const nextBusSchema = z.object({
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

export type NextBusSchema = z.infer<typeof nextBusSchema>
