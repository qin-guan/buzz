<script setup lang="ts">
// TODO lots of StackOverflowed math, oh no
import { useVirtualizer } from '@tanstack/vue-virtual'

const app = useNuxtApp()

const scrollRef = ref()

const search = ref('')
const searchThrottled = throttledRef(search, 200)

const { coords, locatedAt, error, resume, pause } = useSharedGeolocation()

const results = computedAsync(async () => {
  if (process.server)
    return []

  if (search.value.length === 0 && locatedAt && !error.value) {
    return app.$data.busStops
      .filter((x) => {
        return isWithinRadius(x.Latitude, x.Longitude, coords.value.latitude, coords.value.longitude)
      })
      .map(i => ({ item: i, dist: getDistance(i.Latitude, i.Longitude, coords.value.latitude, coords.value.longitude) }))
      .sort((a, b) => {
        return a.dist - b.dist
      })
  }

  if (search.value.length === 0)
    return app.$data.busStops.map(i => ({ item: i }))

  return (await app.$fuse.search(searchThrottled.value))
    .map(i => ({ ...i, dist: getDistance(i.item.Latitude, i.item.Longitude, coords.value.latitude, coords.value.longitude) }))
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
    <div class="mx-4">
      <ElInput v-model="search" clearable size="large" :placeholder="$t('busStops.searchBar')" />
    </div>

    {{ locatedAt }}

    <div ref="scrollRef" class="overflow-y-auto h-full pt-4">
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
            <ElCard class="h-[128px] mx-4">
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
