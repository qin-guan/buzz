import type { BusStop } from '~/api/app/models'

export function useMiniSearchIndex() {
  const config = useRuntimeConfig()
  return useFetch<string>(config.public.api + '/ms')
}

export function useBusStops() {
  const config = useRuntimeConfig()
  return useFetch<BusStop[]>(config.public.api + '/bus-stops')
}
