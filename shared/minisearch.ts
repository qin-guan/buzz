import type { Options, SearchOptions } from 'minisearch'
import type { BusStopSchema } from './types/core'

export const options: Options<BusStopSchema> = {
  idField: 'BusStopCode',
  fields: ['Description', 'RoadName', 'BusStopCode'],
  storeFields: ['Description', 'RoadName', 'BusStopCode', 'Longitude', 'Latitude'],
}

export const searchOptions: SearchOptions = {
  fuzzy: 0.2,
  prefix: true,
  boost: { Description: 4, BusStopCode: 2, RoadName: 1 },
}
