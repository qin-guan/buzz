<script setup lang="ts">
import type Fuse from 'fuse.js'
import { useVirtualizer } from '@tanstack/vue-virtual'
import type { BusStopSchema } from '~/shared/types'

const app = useNuxtApp()

const scrollRef = ref()

const search = ref('')
const searchThrottled = throttledRef(search, 200)

const { coords, locatedAt } = useSharedGeolocation()

const defaultBusStops = computed(() => {
  return app.$data.busStops.map(i => ({ item: i }))
})

const busStops = computedAsync<({
  item: BusStopSchema
  distance?: number
})[]>(async () => {
    if (searchThrottled.value.length > 0) { // Manual search
      return (await app.$fuse.search(searchThrottled.value))
        .map((i) => {
          if (!locatedAt.value)
            return i

          return {
            ...i,
            distance: getDistance(
              i.item.Latitude, i.item.Longitude,
              coords.value.latitude, coords.value.longitude,
            ),
          }
        })
    }

    if (locatedAt.value) { // No search, show within goelocation radius
      return defaultBusStops.value
        .filter(({ item }) => {
          return isWithinRadius(
            item.Latitude, item.Longitude,
            coords.value.latitude, coords.value.longitude,
          )
        })
        .map(i => ({
          ...i,
          distance: getDistance(
            i.item.Latitude, i.item.Longitude,
            coords.value.latitude, coords.value.longitude,
          ),
        }))
        .sort((a, b) => {
          return a.distance - b.distance
        })
    }

    return defaultBusStops.value
  }, defaultBusStops.value)

const options = computed(() => {
  return {
    count: busStops.value.length,
    getScrollElement: () => scrollRef.value,
    estimateSize: () => 138,
    overscan: 20,
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
            <ElCard class="h-[128px] mx-4" body-class="flex justify-between">
              <div>
                <ElText v-if="busStops[item.index].distance" size="small">
                  {{ $t('busStops.distance', { distance: Math.round(busStops[item.index].distance! * 1000) }) }}
                  <br>
                </ElText>
                <ElText size="large" class="font-semibold">
                  {{ busStops[item.index].item.Description }}
                  <BusStopsTranslatedDescription :code="busStops[item.index].item.BusStopCode" />
                </ElText>
                <br>
                <ElText>{{ busStops[item.index].item.RoadName }}</ElText>
              </div>

              <div>
                <ElTag size="large" class="font-semibold">
                  {{ busStops[item.index].item.BusStopCode }}
                </ElTag>
              </div>
            </ElCard>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
