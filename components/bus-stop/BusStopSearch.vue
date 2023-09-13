<script setup lang="ts">
import type { SearchResult } from 'minisearch'
import type { BusStopSchema } from '~/shared/types/core'
import { searchOptions } from '~/shared/minisearch'

const { data: _busStops } = useBusStops()

const minisearch = useMiniSearch()

const search = ref('')
const searchThrottled = throttledRef(search, 200)

const { coords, locatedAt } = useSharedGeolocation()

interface BusStopWithDistance extends BusStopSchema {
  distance?: number
}

type ProperSearchResult = SearchResult & BusStopSchema

const busStops = computed(() => {
  if (searchThrottled.value.length > 0) { // Manual search
    if (!minisearch.value)
      return []

    return (minisearch.value.search(searchThrottled.value, searchOptions) as ProperSearchResult[])
      .map(withDistance)
  }

  if (locatedAt.value) { // No search, show within goelocation radius
    return _busStops.value?.filter(withinRadius).map(withDistance).sort(byDistance)
  }

  return _busStops.value
})

// Helper functions
function withDistance(item: BusStopSchema) {
  if (!locatedAt.value)
    return item

  return {
    ...item,
    distance: getDistance(
      item.latitude, item.longitude,
      coords.value.latitude, coords.value.longitude,
    ),
  }
}

function withinRadius(item: BusStopSchema) {
  if (!locatedAt.value)
    return true

  return isWithinRadius(
    item.latitude, item.longitude,
    coords.value.latitude, coords.value.longitude,
  )
}

function byDistance(a: BusStopWithDistance, b: BusStopWithDistance) {
  if (!a.distance || !b.distance)
    return 0
  return a.distance - b.distance
}
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="mx-4">
      <ElInput v-model="search" clearable size="large" :placeholder="$t('busStop.searchBar')" />
    </div>

    <BusStopPaginator :bus-stops="busStops ?? []" />
  </div>
</template>
