<script setup lang="ts">
import { f7Navbar, f7Page } from 'framework7-vue'

const props = defineProps<{
  code: string
}>()

const { data: busStops } = useBusStops()

const busStop = computed(() => busStops.value?.find(busStop => busStop.code === props.code))
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
    <pre>
    {{ busStop }}
    </pre>
  </f7Page>
</template>
