<script setup lang="ts">
const props = defineProps<{
  services: {
    number: string
    arrivals: {
      time: string
      longitude: string
      latitude: string
      load: string
      type: string
    }[]
  }[]
}>()
</script>

<template>
  <div>
    <div v-for="service in services" :key="service.number">
      <div>
        <BusArrivalTrackLane :arrivals="service.arrivals" />
      </div>
    </div>
  </div>
</template>
