import type { TrainStationCrowd } from '~/api/app/models'

export function useTrainStations() {
  const config = useRuntimeConfig()
  return useFetch<TrainStationCrowd[]>(config.public.api + '/Stations')
}
