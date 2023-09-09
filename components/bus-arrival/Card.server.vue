<script setup lang="ts">
const props = defineProps<{
  estimatedArrival: string
}>()
</script>

<template>
  <div>
    <span>
      In {{ dayjs(props.estimatedArrival).toNow() }}
    </span>
  </div>
</template>
