<script setup lang="ts">
const props = defineProps<{
  arrivals: {
    time: string
    longitude: string
    latitude: string
    load: string
    type: string
  }[]
}>()

const relatives = computed(() => {
  return props.arrivals.map((arrival) => {
    return dayjs(arrival.time).diff(dayjs(), 'minute')
  })
})
</script>

<template>
  <div class="flex ">
    <span>
      <Icon name="fluent-emoji:bus" />
      {{ relatives }}
    </span>
  </div>
</template>
