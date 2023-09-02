import { z } from 'zod'

/**
 * Bus stop schema used throughout the app.
 *
 * Modelled after the response from the Datamall API.
 */
const busStopSchema = z.object({
  BusStopCode: z.string(),
  RoadName: z.string(),
  Description: z.string(),
  Latitude: z.number(),
  Longitude: z.number(),
})

export type BusStopSchema = z.infer<typeof busStopSchema>

/**
 * Datamall bus stop query response schema.
 */
const datamallBusStopQueryResponse = z.object({
  value: z.array(busStopSchema),
})

export type DatamallBusStopQueryResponse = z.infer<typeof datamallBusStopQueryResponse>

/**
 * Schema used to store all bus stops in cache.
 */
const allBusStopsStorageSchema = z.array(busStopSchema)

export type AllBusStopsStorageSchema = z.infer<typeof allBusStopsStorageSchema>
