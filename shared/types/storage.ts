import { z } from 'zod'
import { busStopSchema } from './core'

/**
 * Schema used to store all bus stops in cache.
 */
const allBusStops = z.array(busStopSchema)

export type AllBusStops = z.infer<typeof allBusStops>

/**
 * Translated bus stop properties for a single locale stored in cache.
 */
const busStopTranslation = z.object({
  roadName: z.string(),
  description: z.string(),
})

export type BusStopTranslationStorageSchema = z.infer<typeof busStopTranslation>

/**
 * List of proposed translations for a bus stop stored in cache.
 */
const busStopTranslationProposals = z.array(busStopTranslation)

export type BusStopTranslationProposals = z.infer<typeof busStopTranslationProposals>
