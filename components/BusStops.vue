<script setup lang="ts">
import { useVirtualizer } from '@tanstack/vue-virtual'

const app = useNuxtApp()

const search = ref('')
const searchThrottled = throttledRef(search, 200)

const scrollRef = ref()

const results = computedAsync(async () => {
  if (process.server)
    return []
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
    <ElInput v-model="search" placeholder="Search..." />

    <div ref="scrollRef" class="overflow-auto h-full">
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
            <ElCard class="h-[128px]">
              <ElText size="small">
                {{ results[item.index].item.BusStopCode }}
              </ElText>
              <br>
              <ElText size="large" class="font-semibold">
                {{ results[item.index].item.Description }}
              </ElText>
              <br>
              <ElText>{{ results[item.index].item.RoadName }}</ElText>
            </ElCard>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
