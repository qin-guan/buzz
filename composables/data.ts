export function useBusStops() {
  return useFetch('/api/bus-stops', { key: 'bus-stops', lazy: true })
}

export function useBusStop(code: MaybeRef<string>) {
  const watch = isRef(code) ? [code] : undefined

  return useAsyncData(`bus-stops:${unref(code)}`, async () => {
    const { data: busStops, error } = await useBusStops()
    if (error.value)
      throw error.value
    return busStops.value!.find(busStop => busStop.busStopCode === code)
  }, { watch, lazy: true })
}

export function useBusStopArrivals(code: MaybeRef<string>) {
  const watch = isRef(code) ? [code] : undefined
  return useFetch(`/api/bus-stops/${unref(code)}/arrivals`, { watch, key: `bus-stops:${unref(code)}:arrivals`, lazy: true })
}

export function useBusStopsIndex() {
  return useFetch('/api/bus-stops-minisearch', { parseResponse: txt => txt, lazy: true })
}
