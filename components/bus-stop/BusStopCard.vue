<script setup lang="ts">
const props = defineProps<{
  distance?: number
  description: string
  roadName: string
  busStopCode: string
}>()

const localePath = useLocalePath()
</script>

<template>
  <NuxtLink :to="localePath(`/${props.busStopCode}/arrivals`)">
    <ElCard class="h-[128px] mx-4" body-class="flex justify-between">
      <div>
        <ElText v-if="props.distance" size="small">
          {{ $t('busStop.distance', { distance: Math.round(props.distance * 1000) }) }}
          <br>
        </ElText>
        <ElText size="large" class="font-semibold">
          {{ props.description }}
        </ElText>
        <br>
        <ElText>{{ props.roadName }}</ElText>
      </div>

      <div>
        <ElTag size="large" class="font-semibold">
          {{ props.busStopCode }}
        </ElTag>
      </div>
    </ElCard>
  </NuxtLink>
</template>
