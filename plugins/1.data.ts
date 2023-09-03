import type { BusStopSchema, MetaSchema } from '~/shared/types/core'

export default defineNuxtPlugin(async () => {
  const cookie = useCookie<MetaSchema>('meta')
  const meta = await $fetch('/api/bus-stops/meta')

  if (!cookie.value || cookie.value.checksum !== meta.checksum) { // No data or outdated data on client
    const [busStops, busStopsIndex] = await Promise.all([
      $fetch('/api/bus-stops'),
      $fetch('/api/bus-stops-minisearch', { parseResponse: txt => txt }),
    ])

    if (!busStops || !busStopsIndex)
      throw new Error('[plugins/1.data.ts] Invariant')

    localStorage.setItem('bus-stops', JSON.stringify(busStops))
    localStorage.setItem('bus-stops-index', busStopsIndex)
    cookie.value = meta

    return {
      provide: {
        data: {
          busStops,
          busStopsIndex,
        },
      },
    }
  }

  const busStops = JSON.parse(localStorage.getItem('bus-stops') ?? 'null') as BusStopSchema[]
  const busStopsIndex = localStorage.getItem('bus-stops-index') ?? ''

  return {
    provide: {
      data: {
        busStops,
        busStopsIndex,
      },
    },
  }
})
