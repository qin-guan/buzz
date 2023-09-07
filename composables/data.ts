import type { UseQueryOptions } from '@tanstack/vue-query'
import { useQuery } from '@tanstack/vue-query'

export function useBusStops() {
  return useQuery({
    queryKey: ['bus-stops'],
    queryFn: () => $fetch('/api/bus-stops'),
  })
}

export function useBusStop(code: string, enabled?: Ref<boolean>) {
  const { data: busStops } = useBusStops()

  if (busStops.value === undefined)
    console.warn('[composables/data.ts] useBusStop() called before busStops are loaded.')

  return useQuery({
    queryKey: ['bus-stops', code],
    queryFn: () => busStops.value!.find(busStop => busStop.BusStopCode === code),
    enabled,
  })
}

export function useBusStopsIndex() {
  return useQuery({
    queryKey: ['bus-stops-index'],
    queryFn: () => $fetch('/api/bus-stops-minisearch', { parseResponse: txt => txt }),
  })
}
