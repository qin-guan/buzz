<script setup lang="ts">
import { RecycleScroller } from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

const localePath = useLocalePath()

const search = ref('')

const { data } = useLazyFetch('/api/bus-stops', {
  query: {
    name: search,
  },
  watch: [search],
})
</script>

<template>
  <ElContainer class="h-screen">
    <ElHeader>
      <div class="h-full flex items-center">
        <NuxtLink :to="localePath('/')" class="font-semibold">
          {{ $t('appName') }}
        </NuxtLink>

        <div class="flex-1 flex justify-end space-x-4 items-center">
          <LocalizationDropdown />
          <ElButton circle @click="$colorMode.preference = $colorMode.value === 'dark' ? 'light' : 'dark'">
            <Icon v-if="$colorMode.unknown" name="lucide-smile" />
            <Icon v-else-if="$colorMode.value === 'dark'" name="lucide-sun" />
            <Icon v-else-if="$colorMode.value === 'light'" name="lucide-moon" />
          </ElButton>
        </div>
      </div>
    </ElHeader>
    <ElMain>
      <div class="h-full">
        <ElInput v-model="search" placeholder="Search..." />
        <RecycleScroller
          v-slot="{ item }"
          class="h-full"
          :items="data"
          :item-size="138"
          key-field="BusStopCode"
        >
          <ElCard class="h-[128px]">
            <ElText size="small">
              {{ item.BusStopCode }}
            </ElText>
            <br>
            <ElText size="large" class="font-semibold">
              {{ item.Description }}
            </ElText>
            <br>
            <ElText>{{ item.RoadName }}</ElText>
          </ElCard>
        </RecycleScroller>
      </div>
    </ElMain>
  </ElContainer>
</template>
