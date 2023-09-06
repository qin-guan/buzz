import { useQuery } from '@tanstack/vue-query'

export function useBusStops() {
  return useQuery(['bus-stops'], () => $fetch('/api/bus-stops'))
}

export function useBusStop(code: string) {
  const { data: busStops } = useBusStops()
  const enabled = computed(() => !!busStops.value)
  return useQuery(['bus-stops', code], () => {
    return busStops.value!.find(busStop => busStop.BusStopCode === code)
  }, {
    enabled,
  })
}

export function useBusStopsIndex() {
  return useQuery(['bus-stops-index'], () => {
    return $fetch('/api/bus-stops-minisearch', { parseResponse: txt => txt })
  })
}
