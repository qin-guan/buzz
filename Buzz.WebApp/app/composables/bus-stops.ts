import type { BusStop, BusService } from '~/api/app/models'

export function useMiniSearchIndex() {
  const config = useRuntimeConfig()
  return useFetch<string>(config.public.api + '/MiniSearch')
}

export function useBusStops() {
  const config = useRuntimeConfig()
  return useFetch<BusStop[]>(config.public.api + '/BusStops')
}

export function useBusStopServices(code: MaybeRef<string>) {
  const config = useRuntimeConfig()
  return useFetch<BusService[]>(config.public.api + '/BusStops/' + toValue(code) + '/Services')
}
