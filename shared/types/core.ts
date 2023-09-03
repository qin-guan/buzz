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
