<script setup lang="ts">
import { f7Card, f7CardContent, f7Navbar, f7Page } from 'framework7-vue'

const props = defineProps<{
  code: string
}>()

const dayjs = useDayjs()

const { data: busStops } = useBusStops()
const { data: services, refresh } = useBusStopServices(props.code)

useIntervalFn(refresh, 5000)

const busStop = computed(() => busStops.value?.find(busStop => busStop.code === props.code))

function format(arrival?: string) {
  return dayjs(arrival).diff(dayjs(), 'minute') + ' min'
}
</script>

<template>
  <f7Page>
    <f7Navbar
      large
      transparent
      :title="busStop?.description"
      :title-large="busStop?.description"
      back-link="Back"
    />
    <f7Card
      v-for="service in services"
      :key="service.serviceNo"
      :title="service.serviceNo"
    >
      <f7CardContent>
        {{ format(service.nextBus?.estimatedArrival) }}
        <br>
        {{ format(service.nextBus2?.estimatedArrival) }}
        <br>
        {{ format(service.nextBus3?.estimatedArrival) }}
      </f7CardContent>
    </f7Card>
  </f7Page>
</template>
