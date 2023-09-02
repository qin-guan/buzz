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
