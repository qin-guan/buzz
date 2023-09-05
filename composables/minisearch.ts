import MiniSearch from 'minisearch'
import { useBusStopsIndex } from './data'
import { options } from '~/shared/minisearch'
import type { BusStopSchema } from '~/shared/types/core'

export function useMiniSearch() {
  const { data } = useBusStopsIndex()

  const minisearch = computed(() => {
    if (!data.value)
      return null

    return MiniSearch.loadJSON<BusStopSchema>(data.value ?? '', options)
  })

  return minisearch
}
