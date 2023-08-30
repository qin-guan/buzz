import { z } from 'zod'
import type Fuse from 'fuse.js'

const busStopSchema = z.object({
  BusStopCode: z.string(),
  RoadName: z.string(),
  Description: z.string(),
  Latitude: z.number(),
  Longitude: z.number(),
})

export type BusStopSchema = z.infer<typeof busStopSchema>

const datamallBusStopQueryResponse = z.object({
  value: z.array(busStopSchema),
})

export type DatamallBusStopQueryResponse = z.infer<typeof datamallBusStopQueryResponse>

const allBusStopsStorageSchema = z.array(busStopSchema)

export type AllBusStopsStorageSchema = z.infer<typeof allBusStopsStorageSchema>

export interface FuseWorker {
  _fuse?: Fuse<BusStopSchema>
  init(data: AllBusStopsStorageSchema, index: ReturnType<Fuse.FuseIndex<BusStopSchema>['toJSON']>): void
  search(query: string, options?: Fuse.FuseSearchOptions): Fuse.FuseResult<BusStopSchema>[]
}
