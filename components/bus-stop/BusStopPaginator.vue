<script setup lang="ts">
import { useVirtualizer } from '@tanstack/vue-virtual'
import type { BusStopSchema } from '~/shared/types/core'

interface BusStopWithDistance extends BusStopSchema {
  distance?: number
}

const props = defineProps<{
  busStops: BusStopWithDistance[]
}>()

const scrollRef = ref()

const options = computed(() => {
  return {
    count: props.busStops.length,
    getScrollElement: () => scrollRef.value,
    estimateSize: () => 138,
    overscan: 10,
  }
})

const rowVirtualizer = useVirtualizer(options)
const virtualItems = computed(() => rowVirtualizer.value.getVirtualItems())
</script>

<template>
  <div ref="scrollRef" class="overflow-y-auto h-full pt-4">
    <div
      :style="{
        height: `${rowVirtualizer.getTotalSize()}px`,
        width: '100%',
        position: 'relative',
      }"
    >
      <div v-for="{ index, key, size, start } in virtualItems" :key="key">
        <div
          :style="{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: `${size}px`,
            transform: `translateY(${start}px)`,
          }"
        >
          <BusStopCard
            v-bind="{
              busStopCode: props.busStops[index].BusStopCode,
              description: props.busStops[index].Description,
              roadName: props.busStops[index].RoadName,
              distance: props.busStops[index].distance,
            }"
          />
        </div>
      </div>
    </div>
  </div>
</template>
