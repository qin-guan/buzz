import { useQuery } from '@tanstack/vue-query'
import type { BusStopSchema } from '~/shared/types/core'

export function useBusStops() {
  return useQuery(['bus-stops'], async () => {
    if (process.server)
      return
    return JSON.parse(localStorage.getItem('bus-stops') ?? 'null') as BusStopSchema[]
  })
}

export function useBusStop(code: string) {
  const { data } = useBusStops()
  return useQuery(['bus-stops', code], () => {
    return data.value?.find(busStop => busStop.BusStopCode === code)
  }, {
    enabled: !!data.value,
  })
}

export function useBusStopsIndex() {
  return useQuery(['bus-stops-index'], async () => {
    if (process.server)
      return
    return localStorage.getItem('bus-stops-index') ?? null
  })
}
