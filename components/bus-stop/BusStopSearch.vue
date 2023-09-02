<script setup lang="ts">
import type { SearchResult } from 'minisearch'
import { searchOptions } from '~/shared/minisearch'
import type { BusStopSchema } from '~/shared/types/core'

const app = useNuxtApp()

const search = ref('')
const searchThrottled = throttledRef(search, 200)

const { coords, locatedAt } = useSharedGeolocation()

interface BusStopWithDistance extends BusStopSchema {
  distance?: number
}

type ProperSearchResult = SearchResult & BusStopSchema

const busStops = computed(() => {
  if (searchThrottled.value.length > 0) { // Manual search
    return (app.$minisearch.search(searchThrottled.value, searchOptions) as ProperSearchResult[])
      .map(withDistance)
  }

  if (locatedAt.value) { // No search, show within goelocation radius
    return app.$data.busStops
      .filter(withinRadius)
      .map(withDistance)
      .sort(byDistance)
  }

  return app.$data.busStops
})

// Helper functions
function withDistance(item: BusStopSchema) {
  if (!locatedAt.value)
    return item

  return {
    ...item,
    distance: getDistance(
      item.Latitude, item.Longitude,
      coords.value.latitude, coords.value.longitude,
    ),
  }
}

function withinRadius(item: BusStopSchema) {
  if (!locatedAt.value)
    return true

  return isWithinRadius(
    item.Latitude, item.Longitude,
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
      <ElInput v-model="search" clearable size="large" :placeholder="$t('busStops.searchBar')" />
    </div>

    <BusStopPaginator :bus-stops="busStops" />
  </div>
</template>
