<script setup lang="ts">
const props = defineProps<{
  code: string
}>()

const url = computed(() => {
  return `/api/bus-stops/zh-CN/${props.code}`
})

const { data, error } = useAsyncData(props.code, () => $fetch(url.value), { watch: [url] })
</script>

<template>
  <span>
    {{ data }}
  </span>
</template>
