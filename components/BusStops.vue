<script setup lang="ts">
// TODO lots of StackOverflowed math, oh no
import { useVirtualizer } from '@tanstack/vue-virtual'

const app = useNuxtApp()

const scrollRef = ref()

const search = ref('')
const searchThrottled = throttledRef(search, 200)

const { coords, locatedAt, error, resume, pause } = useGeolocation()

function getDistance(lat1, lon1, lat2, lon2) {
  const radlat1 = (Math.PI * lat1) / 180
  const radlat2 = (Math.PI * lat2) / 180

  const theta = lon1 - lon2
  const radtheta = (Math.PI * theta) / 180

  let dist
        = Math.sin(radlat1) * Math.sin(radlat2)
        + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
  dist = Math.acos(dist)
  dist = (dist * 180) / Math.PI
  dist = dist * 60 * 1.1515
  dist = dist * 1.609344

  return dist
}

const results = computedAsync(async () => {
  if (process.server)
    return []
  if (search.value.length === 0 && locatedAt) {
    return app.$fuse.data.filter((x) => {
      const ky = 40000 / 360
      const kx = Math.cos(Math.PI * coords.value.latitude / 180.0) * ky
      const dx = Math.abs(coords.value.longitude - x.Longitude) * kx
      const dy = Math.abs(coords.value.latitude - x.Latitude) * ky
      return Math.sqrt(dx * dx + dy * dy) <= 0.5
    }).map(i => ({ item: i, dist: getDistance(i.Latitude, i.Longitude, coords.value.latitude, coords.value.longitude) })).sort((a, b) => {
      return a.dist - b.dist
    })
  }

  return await app.$fuse.search(searchThrottled.value)
}, [])

const options = computed(() => {
  return {
    count: results.value.length,
    getScrollElement: () => scrollRef.value,
    estimateSize: () => 138,
  }
})

const rowVirtualizer = useVirtualizer(options)
const virtualItems = computed(() => rowVirtualizer.value.getVirtualItems())
</script>

<template>
  <div class="h-full flex flex-col">
    <ElInput v-model="search" clearable size="large" :placeholder="$t('busStops.searchBar')" />

    <div ref="scrollRef" class="overflow-auto h-full mt-4">
      <div
        :style="{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }"
      >
        <div v-for="item in virtualItems" :key="item.key">
          <div
            :style="{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${item.size}px`,
              transform: `translateY(${item.start}px)`,
            }"
          >
            <ElCard class="h-[128px] mr-2">
              <ElText size="small">
                {{ Math.round(results[item.index].dist * 1000) }}m
              </ElText>
              <div class="flex justify-between">
                <ElText size="large" class="font-semibold">
                  {{ results[item.index].item.Description }}
                </ElText>
                <ElTag size="large">
                  {{ results[item.index].item.BusStopCode }}
                </ElTag>
              </div>
              <ElText>{{ results[item.index].item.RoadName }}</ElText>
            </ElCard>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
